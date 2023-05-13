<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <form-card
                class="show-up p-2"
                :title="lang.Logining()"
                :validate="lang.Login()"
                :on-validate="login"
            >
                <input-text
                    name="email"
                    :label="lang.Email()"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <input-text
                    name="password"
                    type="password"
                    :label="lang.Password()"
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
        return { lang: Lang.CurrentLang };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
    },
    methods: {
        login(form) {
            const log = form.log(this.lang.Logining() + " ...");
            const body = form.body();

            const headers = {};
            headers[API.AuthorizationHeader] = "Basic " + btoa(body.email + ":" + body.password);
            API.execute(API.ROUTE.TOKEN(), API.METHOD.GET, undefined, undefined, headers).then(res => {
                const user = new User();
                user.setTokens(res.data.tokens);
                API.execute_logged(API.ROUTE.ME()).then(res => {
                    user.setInformations(res.data.user);
                    user.save();
                    log.update(res.message, Log.SUCCESS);
                    redirectLink(this, true);
                    setTimeout(() => { log.delete(); }, 2000);
                }).catch(err => {
                    log.error(err);
                    if (err.field) {
                        this.$refs[err.field].focus();
                    }
                    console.error(err);
                    setTimeout(() => { log.delete(); }, 4000);
                });
            }).catch(err => {
                log.error(err);
                if (err.field) {
                    this.$refs[err.field].focus();
                }
                console.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            });
        }
    }
}
</script>