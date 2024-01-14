<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <form-card
                class="show-up p-2"
                :title="Lang.CreateTranslationContext('verbs', 'Register')"
                :validate="Lang.CreateTranslationContext('verbs', 'Register')"
                :on-validate="register"
            >
                <input-text
                    name="pseudo"
                    :label="Lang.CreateTranslationContext('account', 'Pseudo')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Pseudo')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
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
                <input-text
                    name="confirm"
                    type="password"
                    :label="Lang.CreateTranslationContext('account', 'Confirmation')"
                    :placeholder="Lang.CreateTranslationContext('account', 'Confirmation')"
                    class="show-down"
                    style="animation-delay: 400ms;"
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
    name: "RegisterView",
    components: {
        InputText,
        FormCard,
    },
    data() {
        return { Lang };
    },
    mounted() {},
    methods: {
        async register(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Registering')));

            const body = form.body();

            
            if (!body.pseudo) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyPseudo')), Log.WARNING);
                form.focus('pseudo');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }
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
            if (!body.confirm) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyConfirmPassword')), Log.WARNING);
                form.focus('confirm');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            if (body.password !== body.confirm) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'PasswordsDontMatch')), Log.ERROR);
                form.focus('confirm');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            try {
                const resRegister = await API.execute(API.ROUTE.USERS(), API.METHOD.POST, { ...body, confirm: undefined });
                const user = new User(resRegister.data);

                const resLogin = await API.execute(API.ROUTE.LOGIN(), API.METHOD.POST, { email: body.email, password: body.password });
                user.setTokens(resLogin.data);
                user.save();

                log.update(resLogin.message, Log.SUCCESS);
                setTimeout(() => { log.delete(); redirectLink(this); }, 2000);
            } catch (err) {
                log.error(err);
                if (err.field) {
                    this.$el.querySelector("input[name=" + err.field + "]")?.focus();
                }
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            }
        }
    }
}
</script>
