<template>
    <div
        class="spawn-up flex flex-col border-2 border-slate-600 rounded-lg px-4 py-1 mx-8 my-4 max-w-[25em] min-w-min
                hover:border-slate-500 hover:shadow-lg cursor-pointer transition-all"
        v-on:click="redirectTo(data.href)"
    >
        <div class="flex w-fit mx-auto min-w-min">
            <h1 class="text-slate-300 text-4xl font-bold mx-auto mt-2 whitespace-nowrap"> {{ data.title }} </h1>
        </div>
        <div class="flex w-fit mx-auto h-fit flex-col px-2 py-6 justify-center">
            <div class="flex mx-auto w-fit h-fit rounded-lg bg-black/[0.1]">
                <svg xmlns="http://www.w3.org/2000/svg" v-html="data.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 w-40 h-40">
                    
                </svg>
            </div>
        </div>
        <div class="flex flex-col mx-auto w-fit grow p-2 space-y-4 justify-between">
            <div class="flex mx-auto w-fit h-fit">
                <p class="text-slate-400 font-semibold text-lg"> {{ data.description }} </p>
            </div>
            <div class="flex w-fit justify-evenly">
                <button-block class="m-1" :href="data.href"> {{ data.link }} </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../buttons/ButtonBlock.vue';
import { redirectTo } from "../../scripts/common.js";

export default {
    name: "PresCard",
    components: {
        ButtonBlock
    },
    methods: {},
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() { return { redirectTo }; },
    setup() {},
    mounted() {}
};
</script>