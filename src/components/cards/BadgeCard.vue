<template>
    <div
        class="flex flex-col justify-center items-center border-2 rounded-md border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 transition-all"
        :class="hoverable? ' hover:border-slate-300 hover:dark:border-slate-500 hover:text-slate-600 hover:dark:text-white' : ''"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: "BadgeCard",
    props: {
        hoverable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    }
}
</script>