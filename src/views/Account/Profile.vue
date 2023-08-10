<template>
    <div class="flex flex-col grow h-full w-full">
        <button-back class="p-2" />
        <div class="flex flex-col grow justify-center items-center space-y-2">
            <form-card
                class="show-up p-2"
                :title="Lang.CreateTranslationContext('account', 'Profile')"
                :validate="Lang.CreateTranslationContext('verbs', 'Edit')"
                :cancel="Lang.CreateTranslationContext('verbs', 'Delete')"
                :on-cancel="() => $refs['delete-modal'].open()"
                :on-validate="editProfile"
            >
                <input-text
                    name="pseudo"
                    :label="Lang.CreateTranslationContext('account', 'Pseudo')"
                    :value="User.CurrentUser?.pseudo"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    name="email"
                    :label="Lang.CreateTranslationContext('account', 'Email')"
                    :value="User.CurrentUser?.email"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-choice
                    name="language"
                    :label="Lang.CreateTranslationContext('account', 'Language')"
                    :value="Lang.getLanguage()"
                    :list="Lang.getLanguages()"
                    :onchange="ev => Lang.setLanguage(ev.target.value)"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-choice
                    name="role"
                    :label="Lang.CreateTranslationContext('account', 'Role')"
                    :disabled="true"
                    :value="User.CurrentUser.role_id"
                    :list="User.Roles"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
            </form-card>
        </div>
        <modal-card ref="delete-modal">
            <confirm-form
                color="red"
                :title="Lang.CreateTranslationContext('account', 'DeleteAccount')"
                :description="Lang.CreateTranslationContext('account', 'DeleteAccountConfirm')"
                :on-cancel="() => $refs['delete-modal'].close()"
                :on-confirm="deleteAccount"
            />
        </modal-card>
    </div>
</template>

<script>
import FormCard from '../../components/cards/FormCard.vue';
import InputText from '../../components/inputs/InputText.vue';
import InputChoice from '../../components/inputs/InputChoice.vue';
import API from '../../scripts/API';
import Lang from '../../scripts/Lang';
import { Log } from '../../scripts/Logs';
import User from '../../scripts/User';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import ModalCard from '../../components/cards/ModalCard.vue';
import ConfirmForm from '../../components/cards/ConfirmForm.vue';

export default {
    name: "MyProfile",
    components: {
        InputText,
        InputChoice,
        FormCard,
        ButtonBack,
        ModalCard,
        ConfirmForm,
    },
    data() {
        return {
            Lang,
            currentCode: Lang.CurrentCode,
            User
        };
    },
    mounted() {},
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
        async deleteAccount(form) {
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Deleting')), Log.INFO);
            API.execute_logged(API.ROUTE.ME(), API.METHOD.DELETE).then(res => {
                log.update(Lang.CurrentLang.Deleted(), Log.SUCCESS);
                setTimeout(() => {
                    log.delete();
                    this.$refs['delete-modal'].close();
                    User.forget();
                    this.$router.go();
                }, 1000);
            }).catch(err => {
                log.error(err);
                setTimeout(() => {
                    log.delete();
                }, 4000);
            })
        }
    }
}
</script>