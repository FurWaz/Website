<template>
    <div class="flex flex-col justify-center items-center">
        <icon-card
            v-show="showIcon"
            class="noscroll show-up h-24 w-24"
        />
        <title-text
            class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
            style="animation-delay: 200ms;"
        >
            <GetText :context="label" />
        </title-text>
    </div>
</template>

<script>
import IconCard from './IconCard.vue';
import TitleText from '../text/TitleText.vue';
import { animateShows } from '../../scripts/common';
import GetText from '../text/GetText.vue';

export default {
    name: "IconHeader",
    components: {
        IconCard,
        TitleText,
        GetText
    },
    props: {
        label: {
            type: [String, Object],
            required: true
        },
        showIcon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    mounted() {
        animateShows(this.$el);
    }
}
</script>