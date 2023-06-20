<template>
    <div class="flex flex-col justify-center items-center">
        <icon-card class="noscroll show-up h-24 w-24" />
        <title-text
            class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
            style="animation-delay: 200ms;"
        >
            {{ label }}
        </title-text>
    </div>
</template>

<script>
import IconCard from './IconCard.vue';
import TitleText from '../text/TitleText.vue';
import { animateShows } from '../../scripts/common';

export default {
    name: "IconHeader",
    components: {
        IconCard,
        TitleText
    },
    props: {
        label: {
            type: String,
            required: true
        }
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