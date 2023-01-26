<template>
    <div class="show-down flex flex-col px-2 max-w-[100vw] min-w-0">
        <div class="flex flex-row justify-center mx-auto pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-blue-500 w-20 h-20 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <div class="flex flex-col justify-center">
                <h1 class="text-slate-200 md:text-6xl text-4xl font-extrabold">FullBowody</h1>
            </div>
        </div>
        <p ref="description" class="text-slate-500 text-2xl font-semibold text-center mx-auto min-w-0 max-w-[100%] whitespace-wrap"> <slot></slot> </p>
    </div>
</template>

<script>
export default {
    name: "FbTitle",
    components: {},
    methods: { },
    props: {},
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