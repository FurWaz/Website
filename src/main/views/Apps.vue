<template>
    <div class="flex grow">
        <topbar></topbar>
        <div class="flex grow pt-20 min-w-0 min-h-0">
            <div class="flex flex-col grow pt-10 min-w-0">
                <div class="flex w-full h-fit justify-center">
                    <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                        <h1 class="show-down text-slate-200 text-4xl font-bold mb-1"> Applications </h1>
                    </div>
                </div>
                <div class="flex flex-wrap grow my-10 justify-center py-10">
                    <big-card v-for="app in apps" :data="app"></big-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Topbar from '../components/Topbar.vue';
import BigCard from '../components/Cards/BigCard.vue';

const apps = [
    {
        title: "FullBowody",
        description: "Track your body with two or more basic cameras",
        link: "Go to page",
        href: "/apps/fullbowody",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />`
    },
    {
        title: "Converter",
        description: "Convert YouTube videos to any audio / video file !",
        link: "Convert videos",
        href: "/apps/conv",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />`
    },
    {
        title: "Processor",
        description: "Play with a little processor, make it evolve in his world and fight agains other processors !",
        link: "See the game",
        href: "/apps/processor",
        icon: `<line x1="6" y1="12" x2="10" y2="12"></line>
               <line x1="8" y1="10" x2="8" y2="14"></line>
               <line x1="15" y1="13" x2="15.01" y2="13"></line>
               <line x1="18" y1="11" x2="18.01" y2="11"></line>
               <rect x="2" y="6" width="20" height="12" rx="2"></rect>`
    }
];

export default {
    name: "Apps",
    components: {
        Topbar,
        BigCard
    },
    methods: {},
    data() { return { apps }; },
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