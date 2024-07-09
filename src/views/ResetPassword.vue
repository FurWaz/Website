<template>
    <div class="flex grow justify-center items-center">
        <FormCard
            class="p-2"
            :title="Lang.CreateTranslationContext('verifications', 'passwordReset')"
            :on-cancel="goHome"
            :on-validate="resetPassword"
        >
            <InputText
                name="password"
                :label="Lang.CreateTranslationContext('verifications', 'passwordNew')"
                :placeholder="Lang.CreateTranslationContext('verifications', 'passwordNew')"
                type="password"
            />
            <InputText
                name="passwordConfirm"
                :label="Lang.CreateTranslationContext('verifications', 'passwordConfirm')"
                :placeholder="Lang.CreateTranslationContext('verifications', 'passwordConfirm')"
                type="password"
            />
        </FormCard>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
import { Log } from '../scripts/Logs';
import { API } from '../scripts/API';
import ROUTES from '../scripts/routes';
import Lang from '../scripts/Lang';

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

            const res = await API.Request(ROUTES.PASSWORD.RESET(this.token, password));
            if (res.error) {
                log.error(res);
                if (res.field) form.focus(res.field);
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            log.update(res.message, Log.SUCCESS);
            setTimeout(() => {
                log.delete();
                this.$router.push({ name: 'Login' });
            }, 2000);
        },
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>
