<template>
    <div class="flex flex-col grow py-10 min-w-0 max-w-full">
        <page-title> {{ Lang.CurrentLang.Account }} </page-title>
        <div class="flex md:flex-row flex-col space-y-4 mt-10 grow justify-evenly max-w-full min-w-0">
            <div class="flex mx-auto px-2 min-w-0 max-w-full">
                <div v-if="!User.CurrentUser" class="show-up flex flex-col grow min-w-0 max-w-full">
                    <div class="flex flex-col justify-center items-center grow">
                        <card class="p-4">
                            <p class="dark:text-slate-200 text-slate-600 font-semibold text-2xl text-center"> {{ Lang.CurrentLang.NotLoggedIn }} </p>
                            <p class="dark:text-slate-200 text-slate-500 font-semibold text-xl text-center"> {{ Lang.CurrentLang.NotLoggedInDesc }} </p>
                            <div class="flex justify-evenly space-x-20 mt-10">
                                <button-block href="/login?link=/account"> {{ Lang.CurrentLang.Login }} </button-block>
                                <button-block href="/register?link=/account"> {{ Lang.CurrentLang.Register }} </button-block>
                            </div>
                        </card>
                    </div>
                </div>
                <div v-if="User.CurrentUser" class="show-up flex flex-col grow justify-center min-w-0 max-w-full">
                    <card class="max-w-full min-w-0">
                        <h1 class="text-xl font-bold dark:text-slate-200 text-slate-700 text-center"> {{Lang.CurrentLang.Informations}} </h1>
                        <div v-for="field in userFields" :key="field.label.toLowerCase()" class="flex flex-col grow-0 h-fit my-2">
                            <p class="text-lg font-semibold text-slate-50"> {{ field.label }} </p>
                            <div class="ml-2 flex flex-col grow-0 h-fit space-y-2 min-w-0 max-w-full">
                                <input-text
                                    v-for="input in field.items"
                                    :label="input.label"
                                    :value="input.value"
                                    :key="input.label.toLowerCase()"
                                    :disabled="!input.enabled"></input-text>
                            </div>
                            <div class="flex justify-between grow-0 h-fit my-2 space-x-4 min-w-0 max-w-full">
                                <button-block
                                    v-for="btn in field.buttons"
                                    :key="btn.label.toLowerCase()"
                                    :action="btn.onclick"
                                    :disabled="!btn.enabled"> {{ btn.label }} </button-block>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
            <div class="show-up flex flex-col justify-center mx-auto px-2">
                <card>
                    <h1 class="text-xl font-bold dark:text-slate-200 text-slate-700 text-center"> {{Lang.CurrentLang.Settings}} </h1>
                    <div class="flex flex-col space-y-2 my-2">
                        <choice :label="Lang.CurrentLang.Theme" :list="uiThemes" :value="selectedTheme" :onchange="val => onThemeChanged(val)">  </choice>
                        <choice :label="Lang.CurrentLang.Language" :list="Lang.langs" :value="selectedLang" :onchange="val => onLangChanged(val)">  </choice>
                    </div>
                </card>
            </div>
        </div>
        <modal
            ref="delete-modal"
            :title=Lang.CurrentLang.DeleteAccount
            :content=Lang.CurrentLang.DeleteConfirm
            :onValidate="deleteAccount"
        ></modal>
    </div>
</template>

<script>
import User from '../scripts/User.js';
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import PageTitle from '../components/labels/PageTitle.vue';
import Modal from '../components/forms/Modal.vue';
import Card from '../components/cards/Card.vue';
import InputText from '../components/forms/InputText.vue';
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
        label: Lang.CurrentLang.Account,
        items: [
            {type: "input", label: Lang.CurrentLang.Username, value: User.CurrentUser?.username, enabled: true},
            {type: "input", label: Lang.CurrentLang.Email, value: User.CurrentUser?.email, enabled: true},
            {type: "input", label: Lang.CurrentLang.Role, value: User.RoleString(User.CurrentUser?.role), enabled: false}
        ],
        buttons: [
            {type: "button", label: Lang.CurrentLang.DeleteAccount, enabled: true, onclick: () => { openDeleteModal(); }},
            {type: "button", label: Lang.CurrentLang.UpdateInfos, enabled: false, onclick: () => { updateUserInfo(); }}
        ]
    },
    {
        label: Lang.CurrentLang.Password,
        items: [
            {type: "input", label: Lang.CurrentLang.OldPassword, value: "", editable: true},
            {type: "input", label: Lang.CurrentLang.NewPassword, value: "", editable: true},
            {type: "input", label: Lang.CurrentLang.ConfirmPassword, value: "", editable: true}
        ],
        buttons: [
            {type: "button", label: Lang.CurrentLang.ChangePassword, enabled: false}
        ]
    }
];

const uiThemes = [
    {label: Lang.CurrentLang.Light, value: "light"},
    {label: Lang.CurrentLang.System, value: "system"},
    {label: Lang.CurrentLang.Dark, value: "dark"},
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
        Choice,
        InputText
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