<template>
    <div class="flex flex-col grow pt-10 min-w-0">
        <page-title> Account </page-title>
        
    </div>
</template>

<script>
import User from '../scripts/User.js';
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import PageTitle from '../components/labels/PageTitle.vue';
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
]

export default {
    name: "Account",
    components: {
        ButtonBlock,
        Modal,
        PageTitle
    },
    methods: { deleteAccount },
    data() {
        return { User, userFields };
    },
    setup() {},
    mounted() {
        page = this;
    }
};
</script>

<style>

</style>