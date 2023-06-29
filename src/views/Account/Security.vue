<template>
    <div class="flex flex-col grow h-full w-full">
        <button-back class="p-2" />
        <div class="flex flex-col grow justify-center items-center space-y-2">
            <form-card
                class="show-up p-2"
                :display-icon="true"
                :title="Lang.CreateTranslationContext('account', 'PasswordModification')"
                :validate="Lang.CreateTranslationContext('verbs', 'Edit')"
                :cancel="''"
                :disabled="true"
                :on-validate="editProfile"
            >
                <input-text
                    ref="password"
                    :label="Lang.CreateTranslationContext('account', 'OldPassword')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    ref="confirmation"
                    :label="Lang.CreateTranslationContext('account', 'NewPassword')"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-text
                    ref="confirmation"
                    :label="Lang.CreateTranslationContext('account', 'Confirmation')"
                    class="show-down"
                    style="animation-delay: 300ms;"
                />
            </form-card>
        </div>
    </div>
</template>

<script>
import FormCard from '../../components/cards/FormCard.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import InputText from '../../components/inputs/InputText.vue';
import API from '../../scripts/API';
import { goBack } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import { Log } from '../../scripts/Logs';
import User from '../../scripts/User';

export default {
    name: "MySecurity",
    components: {
        InputText,
        FormCard,
        ButtonBack,
    },
    data() {
        if (!User.CurrentUser) goBack(this);
        return {
            Lang,
            User
        };
    },
    mounted() { },
    methods: {
        async editProfile(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Editing')), Log.INFO);
            const body = form.body();

            delete body.role;
            API.execute_logged(API.ROUTE.ME(), API.METHOD.PATCH, body).then(res => {
                User.CurrentUser.setInformations(res.data.user);
                User.CurrentUser.save();
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => { log.delete(); }, 2000);
            }).catch(err => {
                log.error(err);
                if (err.field) {
                    this.$refs[err.field].focus();
                }
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            });
        },
        logout(modal) {
            User.forget();
            this.$router.push({ name: 'Home' });
            window.topbar.$forceUpdate();
        }
    }
}
</script>