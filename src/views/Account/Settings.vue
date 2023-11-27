<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="px-2 h-fit" />
        <icon-header :label="Lang.CreateTranslationContext('account', 'Settings')" />
        <div class="flex flex-col">
            <h2 class="show-up my-10 text-center text-xl font-bold italic text-slate-500">
                This section is still in development, please come back later
            </h2>
        </div>
    </div>
</template>

<script>
import { animateShows } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import IconHeader from '../../components/cards/IconHeader.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import ModalCard from '../../components/cards/ModalCard.vue';
import ConfirmForm from '../../components/cards/ConfirmForm.vue';

export default {
    name: "MyApps",
    components: {
        IconHeader,
        ButtonBack,
        ModalCard,
        ConfirmForm
    },
    data() {
        return {
            Lang
        };
    },
    mounted() {
        animateShows(this.$el);
    },
    methods: {
        
    }
}
</script>