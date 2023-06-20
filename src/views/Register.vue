<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <form-card
                class="show-up p-2"
                :title="lang.Register()"
                :validate="lang.Register()"
                :on-validate="register"
            >
                <input-text
                    name="pseudo"
                    :label="lang.Pseudo()"
                    :placeholder="lang.Pseudo()"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <input-text
                    name="email"
                    :label="lang.Email()"
                    :placeholder="lang.Email()"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-text
                    name="password"
                    type="password"
                    :label="lang.Password()"
                    :placeholder="lang.Password()"
                    class="show-down"
                    style="animation-delay: 300ms;"
                />
                <input-text
                    name="confirm"
                    type="password"
                    :label="lang.Confirmation()"
                    :placeholder="lang.Confirmation()"
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
        return { lang: Lang.CurrentLang };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
    },
    methods: {
        register(form) {
            const log = form.log(this.lang.Registering() + " ...");

            const body = form.body();

            if (body.password !== body.confirm) {
                log.update(this.lang.PasswordsDontMatch(), Log.ERROR);
                form.focus('confirm');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            API.execute(API.ROUTE.USERS(), API.METHOD.POST, body).then(res => {
                const user = new User(res.data.user);
                user.setTokens(res.data.tokens);
                user.save();
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => { log.delete(); redirectLink(this); }, 2000);
            }).catch(err => {
                log.error(err);
                if (err.field) {
                    this.$el.querySelector("input[name=" + err.field + "]")?.focus();
                }
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            });
        }
    }
}
</script>