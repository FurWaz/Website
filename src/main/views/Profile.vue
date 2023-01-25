<template>
    <div class="flex grow bg-slate-700">
        <topbar></topbar>
        <div v-if="User.CurrentUser != null" class="flex grow flex-col justify-center pt-20">
            <div class="flex flex-row justify-evenly">
                <div class="flex flex-col show-up rounded-lg border-2 border-slate-600 bg-slate-700 shadow-xl">
                    <div class="flex flex-row justify-between w-full h-fit py-1 bg-slate-600 space-x-6 px-2">
                        <p class="text-white text-lg font-extrabold"> Profile </p>
                    </div>
                    <div class="flex flex-col w-fit h-fit p-4">
                        <div class="flex flex-row mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-blue-500 w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div class="flex flex-col justify-center">
                                <h2 class="text-slate-200 text-2xl font-bold mx-2"> {{ User.CurrentUser.username }} </h2>
                            </div>
                        </div>
                        <div v-for="item in userInfos" class="flex flex-col pt-4">
                            <div class="flex">
                                <div class="flex flex-col justify-center w-full">
                                    <span class="h-[2px] w-full bg-slate-600 rounded"></span>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="text-slate-500 font-semibold mx-2"> {{ item.label }} </p>
                                </div>
                                <div class="flex flex-col justify-center w-full">
                                    <span class="h-[2px] w-full bg-slate-600 rounded"></span>
                                </div>
                            </div>
                            <div v-for="info in item.items" class="flex grow-0 flex-row pt-4 justify-between">
                                <div v-if="info.type == 'input'" class="flex md:flex-row flex-col grow">
                                    <div class="flex flex-col justify-center mr-auto">
                                        <h2 class="text-slate-200 text-base font-semibold md:mx-2"> {{info.label}}: </h2>
                                    </div>
                                    <div class="flex flex-col justify-center">
                                        <input
                                            type="text"
                                            :disabled="!info.editable"
                                            class="bg-slate-700 border-2 rounded font-semibold text-center px-1 focus:outline-none focus:border-slate-400 focus:bg-slate-600"
                                            :class="info.editable? ' text-slate-200 border-slate-500' : ' text-slate-400 border-slate-600'"
                                            :value="info.value"
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between pt-4 space-x-2">
                                <div v-for="info in item.buttons" >
                                    <button-block :disabled="!info.enabled" :action="info.onclick"> {{ info.label }} </button-block>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal
            ref="delete-modal"
            title="Delete account"
            content="Do you want to delete your account ?"
            :onValidate="deleteAccount"
        ></modal>
    </div>
</template>

<script>
import Topbar from '../components/Topbar.vue';
import User from '../scripts/User.js';
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import Modal from '../components/forms/Modal.vue';
import { redirectHome } from '../scripts/common';

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

const userInfos = [
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
]

export default {
    name: "Home",
    components: {
        Topbar,
        ButtonBlock,
        Modal
    },
    methods: { deleteAccount },
    data() {
        if (User.CurrentUser == null)
            window.location.href = "/";
        User.CurrentUser.fetchInformations().then(() => {
            this.$forceUpdate();
        }).catch(err => console.error);
        return { User, userInfos };
    },
    setup() {},
    mounted() {
        page = this;
    }
};
</script>

<style>

</style>