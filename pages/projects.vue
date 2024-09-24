<template>
    <div class="flex flex-col">
        <div class="show-down flex flex-col justify-center items-center space-y-4 pb-4">
            <h2> {{ $t('projects.myProjects') }} </h2>
            <div class="flex flex-col w-fit justify-center items-start space-y-2">
                <UInput class="show-down" v-model="search" :placeholder="t('projects.search')" />
                <UFormGroup name="type" label="Type" class="flex justify-center items-center space-x-2 space-y-0">
                    <USelect class="show-down" v-model="type" :options="projectTypes" />
                </UFormGroup>
            </div>
        </div>
        <div class="flex flex-wrap justify-center items-center h-fit w-full overflow-auto px-2">
            <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" class="show-up m-4 md:m-8" />
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
const type = ref<string>(route.query.type as string || 'all');

const projectTypes = ref<{ value: string, label: string }[]>([
    { value: 'all', label: t('projects.type.all') },
    { value: 'project', label: t('projects.type.project') },
    { value: 'application', label: t('projects.type.application') },
    { value: 'website', label: t('projects.type.website') },
    { value: 'game', label: t('projects.type.game') }
]);

type ProjectType = 'project' | 'application' | 'website' | 'game';
type Project = { id: number, name: string, description: string, image: string, link: string, type: ProjectType };
const projects = ref<Project[]>([
    {
        id: 1,
        name: 'FullBowody',
        description: 'Traquez votre corps en temps réel avec de simples caméras !',
        image: '/icon.png',
        link: 'https://furwaz.com',
        type: 'application'
    },
    {
        id: 2,
        name: 'Pypoll',
        description: 'Demandez à des milliers de gens en quelques secondes !',
        image: '/icon.png',
        link: 'https://furwaz.com',
        type: 'application'
    },
    {
        id: 3,
        name: 'VyBeen',
        description: 'Écoutez de la musique et chantez ensemble avec VyBeen !',
        image: '/icon.png',
        link: 'https://furwaz.com',
        type: 'application'
    },
    {
        id: 4,
        name: 'Robot',
        description: 'Un robot humanoïde en impression 3D, animé par un Arduino Nano !',
        image: '/icon.png',
        link: 'https://furwaz.com',
        type: 'project'
    },
    {
        id: 4,
        name: 'PixelPets',
        description: 'Programmez votre animal pour le faire évoluer dans son monde !',
        image: '/icon.png',
        link: 'https://furwaz.com',
        type: 'game'
    }
]);
const filteredProjects = computed(() => {
    return projects.value.filter(project => {
        if (type.value !== 'all' && project.type !== type.value) return false;
        if (!search.value) return true;
        return project.name.toLowerCase().includes(search.value.toLowerCase());
    });
});
</script>