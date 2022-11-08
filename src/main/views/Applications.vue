<template>
    <div class="flex grow">
        <topbar></topbar>
        <div class="flex grow pt-20 min-w-0">
            <div class="flex flex-col grow pt-10 max-h-[50em] min-w-0">
                <div class="flex w-full h-fit justify-center">
                    <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                        <h1 class="spawn-down text-slate-200 text-4xl font-bold mb-1"> Applications </h1>
                    </div>
                </div>
                <div class="flex flex-row grow m-10 justify-center py-10">
                    <div
                        v-for="app in applications"
                        class="spawn-up flex flex-col border-2 border-slate-600 rounded-lg px-4 py-1 mx-8 w-min min-w-[15vw] max-w-full
                               hover:border-slate-500 hover:shadow-lg cursor-pointer transition-all"
                        v-on:click="redirectTo(app.href)"
                    >
                        <div class="flex mx-auto">
                            <h1 class="text-slate-300 text-4xl font-bold mx-auto px-10"> {{ app.title }} </h1>
                        </div>
                        <div class="flex flex-col grow p-2 justify-center">
                            <div class="flex mx-auto  w-fit h-fit rounded-lg bg-black/[0.1]">
                                <svg xmlns="http://www.w3.org/2000/svg" v-html="app.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 w-40 h-40">
                                    
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-col grow p-2 space-y-4 justify-between">
                            <div class="flex mx-auto w-fit h-fit">
                                <p class="text-slate-400 font-semibold text-lg"> {{ app.description }} </p>
                            </div>
                            <div class="flex flex-wrap justify-evenly">
                                <button-block class="m-1" :href="app.href"> {{ app.link }} </button-block>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import Topbar from '../components/Topbar.vue'
import { redirectTo } from "../scripts/common.js";

const applications = [
    {
        title: "FullBowody",
        description: "Track your body with two or more basic cameras",
        link: "Go to page",
        href: "/applications/fullbowody",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />`
    },
    {
        title: "Processor",
        description: "Play with a little processor, make it evolve in his world and fight agains other processors !",
        link: "See the game",
        href: "/applications/processor",
        icon: `<line x1="6" y1="12" x2="10" y2="12"></line>
               <line x1="8" y1="10" x2="8" y2="14"></line>
               <line x1="15" y1="13" x2="15.01" y2="13"></line>
               <line x1="18" y1="11" x2="18.01" y2="11"></line>
               <rect x="2" y="6" width="20" height="12" rx="2"></rect>`
    }
];

export default {
    name: "Applications",
    components: {
        Topbar,
        ButtonBlock
    },
    methods: {},
    data() { return { applications, redirectTo }; },
    setup() {},
    mounted() {}
};
</script>

<style>
@keyframes jump {
    0%, 100% {
        transform: translateX(0px);
    }
    10% {
        transform: translateX(5px);
    }
}

.jump { animation: jump 8s infinite cubic-bezier(0.5, 0, 0, 0.5); }
</style>