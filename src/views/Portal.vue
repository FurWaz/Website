<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex w-full max-w-[25em] h-full flex-col justify-evenly items-center">
            <FormCard
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
                            <GetText :context="Lang.CreateTranslationContext('portal', 'LoginTo')" />
                        </p>
                        <div class="flex w-fit h-fit mx-auto">
                            <AppCard :id="appId" :view-only="true" />
                        </div>
                    </div>
                    <div class="show-right">
                        <p class="flex text-xl text-slate-600 dark:text-slate-200 w-full space-x-2">
                            <GetText :context="Lang.CreateTranslationContext('portal', 'WithAccount')" />
                            <span class="font-bold"> {{ user.pseudo }} </span>
                        </p>
                        <button
                            class="text-sm italic hover:underline"
                            @click="goToLogin"
                        >
                            <GetText :context="Lang.CreateTranslationContext('portal', 'UseOtherAccount')" />
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
                        <GetText :context="Lang.CreateTranslationContext('notfound', 'Woops')" />
                    </p>
                    <p
                        class="show-up text-xl text-center font-semibold italic text-slate-400 dark:text-slate-400"
                        style="animation-delay: 400ms;"
                    >
                        <GetText :context="Lang.CreateTranslationContext('portal', 'PortalError', {error: errorMessage})" />
                    </p>
                </div>
                <LogZone ref="LogZone" />
            </FormCard>
        </div>
    </div>
</template>

<script>
import LogZone from '../components/cards/LogZone.vue';
import GetText from '../components/text/GetText.vue';
import FormCard from '../components/cards/FormCard.vue';
import AppCard from '@/components/apps/AppCard.vue';
import { API } from '../scripts/API';
import ROUTES from '../scripts/routes';
import { Log } from '../scripts/Logs';
import Lang from '../scripts/Lang';
import User from '../scripts/User';

export default {
    name: "RegisterView",
    components: {
        LogZone,
        GetText,
        FormCard,
        AppCard
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            error: false,
            errorMessage: "",
            token: null,
            appId: undefined,
            mode: 'useAccount'
        };
    },
    mounted() {
        this.token = this.$route.query.token;
        if (!this.token) this.error = true;

        this.retreivePortalInfos();
    },
    methods: {
        goToLogin() {
            this.$router.push({
                name: 'Login',
                query: {
                    link: this.$route.fullPath
                }
            });
        },
        async retreivePortalInfos() {
            const appRes = await API.Request(ROUTES.PORTAL.APP.GET(this.token));
            if (appRes.error) {
                this.appId = null;
                this.error = true;
                this.errorMessage = appRes.message;
            }
            else this.appId = appRes.data['app']['id'];
        },
        async connect(form) {
            if (this.user === null || this.mode === 'useOther') {
                try {
                    await this.login(form);
                } catch { return; }
            }
            
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Connecting')));

            const res = await API.RequestLogged(ROUTES.PORTAL.CONNECT(this.token));
            if (res.error) {
                log.update(res.message, Log.ERROR);
                setTimeout(() => {
                    log.delete();
                }, 4000);
            } else {
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => {
                    this.close();
                }, 1000);
            }
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