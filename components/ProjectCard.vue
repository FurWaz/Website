<template>
    <div class="flex flex-col space-y-4 card p-4 w-80 h-full">
        <div class="flex h-full justify-start items-center space-x-4">
            <img :src="project.image" class="w-12 h-12 rounded-md bg-slate-200 dark:bg-slate-800" :class="project.imagePadding? 'p-1.5' : ''"/>
            <h2> {{ text(project.name) }} </h2>
        </div>
        <div class="flex flex-col grow w-full h-full py-2">
            <p class="text-slate-600 dark:text-slate-300"> {{ text(project.description) }} </p>
        </div>
        <div class="flex overflow-auto w-full h-fit">
            <div class="flex space-x-4 w-fit h-fit">
                <div v-for="tag in project.tags" :key="tag" class="flex rounded bg-slate-200 dark:bg-slate-800 px-1">
                    <p class="whitespace-nowrap"> #{{ tag }} </p>
                </div>
            </div>
        </div>
        <div class="flex min-w-fit h-full justify-between items-center">
            <UButton v-if="project.links.website" :to="project.links.website" trailing variant="solid" target="_blank">
                {{ $t('projects.action.seeWebsite') }}
            </UButton>
            <UButton v-if="project.links.github" :to="project.links.github" variant="ghost" target="_blank">
                {{ $t('projects.action.seeCode') }}
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Project } from '~/composables/Projects';

defineProps<{
    project: Project;
}>();
</script>
