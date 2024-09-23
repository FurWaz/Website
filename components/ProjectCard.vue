<template>
    <div class="show-down flex space-x-2 justify-evenly items-center card p-2 w-full h-fit max-w-[30em]">
        <div class="flex min-w-fit h-full justify-center items-center">
            <img :src="project.image" class="w-20 h-20 rounded-full" />
        </div>
        <div class="flex flex-col w-full h-full justify-start items-start px-2">
            <h3> {{ project.name }} </h3>
            <p class="my-auto text-sm text-slate-600 dark:text-slate-300"> {{ project.description }} </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Project = { id: number, name: string, description: string, image: string, link: string };
const props = defineProps<{
    project: Project;
}>();
</script>
