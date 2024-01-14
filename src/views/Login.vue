<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <form-card
                class="show-up p-2"
                :title="Lang.CreateTranslationContext('verbs', 'LogIn')"
                :validate="Lang.CreateTranslationContext('verbs', 'LogIn')"
                :on-validate="login"
            >
                <input-text
                    name="email"
                    :label="Lang.CreateTranslationContext('account', 'Email')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Email')"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-text
                    name="password"
                    type="password"
                    :label="Lang.CreateTranslationContext('account', 'Password')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Password')"
                    class="show-down"
                    style="animation-delay: 300ms;"
                />
            </form-card>
        </div>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
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
    },
    data() {
        return { Lang };
    },
    mounted() {},
    methods: {
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
                if (err.field) {
                    this.$refs[err.field].focus();
                }
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            }
        }
    }
}
</script>
