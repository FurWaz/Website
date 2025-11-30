<template>
    <NuxtLink :to="props.url" target="_blank" class="show-up w-full" :style="`animation-delay: ${props.delay*50}ms`">
        <div class="flex justify-between bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg py-2 px-4 w-full
                    hover:bg-primary-100 hover:border-primary-500 hover:dark:bg-primary-500/[0.5] hover:dark:border-primary-500 transition-colors">
            <div class="flex justify-start items-center">
                <UIcon :name="props.icon" class="w-6 h-6 mr-4" />
                <p class="text-xl font-semibold">{{ props.label }}</p>
            </div>
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5" />
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string;
    url: string;
    icon: string;
    delay: number;
}>();
</script>

<style></style>