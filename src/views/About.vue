<template>
    <div class="flex flex-col grow min-h-full w-full">
        <div class="flex flex-col justify-center items-center h-[20%] my-20">
            <icon-card class="h-40 w-40" />
            <h1
                class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                {{ lang.About() }}
            </h1>
        </div>
        <div class="flex h-fit w-full mt-20">
            
        </div>
    </div>
</template>

<script>
import IconCard from "../components/cards/IconCard.vue";
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

export default {
    name: "HomeView",
    components: {
        IconCard
    },
    data() {
        return { lang: Lang.CurrentLang };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
    }
}
</script>