<template>
    <div class="spawn-down flex flex-col">
        <div
            v-if="this.displayBackBtn"
            class="cursor-pointer left-8 top-8 fixed py-1 px-4 shadow-md rounded-lg bg-slate-600 border-2 border-slate-500 text-slate-400
                   hover:bg-slate-500 hover:border-slate-400 hover:text-slate-200 hover:shadow-lg animate-arrow transition-all"
            v-on:click="goBack()"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                class="w-6 h-6"
            >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
        </div>
        <div class="flex flex-row justify-center mx-auto pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-500 w-20 h-20 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <h1 class="text-slate-200 text-6xl font-extrabold">FullBowody</h1>
        </div>
        <p ref="description" class="text-slate-500 text-4xl font-semibold mx-auto"> <slot></slot> </p>
    </div>
</template>

<script>
export default {
    name: "FbTitle",
    components: {},
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
    props: {
        displayBackBtn: {
            type: Boolean,
            default: true
        }
    },
    data() { return {}; },
    setup() {},
    mounted() {}
};
</script>

<style scoped>
.animate-arrow:hover > svg {
    @apply -translate-x-1;
}
.animate-arrow > svg {
    @apply -translate-x-0 transition-all;
}
</style>