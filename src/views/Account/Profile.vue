<template>
    <div class="flex flex-col grow h-full w-full">
        <button-back class="p-2" />
        <div class="flex flex-col grow justify-center items-center space-y-2">
            <form-card
                class="show-up p-2"
                :title="lang.Profile()"
                :validate="lang.Edit()"
                :cancel="lang.Delete()"
                :on-cancel="() => $refs['delete-modal'].open()"
                :on-validate="editProfile"
            >
                <input-text
                    name="pseudo"
                    :label="lang.Pseudo()"
                    :value="User.CurrentUser?.pseudo"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    name="email"
                    :label="lang.Email()"
                    :value="User.CurrentUser?.email"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-choice
                    name="language"
                    :label="lang.Language()"
                    :value="currentCode"
                    :list="langs"
                    :onchange="onLangChanged"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-choice
                    name="role"
                    :label="lang.Role()"
                    :disabled="true"
                    :value="User.CurrentUser?.role_id"
                    :list="User.Roles"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
            </form-card>
        </div>
        <modal-card ref="delete-modal">
            <confirm-form
                color="red"
                :title="lang.DeleteAccount()"
                :description="lang.DeleteAccountConfirm()"
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
import { goBack } from '../../scripts/common';
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
        if (!User.CurrentUser) goBack(this);
        return {
            lang: Lang.CurrentLang,
            langs: Lang.Langs,
            currentCode: Lang.CurrentCode,
            User
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
    },
    methods: {
        editProfile(form) {
            const log = form.log(this.lang.Editing() + " ...");
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
        deleteAccount(form) {
            const log = form.log(Lang.CurrentLang.Deleting() + " ...", Log.INFO);
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
        },
        onLangChanged(ev) {
            if (ev.target.value === '') ev.target.value = null;
            const success = Lang.LoadLang(ev.target.value);
            if (!success) console.error("Error changing language : Cannot switch to " + ev.target.value);
            this.currentCode = Lang.CurrentCode;
        }
    }
}
</script>