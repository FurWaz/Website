<template>
    <div class="flex flex-col grow">
        <div class="show-down flex flex-row px-2 max-w-[100vw] min-w-0 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-orange-500 w-20 h-20 mr-4">
            <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
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
            <path d="M12 13.5V8"></path>
            </svg>
            <div class="flex flex-col justify-center">
                <h1 class="dark:text-slate-200 text-slate-500 text-6xl font-extrabold"> Piuzle </h1>
            </div>
        </div>
        <p ref="description" class="show-down text-slate-500 text-2xl font-semibold text-center mx-auto min-w-0 max-w-[100%] whitespace-wrap"> {{ Lang.CurrentLang.PiuzleDescription }} </p>
        <div class="flex flex-col justify-center h-fit m-4 mt-40">
            <p class="show-up text-slate-400 text-4xl font-semibold text-center mx-auto min-w-0 max-w-[100%] whitespace-wrap"> Woops, sorry but this page isn't finished yet :/ </p>
            <button-block class="show-up w-fit mx-auto mt-10" style="animation-delay: 200ms;" :action="goBack"> Go Back </button-block>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../../main/components/buttons/ButtonBlock.vue';
import Lang from "../../main/scripts/Lang";
import { goBack } from "../../main/scripts/common";

export default {
    name: "Home",
    components: {
        ButtonBlock
    },
    methods: { goBack },
    data() { return { Lang }; },
    setup() {},
    mounted() {
        
    }
};
</script>

<style>

</style>