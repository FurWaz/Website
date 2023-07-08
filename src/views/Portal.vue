<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center space-y-10">
            <div class="flex flex-col items-center justify-center">
                <icon-card
                    :clickable="false"
                    :animate="true"
                    class="w-32 h-32"
                />
                <p
                    class="show-up text-4xl font-extrabold italic text-slate-600 dark:text-slate-200"
                    style="animation-delay: 400ms;"
                >
                    Portal
                </p>
            </div>
            <div
                v-show="!user && !error"
            >
                <form-card
                    class="show-up p-2"
                    :cancel="''"
                    :validate="Lang.CreateTranslationContext('verbs', 'LogIn')"
                    :on-validate="login"
                    :display-icon="false"
                >
                    <input-text
                        ref="email"
                        name="email"
                        :label="Lang.CreateTranslationContext('account', 'Email')"
                        class="show-down"
                        style="animation-delay: 200ms;"
                    />
                    <input-text
                        ref="password"
                        name="password"
                        type="password"
                        :label="Lang.CreateTranslationContext('account', 'Password')"
                        class="show-down"
                        style="animation-delay: 300ms;"
                    />
                </form-card>
            </div>
            <div
                v-show="user && !error"
            >
                <form-card
                    class="show-up p-2 w-min"
                    :display-icon="false"
                    :cancel="Lang.CreateTranslationContext('verbs', 'Change')"
                    :validate="Lang.CreateTranslationContext('verbs', 'Continue')"
                    :on-cancel="change"
                    :on-validate="connect"
                    :disabled="formDisabled"
                >
                    <p class="text-xl font-semibold text-center mb-4">
                        <get-text :context="Lang.CreateTranslationContext('portal', 'ConnectedAs', {username: user?.pseudo})" />
                    </p>
                </form-card>
                <log-zone ref="log-zone" />
            </div>
            <div
                v-show="error"
                class="show-up"
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
                    <get-text :context="Lang.CreateTranslationContext('portal', 'NoPortalTokenSpecified')" />
                </p>
                <button-block
                    class="mx-auto mt-4"
                    :onclick="close"
                >
                    <get-text :context="Lang.CreateTranslationContext('verbs', 'Close')" />
                </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import IconCard from '../components/cards/IconCard.vue';
import LogZone from '../components/cards/LogZone.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import InputText from '../components/inputs/InputText.vue';
import GetText from '../components/text/GetText.vue';
import API from '../scripts/API';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';

export default {
    name: "RegisterView",
    components: {
        InputText,
        FormCard,
        IconCard,
        LogZone,
        ButtonBlock,
        GetText
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            error: false,
            token: null,
            formDisabled: false
        };
    },
    mounted() {
        this.token = this.$route.query.token;
        if (!this.token) this.error = true;
    },
    methods: {
        async login(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'LoggingIn')));
            const body = form.body();

            const headers = {};
            headers[API.AuthorizationHeader] = "Basic " + btoa(body.email + ":" + body.password);
            API.execute(API.ROUTE.TOKEN(), API.METHOD.GET, undefined, undefined, headers).then(res => {
                const user = new User();
                user.setTokens(res.data.tokens);
                API.execute_logged(API.ROUTE.ME()).then(res => {
                    user.setInformations(res.data.user);
                    log.update(res.message, Log.SUCCESS);
                    setTimeout(() => {
                        form.$el.classList.remove("show-up");
                        form.$el.classList.add("hide-down");
                        setTimeout(() => {
                            form.$el.classList.remove("hide-down");
                            form.$el.classList.add("show-up");
                        }, 200)
                    }, 800);
                    setTimeout(() => {
                        log.delete();
                        this.user = user;
                        this.$forceUpdate();
                    }, 1000);
                }).catch(err => {
                    log.error(err);
                    console.error(err);
                    setTimeout(() => { log.delete(); }, 4000);
                    if (err.field) {
                        this.$refs[err.field].focus();
                    }
                });
            }).catch(err => {
                console.error(err);
                log.error(err);
                setTimeout(() => { log.delete(); }, 4000);
                if (err.field) {
                    this.$refs[err.field].focus();
                }
            });
        },
        async connect(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Connecting')));
            this.formDisabled = true;

            API.execute_logged(API.ROUTE.PORTAL(this.token), API.METHOD.POST, {}, API.TYPE.JSON, [], this.user).then(res => {
                log.update(res.message, Log.SUCCESS);
                this.formDisabled = false;
                setTimeout(() => {
                    this.close();
                }, 1000);
            }).catch(err => {
                log.update(err.message, Log.ERROR);
                this.formDisabled = false;
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