<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header :label="Lang.CreateTranslationContext('admin', 'Admin')" />
    </div>
</template>

<script>
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';
import IconHeader from '../components/cards/IconHeader.vue';
import ButtonBack from '../components/inputs/ButtonBack.vue';

export default {
    name: "MyApps",
    components: {
        IconHeader,
        ButtonBack,
    },
    data() {
        return {
            Lang,
            
        };
    },
    mounted() {
        animateShows(this.$el);
    },
    methods: {
        
    }
}
</script>