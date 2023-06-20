<template>
    <div class="flex flex-col grow min-h-full w-full">
        <icon-header :label="lang.About()" />
        <div class="flex flex-col">
            <h2 class="show-up my-10 text-center text-xl font-bold italic text-slate-500">
                This section is still in development, please come back later
            </h2>
        </div>
    </div>
</template>

<script>
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';
import IconHeader from '../components/cards/IconHeader.vue';

export default {
    name: "MyApps",
    components: {
        IconHeader
    },
    data() {
        return {
            lang: Lang.CurrentLang
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
    },
    methods: {
        
    }
}
</script>