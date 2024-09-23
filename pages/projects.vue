<template>
    <div class="flex flex-col">
        <div class="show-down flex flex-col items-center space-y-4">
            <h2> Mes projets </h2>
            <UInput class="show-down" v-model="search" placeholder="Rechercher un projet" />
        </div>
        <div class="flex flex-wrap h-fit w-full overflow-auto">
            <ProjectCard v-for="(project, index) in projects" :key="project.id" :project="project"
                class="my-4 mx-auto" :style="`animation-delay: ${index}00ms;`"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const header = useHeader();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('projects.title')}`,
    description: `${t('projects.description')}`,
    ogTitle: `FurWaz - ${t('projects.title')}`,
    ogDescription: `${t('projects.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('projects.name'));

const search = ref<string>('');

type Project = { id: number, name: string, description: string, image: string, link: string };
const projects = ref<Project[]>([
    {
        id: 1,
        name: 'FullBowody',
        description: 'Traquez votre corps en temps réel avec de simples caméras !',
        image: '/icon.png',
        link: 'https://furwaz.com'
    },
    {
        id: 2,
        name: 'Pypoll',
        description: 'Demande à des milliers de gens en quelques secondes !',
        image: '/icon.png',
        link: 'https://furwaz.com'
    },
    {
        id: 3,
        name: 'VyBeen',
        description: 'Ecoutez de la musique et chantez ensemble avec VyBeen !',
        image: '/icon.png',
        link: 'https://furwaz.com'
    }
]);
</script>