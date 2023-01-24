<template>
    <div class="flex grow">
        <div class="flex flex-col grow mt-10">
            <conv-card></conv-card>

            <div style="animation-delay: 800ms;" class="show-up flex flex-col justify-center mt-10">
                <h1 style="animation-delay: 0.3s;" class="extends text-slate-400 md:text-5xl text-3xl text-center font-extrabold italic"> Woops ! </h1>
                <h1 style="animation-delay: 0.4s;" class="extends text-slate-400 md:text-3xl text-2xl text-center font-extrabold italic"> This page doesn't exist :/ </h1>
                <h1 class="mt-6 text-slate-600 md:text-3xl text-2xl text-center font-extrabold italic tracking-widest"> Where am I ? (*~*)</h1>
            </div>

            <div style="animation-delay: 1s;" class="show-up flex flex-col grow justify-center">
                <div class="flex mx-auto">
                    <button-big :action="goBack"> Go back </button-big>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBig from '../components/buttons/ButtonBig.vue'
import { goBack } from '../scripts/common';
import ConvCard from '../components/cards/ConvCard.vue';

export default {
    name: "NotFound",
    components: {
        ButtonBig,
        ConvCard
    },
    methods: {},
    data() { return { goBack }; },
    setup() {},
    mounted() {}
};
</script>

<style scoped>
@keyframes extends {
    0% {
        letter-spacing: 0px;
        opacity: 0;
    }
    50% {
        letter-spacing: 5px;
        opacity: 0.9;
    }
    100% {
        letter-spacing: 0px;
        opacity: 1;
    }
}
.extends { animation: extends 0.6s ease-out; }
</style>