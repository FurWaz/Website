<template>
    <div class="show-down flex w-full h-fit justify-center">
        <div class="flex border-2 border-orange-500 dark:bg-slate-700 bg-slate-200 rounded-lg shadow-xl px-4 pb-2 pt-1">
            <h1 class="dark:text-slate-200 text-slate-700 text-4xl font-bold mb-1"> <slot></slot> </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageTitle",
    setup() {},
    data() {
        return {};
    },
    mounted() {},
    methods: {}
}
</script>