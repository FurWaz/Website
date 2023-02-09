<template>
    <div class="flex flex-col grow py-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.Applications }} </page-title>
        <div class="flex flex-wrap my-10 justify-center py-10 h-min">
            <div v-for="app in apps" class="flex show-up" :style="'animation-delay: ' + apps.indexOf(app) * 100 + 'ms;'">
                <big-card :data="app"></big-card>
            </div>
        </div>
    </div>
</template>

<script>
import BigCard from '../components/Cards/BigCard.vue';
import PageTitle from '../components/labels/PageTitle.vue';
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

const apps = [
    {
        title: "FullBowody",
        description: Lang.CurrentLang.FullbowodyDescription,
        link: Lang.CurrentLang.FullbowodyLink,
        href: "/apps/fullbowody",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />`
    },
    {
        title: "Converter",
        description: Lang.CurrentLang.ConverterDescription,
        link: Lang.CurrentLang.ConverterLink,
        href: "/apps/conv",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />`
    },
    {
        title: "Piuzle",
        description: Lang.CurrentLang.PiuzleDescription,
        link: Lang.CurrentLang.PiuzleLink,
        href: "/apps/piuzle",
        icon: `<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
            <path d="m7 16.5-4.74-2.85"></path>
            <path d="m7 16.5 5-3"></path>
            <path d="M7 16.5v5.17"></path>
            <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
            <path d="m17 16.5-5-3"></path>
            <path d="m17 16.5 4.74-2.85"></path>
            <path d="M17 16.5v5.17"></path>
            <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
            <path d="M12 8 7.26 5.15"></path>
            <path d="m12 8 4.74-2.85"></path>
            <path d="M12 13.5V8"></path>`
    },
    {
        title: "Processor",
        description: Lang.CurrentLang.ProcessorDescription,
        link: Lang.CurrentLang.ProcessorLink,
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
        BigCard,
        PageTitle
    },
    methods: {},
    data() { return { apps, Lang }; },
    setup() {},
    mounted() {
        animateShows(this.$el);
    }
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