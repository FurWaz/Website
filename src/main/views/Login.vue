<template>
    <div class="flex grow flex-col justify-center">
        <div class="flex flex-row justify-center">
            
            <!-- LOGIN POPUP -->
            <popup title="Log in" validateLabel="Log in" :onvalidate="login">
                <input-text label="Username"></input-text>
                <input-text label="Password" type="password"></input-text>
            </popup>
        </div>
    </div>
</template>

<script>
import Popup from "../components/forms/Popup.vue";
import InputText from "../components/forms/InputText.vue";

import { redirectLink } from "../scripts/common.js";
import User from '../scripts/User';

function login(data, log) {
    return new Promise((resolve, reject) => {
        const verifications = [
            { field: "username", condition: field => field.length > 0, message: "Please enter a username" },
            { field: "password", condition: field => field.length > 0, message: "Please enter a password" }
        ];
        for (const verif of verifications) {
            if (!verif.condition(data[verif.field])) {
                data.getInput(verif.field).focus();
                log(verif.message);
                reject(verif.message);
                return;
            }
        }
        
        log("Logging in...");
        const user = new User({ username: data.username });
        user.fetchToken(data.password).then(() => {
            user.fetchInformations().then(() => {
                user.save();
                log("Logged in");
                resolve();
                redirectLink(true);
            }).catch(err => {
                log(err);
                reject("Error : Cannot fetch user informations ("+err+")");
            });
        }).catch(err => {
            log("Error: "+err);
            reject(err);
        });
    });
}

export default {
    name: "Login",
    methods: {
        goBack() { redirectHome(false); },
        login
    },
    components: {
        Popup,
        InputText
    },
    data() { return {}; },
    setup() {},
    mounted() {}
};
</script>