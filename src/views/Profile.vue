<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center space-y-2">
            <form-card
                class="show-up p-2"
                :title="lang.Profile()"
                :validate="lang.Edit()"
                :cancel="lang.Logout()"
                :on-cancel="logout"
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
                    name="role"
                    :label="lang.Role()"
                    :disabled="true"
                    :value="User.CurrentUser?.role_id"
                    :list="User.Roles"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
            </form-card>
            <form-card
                class="show-up p-2"
                :display-icon="false"
                :title="lang.Profile()"
                :validate="lang.Edit()"
                :cancel="''"
                :disabled="true"
                :on-validate="editProfile"
            >
                <input-text
                    ref="password"
                    :label="lang.Password()"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    ref="confirmation"
                    :label="lang.Confirmation()"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
            </form-card>
        </div>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import InputText from '../components/inputs/InputText.vue';
import InputChoice from '../components/inputs/InputChoice.vue';
import API from '../scripts/API';
import { goBack } from '../scripts/common';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';

export default {
    name: "ProfileView",
    components: {
        InputText,
        InputChoice,
        FormCard,
    },
    data() {
        if (!User.CurrentUser) goBack(this);
        return { lang: Lang.CurrentLang, User };
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
        logout(modal) {
            User.forget();
            this.$router.push({ name: 'Home' });
            window.topbar.$forceUpdate();
        }
    }
}
</script>