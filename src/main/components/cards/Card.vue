<template>
    <div class="flex flex-col border-2 dark:border-slate-500 border-slate-300 dark:bg-slate-700 bg-slate-200 p-2 rounded-lg shadow-lg h-fit w-fit">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Card',
    data() { return {} },
    components: {},
    methods: {},
    mounted() {}
}
</script>