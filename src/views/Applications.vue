<template>
    <div class="flex grow">
        <topbar></topbar>
        <div class="flex grow pt-20">
            <div class="flex flex-col grow pt-10 max-h-[50em]">
                <div class="flex w-full h-fit justify-center">
                    <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                        <h1 class="spawn-down text-slate-200 text-4xl font-bold mb-1"> Applications </h1>
                    </div>
                </div>
                <div class="flex flex-row grow m-10 justify-center p-10">
                    <div class="spawn-up flex flex-col border-2 border-slate-600 rounded-lg px-4 py-1 w-min">
                        <div class="flex mx-auto">
                            <h1 class="text-slate-300 text-4xl font-bold mx-20"> FullBowody </h1>
                        </div>
                        <div class="flex flex-col grow p-2 justify-center">
                            <div class="flex mx-auto w-fit h-fit rounded-lg bg-black/[0.1]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-blue-500 w-40 h-40">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-col grow p-2 space-y-4 justify-between">
                            <div class="flex mx-auto w-fit h-fit">
                                <p class="text-slate-400 font-semibold text-lg">Track your body with two or more basic cameras</p>
                            </div>
                            <div class="flex flex-wrap justify-evenly">
                                <button-block class="m-1" href="/fullbowody"> Go to page </button-block>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import Topbar from '../components/Topbar.vue'

export default {
    name: "Home",
    components: {
        Topbar,
        ButtonBlock
    },
    methods: {},
    data() { return {}; },
    setup() {},
    mounted() {}
};
</script>

<style>
@keyframes jump {
    0%, 100% {
        transform: translateX(0px);
    }
    10% {
        transform: translateX(5px);
    }
}

.jump { animation: jump 8s infinite cubic-bezier(0.5, 0, 0, 0.5); }
</style>