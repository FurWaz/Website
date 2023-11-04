<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex w-full max-w-[25em] h-full flex-col justify-evenly items-center">
            <form-card
                title="Portal"
                class="p-2 mx-1"
                :on-validate="connect"
                :on-cancel="close"
                :validate="error ? '' : Lang.CreateTranslationContext('verbs', 'Continue')"
            >
                <div
                    v-show="!error"
                    class="show-up space-y-4 md:space-y-8 p-2 pt-0"
                >
                    <div class="space-y-2">
                        <p class="text-xl text-slate-600 dark:text-slate-200 w-fit mx-auto">
                            <get-text :context="Lang.CreateTranslationContext('portal', 'LoginTo')" />
                        </p>
                        <badge-card
                            v-if="app"
                            :hoverable="false"
                            class="p-2 space-y-4"
                        >
                            <div
                                class="flex flex-col items-center"
                            >
                                <div class="flex items-center space-x-2">
                                    <title-text> {{ app.name }} </title-text>
                                    <check-badge-icon
                                        class="w-6 h-6"
                                        :class="app.verified? 'text-green-500': 'text-slate-400'"
                                    />
                                </div>
                                <base-text class="w-fit mx-auto"> {{ app.description }} </base-text>
                            </div>
                            <base-text class="flex space-x-1 w-full text-sm">
                                <get-text :context="Lang.CreateTranslationContext('portal', 'CreatedBy')" />
                                <span class="font-bold">{{ app.author.pseudo }}</span>
                            </base-text>
                        </badge-card>
                    </div>
                    <div
                        v-if="mode === 'useAccount' && user"
                        class="show-right"
                    >
                        <p class="flex text-xl text-slate-600 dark:text-slate-200 w-full justify-center space-x-2">
                            <get-text :context="Lang.CreateTranslationContext('portal', 'WithAccount')" />
                            <span class="font-bold"> {{ user.pseudo }} </span>
                        </p>
                        <button
                            class="text-sm italic hover:underline"
                            @click="() => mode = 'useOther'"
                        >
                            <get-text :context="Lang.CreateTranslationContext('portal', 'UseOtherAccount')" />
                        </button>
                    </div>
                    <div
                        v-else
                        class="show-left"
                    >
                        <input-text
                            ref="email"
                            name="email"
                            :label="Lang.CreateTranslationContext('account', 'Email')"
                            :placeholder="Lang.CreateTranslationContext('account', 'Email')"
                            style="animation-delay: 200ms;"
                        />
                        <input-text
                            ref="password"
                            name="password"
                            type="password"
                            :label="Lang.CreateTranslationContext('account', 'Password')"
                            :placeholder="Lang.CreateTranslationContext('account', 'Password')"
                            style="animation-delay: 300ms;"
                        />
                        <button
                            v-if="user"
                            class="text-sm italic hover:underline"
                            @click="() => mode = 'useAccount'"
                        >
                            <get-text :context="Lang.CreateTranslationContext('portal', 'UseAccount', {account: user.pseudo})" />
                        </button>
                        <button
                            class="text-sm italic hover:underline"
                            @click="createAccount"
                        >
                            <get-text :context="Lang.CreateTranslationContext('portal', 'CreateAccount')" />
                        </button>
                    </div>
                </div>
                <div
                    v-show="error"
                    style="animation-delay: 600ms;"
                >
                    <p
                        class="show-up text-xl text-center font-bold italic text-slate-600 dark:text-slate-200"
                        style="animation-delay: 400ms;"
                    >
                        <get-text :context="Lang.CreateTranslationContext('notfound', 'Woops')" />
                    </p>
                    <p
                        class="show-up text-xl text-center font-semibold italic text-slate-400 dark:text-slate-400"
                        style="animation-delay: 400ms;"
                    >
                        <get-text :context="Lang.CreateTranslationContext('portal', 'PortalError', {error: errorMessage})" />
                    </p>
                </div>
                <log-zone ref="log-zone" />
            </form-card>
        </div>
    </div>
</template>

<script>
import IconCard from '../components/cards/IconCard.vue';
import LogZone from '../components/cards/LogZone.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import InputText from '../components/inputs/InputText.vue';
import GetText from '../components/text/GetText.vue';
import API from '../scripts/API';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';

