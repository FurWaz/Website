<template>
    <div class="flex flex-col space-y-2 card p-4 w-80 h-full">
        <div class="flex h-full justify-start items-center space-x-4">
            <img :src="project.image" class="w-12 h-12 rounded-md p-1 bg-slate-200 dark:bg-slate-800" />
            <h2> {{ project.name }} </h2>
        </div>
        <div class="flex flex-col grow w-full h-full py-4">
            <p class="text-slate-600 dark:text-slate-300"> {{ project.description }} </p>
        </div>
        <div class="flex min-w-fit h-full justify-between items-center">
            <UButton icon="i-heroicons-chevron-right" trailing variant="solid" :to="project.link" target="_blank">
                En savoir plus
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Project = { id: number, name: string, description: string, image: string, link: string, type: string };
const props = defineProps<{
    project: Project;
}>();
</script>
