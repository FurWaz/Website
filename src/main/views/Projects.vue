<template>
    <div class="flex grow">
        <topbar></topbar>
        <div class="flex grow pt-20 min-w-0">
            <div class="flex flex-col grow pt-10 max-h-[50em] min-w-0">
                <div class="flex w-full h-fit justify-center">
                    <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                        <h1 class="spawn-down text-slate-200 text-4xl font-bold mb-1"> Projects </h1>
                    </div>
                </div>
                <div class="flex flex-row grow m-10 justify-center py-10">
                    <div
                        v-for="project in projects"
                        class="spawn-up flex flex-col border-2 border-slate-600 rounded-lg px-4 py-1 mx-8 w-min min-w-[15vw] max-w-full
                               hover:border-slate-500 hover:shadow-lg cursor-pointer transition-all"
                        v-on:click="redirectTo(project.href)"
                    >
                        <div class="flex mx-auto">
                            <h1 class="text-slate-300 text-4xl font-bold mx-auto px-10"> {{ project.title }} </h1>
                        </div>
                        <div class="flex flex-col grow p-2 justify-center">
                            <div class="flex mx-auto  w-fit h-fit rounded-lg bg-black/[0.1]">
                                <svg xmlns="http://www.w3.org/2000/svg" v-html="project.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 w-40 h-40">
                                    
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-col grow p-2 space-y-4 justify-between">
                            <div class="flex mx-auto w-fit h-fit">
                                <p class="text-slate-400 font-semibold text-lg"> {{ project.description }} </p>
                            </div>
                            <div class="flex flex-wrap justify-evenly">
                                <button-block class="m-1" :href="project.href"> {{ project.link }} </button-block>
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

const projects = [
    {
        title: "VyBeen",
        description: "Listen music and sing with your friends !",
        link: "Try VyBeen",
        href: "/projects/vybeen",
        icon: `<path d="M9 18V5l12-2v13"></path>
               <circle cx="6" cy="18" r="3"></circle>
               <circle cx="18" cy="16" r="3"></circle>`
    },
    {
        title: "Robot",
        description: "Create your own humanoïd robot, with a 3D printer, an Arduino, and some motors !",
        link: "See project",
        href: "/projects/robot",
        icon: `<rect x="3" y="11" width="18" height="10" rx="2"></rect>
               <circle cx="12" cy="5" r="2"></circle>
               <path d="M12 7v4"></path>
               <line x1="8" y1="16" x2="8" y2="16"></line>
               <line x1="16" y1="16" x2="16" y2="16"></line>`
    }
]

export default {
    name: "Projects",
    components: {
        Topbar,
        ButtonBlock
    },
    methods: {},
    data() { return { projects, redirectTo }; },
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