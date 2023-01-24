<template>
    <div class="flex grow">
        <topbar></topbar>
        <div class="flex grow pt-20">
            <div class="flex grow pt-10">
                <div class="show-down flex w-full h-fit justify-center">
                    <div class="flex -skew-x-12 border-8 border-blue-500 bg-slate-800 h-fit w-fit px-8 pb-2 shadow-xl">
                        <div class="flex mx-auto skew-x-12">
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 0s;"> F </h1>
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 100ms;"> u </h1>
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 200ms;"> r </h1>
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 300ms;"> w </h1>
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 400ms;"> a </h1>
                            <h1 class="text-slate-50 md:text-8xl text-6xl font-bold jump" style="animation-delay: 500ms;"> z </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Topbar from '../components/Topbar.vue'

export default {
    name: "Home",
    components: {
        Topbar
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