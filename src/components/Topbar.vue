<template>
    <div class="absolute w-screen h-fit">
        <div class="flex grow h-fit m-4 rounded-lg p-2 bg-blue-500 shadow-xl">
            <div class="flex grow flex-col justify-center">
                <h1 class="text-white text-2xl font-bold mx-2">FurWaz</h1>
            </div>
            <div class="flex flex-col justify-center">
                <div v-if="User.getCurrentUser() == null" class="flex flex-row justify-center space-x-6">
                    <button-text href="/register"> Register </button-text>
                    <button-block href="/login"> Log in </button-block>
                </div>
                <div v-if="User.getCurrentUser() != null" class="flex flex-row justify-center space-x-6">
                    <div id="profile" class="text-white/[0.9] border-2 border-white/[0.2] rounded-lg cursor-pointer hover:shadow-md hover:text-white hover:border-white/[0.4] transition-all">
                        <div class="flex flex-row justify-between px-2 py-1 w-fit h-fit">
                            <div class="flex flex-col justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <div class="flex flex-col justify-center">
                                <p class="font-bold text-md"> {{ User.getCurrentUser().username }} </p>
                            </div>
                        </div>
                        <div id="menu" class="flex grow-0 relative h-0 transition-all cursor-default">
                            <div class="absolute top-0 right-0 w-fit h-fit pb-8 pt-2 pl-8">
                                <div class="bg-blue-500 shadow-lg border-2 border-white/[0.2] rounded-lg px-2 py-2 w-fit ml-auto space-y-1">
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

import User from "../scripts/User.js";

function disconnect() {
    User.forget();
    window.location.href = window.location.href;
}

export default {
    name: "Topbar",
    methods: { disconnect },
    components: {
        ButtonBlock,
        ButtonText
    },
    data() { return { User }; },
    setup() {},
    mounted() {}
};
</script>

<style scoped>
#profile > #menu {
    opacity: 0;
    pointer-events: none;
}
#profile:hover > #menu {
    opacity: 1;
    pointer-events: all;
}
</style>