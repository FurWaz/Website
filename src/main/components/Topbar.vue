<template>
    <div class="fixed z-50 w-screen h-fit">
        <div class="flex grow h-fit m-4 rounded-lg shadow-xl p-2 bg-slate-700 border-2 border-slate-600">
            <div class="flex flex-col justify-center">
                <h1
                    class="text-white text-2xl font-bold mx-2 w-fit cursor-pointer hover:text-blue-500 select-none transition-all"
                    v-on:click="redirectHome(false)"
                > FurWaz </h1>
            </div>
            <div class="flex grow flex-row space-x-4 w-fit mx-4 overflow-x-auto">
                <div class="flex flex-col justify-center">
                    <button-topbar href="/applications"> Applications </button-topbar>
                </div>
                <div class="flex flex-col justify-center">
                    <button-topbar href="/projects"> Projects </button-topbar>
                </div>
                <div class="flex flex-col justify-center">
                    <button-topbar href="/about"> About </button-topbar>
                </div>
            </div>
            <div class="flex flex-col justify-center">
                <div v-if="User.CurrentUser == null" class="flex flex-row justify-center space-x-6">
                    <button-text href="/register"> Register </button-text>
                    <button-block href="/login"> Log in </button-block>
                </div>
                <div v-if="User.CurrentUser != null" class="flex flex-row justify-center space-x-6">
                    <div class="text-slate-300 border-2 border-slate-600 rounded-lg cursor-pointer hover:shadow-md hover:text-slate-200 hover:border-blue-500 transition-all">
                        <div v-on:click="toggleProfile" class="flex flex-row justify-between px-2 py-1 w-fit h-fit">
                            <div class="flex flex-col justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <div class="flex flex-col justify-center">
                                <p class="font-bold text-md"> {{ User.CurrentUser.username }} </p>
                            </div>
                        </div>
                        <div id="menu" class="flex grow-0 relative h-0 transition-all cursor-default">
                            <div class="absolute top-0 right-0 w-fit h-fit pb-8 pt-2 pl-8">
                                <div class="bg-slate-700 shadow-lg border-2 border-slate-600 rounded-lg px-2 py-2 pb-3 w-fit ml-auto space-y-1">
                                    <button-text href="/profile"> Profile </button-text>
                                    <button-text :action="disconnect"> Disconnect </button-text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from "./buttons/ButtonBlock.vue";
import ButtonText from "./buttons/ButtonText.vue";
import { redirectHome } from "../scripts/common.js";
import User from "../scripts/User.js";
import ButtonTopbar from './buttons/ButtonTopbar.vue';

function disconnect() {
    User.forget();
    window.location.href = window.location.href;
}

function toggleProfile() {
    let menu = document.getElementById("menu");
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    } else {
        menu.classList.add("show");
    }
}

export default {
    name: "Topbar",
    methods: { disconnect, toggleProfile },
    components: {
        ButtonBlock,
        ButtonText,
        ButtonTopbar
    },
    data() { return { User, redirectHome }; },
    setup() {},
    mounted() {}
};
</script>

<style scoped>
#menu {
    opacity: 0;
    pointer-events: none;
}
#menu.show {
    opacity: 1;
    pointer-events: all;
}
</style>