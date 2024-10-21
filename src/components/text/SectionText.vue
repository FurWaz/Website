<template>
    <div class="flex justify-center items-center space-x-4 py-4">
        <span class="flex bg-slate-300 dark:bg-slate-500 rounded w-10 h-1" />
        <p class="text-xl md:text-2xl font-semibold text-slate-500 dark:text-slate-400 overflow-hidden whitespace-nowrap">
            <slot />
        </p>
        <span class="flex bg-slate-300 dark:bg-slate-500 rounded w-10 h-1" />
    </div>
</template>

<script>
export default {
    name: "SectionText"
}
</script>