import {
    CheckBadgeIcon
} from '@heroicons/vue/24/outline';
import BadgeCard from '../components/cards/BadgeCard.vue';
import TitleText from '../components/text/TitleText.vue';
import BaseText from '../components/text/BaseText.vue';
import ButtonText from '../components/inputs/ButtonText.vue';
import FormCard from '../components/cards/FormCard.vue';

export default {
    name: "RegisterView",
    components: {
        InputText,
        IconCard,
        LogZone,
        ButtonBlock,
        ButtonText,
        GetText,
        CheckBadgeIcon,
        BadgeCard,
        TitleText,
        BaseText,
        FormCard
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            error: false,
            errorMessage: "",
            token: null,
            app: undefined,
            mode: 'useAccount'
        };
    },
    mounted() {
        this.token = this.$route.query.token;
        if (!this.token) this.error = true;

        this.retreiveAppInfos();
    },
    methods: {
        createAccount() {
            this.$router.push({
                name: 'Register',
                query: {
                    link: this.$route.fullPath
                }
            });
        },
        async retreiveAppInfos() {
            API.execute(API.ROUTE.PORTAL('app', this.token), API.METHOD.GET).then(res => {
                this.app = res.data.app;
            }).catch(err => {
                this.error = true;
                this.errorMessage = err.message;
            });
        },
        async login(form) {
            return new Promise(async (resolve, reject) => {
                const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'LoggingIn')));
                const body = {
                    email: this.$refs['email'].getValue(),
                    password: this.$refs['password'].getValue()
                };

                if (!body.email) {
                    log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('errors', 'EmptyEmail')), Log.WARNING);
                    setTimeout(() => { log.delete(); }, 4000);
                    this.$refs['email'].focus();
                    reject();
                    return;
                }
                if (!body.password) {
                    log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('errors', 'EmptyPassword')), Log.WARNING);
                    setTimeout(() => { log.delete(); }, 4000);
                    this.$refs['password'].focus();
                    reject();
                    return;
                }

                const headers = {};
                headers[API.AuthorizationHeader] = "Basic " + btoa(body.email + ":" + body.password);
                API.execute(API.ROUTE.TOKEN(), API.METHOD.GET, undefined, undefined, headers).then(res => {
                    const user = new User();
                    user.setTokens(res.data.tokens);
                    API.execute_logged(API.ROUTE.ME()).then(res => {
                        user.setInformations(res.data.user);
                        setTimeout(() => {
                            log.delete();
                            this.user = user;
                            this.mode = 'useAccount';
                            this.$forceUpdate();
                            resolve();
                        }, 1000);
                    }).catch(err => {
                        log.error(err);
                        console.error(err);
                        setTimeout(() => { log.delete(); }, 4000);
                        if (err.field) {
                            this.$refs[err.field]?.focus();
                            reject();
                        }
                    });
                }).catch(err => {
                    console.error(err);
                    log.error(err);
                    setTimeout(() => { log.delete(); }, 4000);
                    if (err.field) {
                        this.$refs[err.field]?.focus();
                        reject();
                    }
                });
            });
        },
        async connect(form) {
            if (this.user === null || this.mode === 'useOther') {
                try {
                    await this.login(form);
                } catch { return; }
            }
            
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Connecting')));

            API.execute_logged(API.ROUTE.PORTAL(this.token), API.METHOD.POST, {}, API.TYPE.JSON, [], this.user).then(res => {
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => {
                    this.close();
                }, 1000);
            }).catch(err => {
                log.update(err.message, Log.ERROR);
                setTimeout(() => {
                    log.delete();
                }, 4000);
            });
        },
        change(form) {
            form.$el.classList.remove("show-up");
            form.$el.classList.add("hide-down");
            setTimeout(() => {
                this.user = null;
                this.$forceUpdate();
                form.$el.classList.remove("hide-down");
                form.$el.classList.add("show-up");
            }, 200)
        },
        close() {
            const redirect = this.$route.query.redirect;
            if (!redirect) {
                window.close();
                this.$router.push("/");
            } else {
                window.location.href = (
                    redirect.includes("?")
                        ? redirect + "&"
                        : redirect + "?"
                ) + "token=" + this.token;
            }
        }
    }
}
</script>