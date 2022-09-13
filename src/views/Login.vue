<template>
    <div class="flex min-h-screen flex-col justify-center">
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

import API from "../scripts/API.js";
import { redirectHome } from "../scripts/common.js";
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
        API.execute(API.ROUTE.LOGIN, API.METHOD_POST, {username: data.username, password: data.password}).then(token => {
            const user = User.getCurrentUser() ?? new User();
            user.saveInformations({token: token});
            user.fetchInformations().then(() => {
                user.saveInformations({password: data.password});
                log("Logged in");
                resolve();
            }).catch(err => {
                log("Error: Cannot fetch user informations");
            });
            redirectHome(true);
        }).catch(err => {
            switch (err.message.status) {
                case 404:
                    log("Error: Invalid username");
                    data.getInput("username").focus();
                    break;
                case 403:
                    log("Error: Invalid password");
                    data.getInput("password").focus();
                    break;
            
                default:
                    break;
            }
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