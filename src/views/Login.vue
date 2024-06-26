<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <form-card
                class="show-up p-2"
                :title="mode === 'login' ? Lang.CreateTranslationContext('verbs', 'LogIn'): Lang.CreateTranslationContext('verifications', 'passwordReset')"
                :validate="mode === 'login' ? Lang.CreateTranslationContext('verbs', 'LogIn'): Lang.CreateTranslationContext('verbs', 'Send')"
                :on-cancel="cancel"
                :on-validate="mode === 'login' ? login: sendMail"
            >
                <input-text
                    ref="email"
                    name="email"
                    :label="Lang.CreateTranslationContext('account', 'Email')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Email')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    ref="password"
                    class="show-down"
                    :class="mode === 'login' ? '': 'hidden'"
                    style="animation-delay: 200ms;"
                    name="password"
                    type="password"
                    :label="Lang.CreateTranslationContext('account', 'Password')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Password')"
                />
                <button
                    class="show-down italic text-slate-500 dark:text-slate-400 hover:underline"
                    :class="mode === 'login' ? '': 'hidden'"
                    style="animation-delay: 300ms;"
                    :onclick="toggleMode"
                >
                    <get-text :context="Lang.CreateTranslationContext('account', 'ForgotPassword')" />
                </button>
            </form-card>
        </div>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
import GetText from '../components/text/GetText.vue';
import API from '../scripts/API';
import { redirectLink } from '../scripts/common';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';

export default {
    name: "LoginView",
    components: {
        InputText,
        FormCard,
        GetText,
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
        async sendMail(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Sending')), Log.INFO);

            const forgotEmail = form.body().email;
            if (!forgotEmail) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyEmail')), Log.WARNING);
                form.focus('email');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            try {
                const res = await API.execute(
                    API.ROUTE.RESET.PASSWORD() + '?email=' + forgotEmail,
                    API.METHOD.GET
                );

                log.update(res.message, Log.SUCCESS);
                redirectLink(this, true);
                setTimeout(() => { log.delete(); }, 2000);
            } catch (err) {
                log.error(err);
                if (err.field) form.focus(err.field);
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            }
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
                const resLogin = await API.execute(API.ROUTE.LOGIN(), API.METHOD.POST, { email: body.email, password: body.password });
                const user = new User();
                user.setTokens(resLogin.data);
                user.save();

                const resMe = await API.execute_logged(API.ROUTE.ME());
                user.setInformations(resMe.data);
                user.save();

                log.update(resLogin.message, Log.SUCCESS);
                redirectLink(this, true);
                setTimeout(() => { log.delete(); }, 2000);
            } catch (err) {
                log.error(err);
                if (err.field) form.focus(err.field);
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            }
        },
        forgotPassword() {
            
        }
    }
}
</script>
