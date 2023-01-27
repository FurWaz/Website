<template>
    <div class="flex grow">
        <div class="flex grow pt-10">
            <div class="flex grow flex-col justify-center">
                <div class="flex flex-col">
                    <p class="show-down text-6xl md:text-8xl text-slate-400 font-extrabold mx-auto mt-4 drop-shadow-xl"> Woops </p>
                    <div class="show-down flex mt-4 mx-auto">
                        <p class="text-4xl text-slate-500"> &lpar; </p>
                        <p class="text-4xl text-slate-500 float" style="transform: translatey(2px); animation-delay: 500ms;"> ⊙ </p>
                        <p class="text-4xl text-slate-500"> . </p>
                        <p class="text-4xl text-slate-500 float" style="transform: translatey(2px); animation-delay: 0ms;"> ☉ </p>
                        <p class="text-4xl text-slate-500"> &rpar; </p>
                        <p class="text-4xl text-slate-500 rotate"> 7 </p>
                    </div>
                </div>
                <div class="flex flex-col grow justify-center">
                    <p class="show-up text-2xl md:text-4xl text-slate-500 text-center mx-auto"> Seems like this page doesn't exist ... </p>
                    <div class="w-fit h-fit mx-auto mt-4">
                        <button-block class="show-up" :action="() => { goBack(); }"> Go back </button-block>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import { goBack } from '../scripts/common.js';

export default {
    name: "Home",
    components: {
        ButtonBlock
    },
    methods: { goBack },
    data() { return {}; },
    setup() {},
    mounted() {
        
    }
};
</script>

<style>
@keyframes float {
    0%, 100% {
        transform: translatey(2px);
    }
    50% {
        transform: translatey(-2px);
    }
}
@keyframes rotate {
    0%, 100% {
        transform: rotate(-10deg);
    }
    50% {
        transform: rotate(10deg);
    }
}

.float { animation: float 3s ease-in-out infinite; }
.rotate { animation: rotate 2s ease-in-out infinite; transform-origin: 50% 100%; }
</style>