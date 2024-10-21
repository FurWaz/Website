<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <!-- LOGIN CARD -->
            <FormCard
                v-if="mode === 'login'"
                class="show-up p-2"
                :title="Lang.CreateTranslationContext('verbs', 'LogIn')"
                :validate="Lang.CreateTranslationContext('verbs', 'LogIn')"
                :on-cancel="cancel"
                :on-validate="login"
            >
                <InputText
                    ref="email"
                    name="email"
                    :label="Lang.CreateTranslationContext('account', 'Email')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Email')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <InputText
                    ref="password"
                    class="show-down"
                    :class="mode === 'login' ? '': 'hidden'"
                    style="animation-delay: 200ms;"
                    name="password"
                    type="password"
                    :label="Lang.CreateTranslationContext('account', 'Password')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Password')"
                />
                <div class="flex flex-col justify-start items-start py-2 space-y-2">
                    <button
                        class="show-down italic text-slate-500 dark:text-slate-400 hover:underline"
                        style="animation-delay: 300ms;"
                        :onclick="toggleMode"
                    >
                        <GetText :context="Lang.CreateTranslationContext('account', 'ForgotPassword')" />
                    </button>
                    <RouterLink
                        :to="{ name: 'Register', query: { link: $route.query.link } }"
                        class="show-down italic text-slate-500 dark:text-slate-400 hover:underline"
                        style="animation-delay: 300ms;"
                    >
                        <GetText :context="Lang.CreateTranslationContext('account', 'NoAccount')" />
                    </RouterLink>
                </div>
            </FormCard>

            <!-- FORGOT PASSWORD CARD -->
            <FormCard
                v-else
                class="show-up p-2"
                :title="Lang.CreateTranslationContext('verifications', 'passwordReset')"
                :validate="Lang.CreateTranslationContext('verbs', 'Send')"
                :on-cancel="cancel"
                :on-validate="sendForgotPasswordMail"
            >
                <InputText
                    ref="email"
                    name="email"
                    :label="Lang.CreateTranslationContext('account', 'Email')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Email')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
            </FormCard>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
import GetText from '../components/text/GetText.vue';
import { API } from '../scripts/API';
import ROUTES from '../scripts/routes';
import { redirectLink } from '../scripts/common';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: "LoginView",
    components: {
        InputText,
        FormCard,
        GetText,
        RouterLink
    },
    data() {
        return {
            Lang,
            mode: 'login'
        };
    },
    mounted() {},
    methods: {
        toggleMode() {
            if (this.mode === 'login') this.mode = 'forgot';
            else this.mode = 'login';
        },
        cancel() {
            if (this.mode === 'login') this.$router.go(-1);
            else this.mode = 'login';
        },
        async login(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'LoggingIn')), Log.INFO);

            const body = form.body();
            if (!body.email) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyEmail')), Log.WARNING);
                form.focus('email');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }
            if (!body.password) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyPassword')), Log.WARNING);
                form.focus('password');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            try {
                const resLogin = await API.Request(ROUTES.AUTH.LOGIN(body.email, body.password));
                if (resLogin.error) {
                    log.error(resLogin);
                    if (resLogin.field) form.focus(resLogin.field);
                    setTimeout(() => { log.delete(); }, 4000);
                    return;
                }

                const user = new User();
                user.setTokens(resLogin.data);
                user.save();

                const resMe = await API.RequestLogged(ROUTES.USERS.ME.GET());
                user.setInformations(resMe.data);
                user.save();

                log.update(resLogin.message, Log.SUCCESS);
                redirectLink(this, true);
                setTimeout(() => { log.delete(); }, 2000);
            } catch (err) {
                console.error(err);
            }
        },
        async sendForgotPasswordMail(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Sending')), Log.INFO);

            const forgotEmail = form.body().email;
            if (!forgotEmail) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyEmail')), Log.WARNING);
                form.focus('email');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            try {
                const res = await API.Request(ROUTES.PASSWORD.SENDRESETMAIL(forgotEmail));
                if (res.error) {
                    log.error(res);
                    if (res.field) form.focus(res.field);
                    setTimeout(() => { log.delete(); }, 4000);
                    return;
                }

                log.update(res.message, Log.SUCCESS);
                redirectLink(this, true);
                setTimeout(() => { log.delete(); }, 2000);
            } catch (err) {
                console.error(err);
            }
        }
    }
});
</script>
