<template>
    <div class="flex flex-col grow pt-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.Account }} </page-title>
        <div class="flex grow justify-evenly">
            <div class="flex">
                <div v-if="!User.CurrentUser" class="show-up flex flex-col grow">
                    <div class="flex flex-col justify-center items-center grow">
                        <div class="flex flex-col border-2 border-slate-500 p-4 rounded-lg shadow-xl bg-slate-700">
                            <p class="text-slate-200 font-semibold text-2xl text-center"> You are not logged in </p>
                            <p class="text-slate-200 font-semibold text-xl text-center"> Please login of register to access your account </p>
                            <div class="flex justify-evenly space-x-20 mt-20">
                                <button-block href="/login?link=/account"> Login </button-block>
                                <button-block href="/register?link=/account"> Register </button-block>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="User.CurrentUser" class="show-up flex flex-col grow">
                    hello
                </div>
            </div>
            <div class="show-up flex flex-col justify-center">
                <card>
                    <h1 class="text-xl font-bold dark:text-slate-200 text-slate-700 text-center"> {{Lang.CurrentLang.Settings}} </h1>
                    <div class="flex flex-col space-y-2 my-2">
                        <choice :label="Lang.CurrentLang.Theme" :list="uiThemes" :value="selectedTheme" :onchange="val => onThemeChanged(val)">  </choice>
                        <choice :label="Lang.CurrentLang.Language" :list="Lang.langs" :value="selectedLang" :onchange="val => onLangChanged(val)">  </choice>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../scripts/User.js';
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import PageTitle from '../components/labels/PageTitle.vue';
import Modal from '../components/forms/Modal.vue';
import Card from '../components/cards/Card.vue';
import SwitchButton from '../components/buttons/SwitchButton.vue';
import Choice from '../components/buttons/Choice.vue';
import { redirectHome } from '../scripts/common';
import Lang from "../scripts/Lang";

let page = null;
function openDeleteModal() {
    if (page == null) return;
    page.$refs["delete-modal"].show();
}

function deleteAccount() {
    if (page == null) return;
    User.CurrentUser.delete().then(() => {
        redirectHome(false);
    }).catch((err) => {
        console.error(err);
    });
}

function updateUserInfo() {
    User.CurrentUser.setInformations({

    });
}

const userFields = [
    {
        label: "Account",
        items: [
            {type: "input", label: "Username", value: User.CurrentUser?.username, editable: true},
            {type: "input", label: "Email", value: User.CurrentUser?.email, editable: true},
            {type: "input", label: "Role", value: User.RoleString(User.CurrentUser?.role), editable: false}
        ],
        buttons: [
            {type: "button", label: "Delete Account", enabled: true, onclick: () => { openDeleteModal(); }},
            {type: "button", label: "Update infos", enabled: false, onclick: () => { updateUserInfo(); }}
        ]
    },
    {
        label: "Password",
        items: [
            {type: "input", label: "Old Password", value: "", editable: true},
            {type: "input", label: "New Password", value: "", editable: true},
            {type: "input", label: "Confirm Password", value: "", editable: true}
        ],
        buttons: [
            {type: "button", label: "Change password", enabled: false}
        ]
    }
];

const uiThemes = [
    {label: "Light", value: "light"},
    {label: "System", value: "system"},
    {label: "Dark", value: "dark"},
];

function onThemeChanged(value) {
    let setting = value;
    localStorage.setItem("theme", value);
    if (value === "system") {
        setting = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        localStorage.removeItem("theme");
    }

    if (setting === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function onLangChanged(value) {
    if (Lang.loadLang(value))
        localStorage.setItem("lang", value);
    page.$router.go();
}

export default {
    name: "Account",
    components: {
        ButtonBlock,
        Modal,
        PageTitle,
        Card,
        SwitchButton,
        Choice
    },
    methods: { deleteAccount, onThemeChanged, onLangChanged },
    data() {
        return {
            User,
            userFields,
            uiThemes,
            Lang,
            selectedTheme: localStorage.getItem("theme") || "system",
            selectedLang: localStorage.getItem("lang") || "en",
        };
    },
    setup() {},
    mounted() {
        page = this;
    }
};
</script>

<style>

</style>