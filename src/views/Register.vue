<template>
    <div class="flex min-h-screen flex-col justify-center">
        <div class="flex flex-row justify-center">
            
            <!-- LOGIN POPUP -->
            <popup title="Register" validateLabel="Register" :onvalidate="register">
                <input-text label="Username"></input-text>
                <input-text label="Email"></input-text>
                <input-text label="Password" type="password"></input-text>
                <input-text label="Confirm Password" type="password"></input-text>
            </popup>
        </div>
    </div>
</template>

<script>
import Popup from "../components/forms/Popup.vue";
import InputText from "../components/forms/InputText.vue";

import API from "../scripts/API.js";
import { redirectHome, EMAIL_REGEX } from "../scripts/common.js";

function register(data, log) {
    return new Promise((resolve, reject) => {
        const verifications = [
            { field: "username", condition: field => field.length > 0, message: "Please enter a username" },
            { field: "email", condition: field => field.length > 0, message: "Please enter an email" },
            { field: "email", condition: field => field.match(EMAIL_REGEX), message: "Please enter a valid email" },
            { field: "password", condition: field => field.length > 0, message: "Please enter a password" },
            { field: "confirm-password", condition: field => field.length > 0, message: "Please confirm password" },
            { field: "confirm-password", condition: field => field === data["password"], message: "Password confirmation doesn't match" }
        ];
        for (const verif of verifications) {
            if (!verif.condition(data[verif.field])) {
                data.getInput(verif.field).focus();
                log(verif.message);
                reject(verif.message);
                return;
            }
        }
        log("Registering ...");
        API.execute(API.ROUTE.USERS, API.METHOD_POST, {username: data.username, email: data.email, password: data.password}).then(res => {
            console.log(res);
            log("Registered");
            resolve();
            redirectHome(true);
        }).catch(err => {
            console.log(err.message);
            err.message.text().then(console.log);
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
        register
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