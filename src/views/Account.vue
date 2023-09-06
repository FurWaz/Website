<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <icon-header :label="Lang.CreateTranslationContext('account', 'Account')" />
        <div class="flex h-fit items-baseline overflow-y-auto px-4 my-auto py-2">
            <div class="flex flex-col md:grid md:grid-cols-2 md:gap-8 md:w-fit md:h-fit justify-center items-center">
                <button-redirect
                    v-for="(item, index) in links"
                    v-show="!item.condition || item.condition()"
                    :key="item"
                    class="show-right md:m-0 m-2"
                    :style="'animation-delay: '+index+'00ms;'"
                    :href="item.href"
                    :icon="item.icon"
                >
                    <get-text :context="Lang.CreateTranslationContext('account', item.name)" />
                </button-redirect>
            </div>
        </div>
        <button-block
            class="show-up m-4"
            :onclick="disconnect"
        >
            <get-text :context="Lang.CreateTranslationContext('verbs', 'LogOut')" />
        </button-block>
    </div>
</template>

<script>
import IconHeader from '../components/cards/IconHeader.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import ButtonRedirect from '../components/inputs/ButtonRedirect.vue';
import Lang from '../scripts/Lang';
import User from '../scripts/User';

import {
    UserIcon,
    Squares2X2Icon,
    KeyIcon,
    ComputerDesktopIcon,
    Cog6ToothIcon,
    CommandLineIcon
} from '@heroicons/vue/24/outline';
import GetText from '../components/text/GetText.vue';

const links = [
    {name: "Profile",  icon: UserIcon, href: "/my/profile"},
    {name: "Apps",     icon: Squares2X2Icon, href: "/my/apps"},
    {name: "Sessions", icon: ComputerDesktopIcon, href: "/my/sessions"},
    {name: "Security", icon: KeyIcon, href: "/my/security"},
    {name: "Settings", icon: Cog6ToothIcon, href: "/my/settings"},
    {name: "Administration", icon: CommandLineIcon, href: "/admin", condition: () => User.CurrentUser.role_id >= 2},
];

export default {
    name: "AccountView",
    components: {
        ButtonRedirect,
        IconHeader,
        ButtonBlock,
        GetText
    },
    data() {
        return {
            Lang,
            links,
            User
        };
    },
    mounted() {},
    methods: {
        disconnect() {
            User.forget();
            this.$router.go();
        }
    }
}
</script>