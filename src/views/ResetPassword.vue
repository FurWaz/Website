<template>
    <div class="flex grow justify-center items-center">
        <form-card
            class="p-2"
            :title="Lang.CreateTranslationContext('verifications', 'passwordReset')"
            :on-cancel="goHome"
            :on-validate="resetPassword"
        >
            <input-text
                name="password"
                :label="Lang.CreateTranslationContext('verifications', 'passwordNew')"
                :placeholder="Lang.CreateTranslationContext('verifications', 'passwordNew')"
                type="password"
            />
            <input-text
                name="passwordConfirm"
                :label="Lang.CreateTranslationContext('verifications', 'passwordConfirm')"
                :placeholder="Lang.CreateTranslationContext('verifications', 'passwordConfirm')"
                type="password"
            />
        </form-card>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
import API from '../scripts/API';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';

export default {
    name: 'ResetPassword',
    components: {
        FormCard,
        InputText
    },
    data() {
        return {
            Lang,
            token: null
        }
    },
    mounted() {
        this.token = this.$route.query.token;
        if (!this.token) {
            this.$router.push('/');
            return;
        }
    },
    methods: {
        async resetPassword(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Reseting')), Log.INFO);

            const body = form.body();
            const password = body.password;
            const passwordConfirm = body.passwordConfirm;

            if (!password) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyPassword')), Log.WARNING);
                form.focus('password');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            if (!passwordConfirm) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'SpecifyConfirmPassword')), Log.WARNING);
                form.focus('passwordConfirm');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            if (password !== passwordConfirm) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('account', 'PasswordsDontMatch')), Log.WARNING);
                form.focus('passwordConfirm');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            try {
                const res = await API.execute(API.ROUTE.RESET.PASSWORD(), API.METHOD.POST, {
                    token: this.token,
                    password: password
                });
                
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => {
                    log.delete();
                    this.$router.push('/login');
                }, 2000);
            } catch (err) {
                log.error(err);
                if (err.field) form.focus(err.field);
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            }
        },
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>
