<template>
    <div class="flex flex-col grow min-h-full h-fit w-full">
        <div class="flex flex-col h-[75vh] w-full justify-center items-center space-y-8">
            <icon-card class="h-48 w-48" />
            <h1
                class="noscroll show-up text-7xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                FurWaz
            </h1>
        </div>
        <div class="flex w-full h-fit justify-center">
            <ButtonBlock
                class="show-up"
                style="animation-delay: 600ms"
                :onclick="scrollForMore"
            >
                <div class="flex flex-col justify-center items-center">
                    <p> <GetText :context="{file: 'home', code: 'ScrollForMore'}" /> </p>
                    <chevron-down-icon class="w-6" />
                </div>
            </ButtonBlock>
        </div>
        <div class="flex md:flex-row flex-col h-fit w-full mt-20">
            <div class="md:flex hidden flex-col w-full">
                <home-apps />
                <home-about />
            </div>
            <home-apps class="md:hidden flex" />
            <div class="md:flex hidden flex-col w-fit items-end space-y-4">
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
            </div>
            <home-projects />
            <home-about class="md:hidden flex" />
        </div>
    </div>
</template>

<script lant="ts">
import { defineComponent } from 'vue';
import IconCard from "../components/cards/IconCard.vue";
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import { animateShows } from '../scripts/common';

import {
    ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import HomeProjects from '../components/home/HomeProjects.vue';
import HomeApps from '../components/home/HomeApps.vue';
import HomeAbout from '../components/home/HomeAbout.vue';
import GetText from '../components/text/GetText.vue';

export default defineComponent({
    name: "HomeView",
    components: {
        IconCard,
        ButtonBlock,
        ChevronDownIcon,
        HomeProjects,
        HomeApps,
        HomeAbout,
        GetText
    },
    data() {
        return {};
    },
    mounted() {
        animateShows(this.$el);
    },
    methods: {
        scrollForMore() {
            document.getElementById("page-content").scrollBy({
                top: window.innerHeight,
                behavior: "smooth"
            });
        }
    }
});
</script>
