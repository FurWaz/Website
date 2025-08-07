<template>
    <div class="flex flex-col">
        <div class="show-down flex flex-col justify-center items-center space-y-4 pb-4">
            <h2 class="text-2xl text-center"> {{ $t('projects.myProjects') }} </h2>
            <div class="show-down flex flex-col w-fit justify-center items-start space-y-2">
                <UInput v-model="search" :placeholder="t('projects.search')" />
                <UFormField name="type" label="Type" class="show-down flex justify-center items-center space-x-2 space-y-0">
                    <USelect v-model="type" :items="projectTypes" />
                </UFormField>
            </div>
        </div>
        <div class="flex flex-wrap justify-center items-center h-fit w-full overflow-auto px-2">
            <ProjectCard v-for="(project, index) in filteredProjects" :key="index" :project="project" class="show-up m-4 md:m-8" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProjects, type Project } from '~/composables/Projects';

const header = useHeader();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const projects = ref<Project[]>(useProjects());

const matchingProject = projects.value.find(p => p.name === router.currentRoute.value.query.project);
if (matchingProject) {
    useSeoMeta({
        title: `${matchingProject.name} - ${matchingProject.description[locale.value]}`,
        description: `${matchingProject.explanation![locale.value]![0]}`,
        ogTitle: `${matchingProject.name} - ${matchingProject.description[locale.value]}`,
        ogDescription: `${matchingProject.explanation![locale.value]![0]}`,
        ogImage: matchingProject.image,
        ogUrl: 'https://furwaz.com' + route.fullPath
    });
} else {
    useSeoMeta({
        title: `FurWaz - ${t('projects.title')}`,
        description: `${t('projects.description')}`,
        ogTitle: `FurWaz - ${t('projects.title')}`,
        ogDescription: `${t('projects.description')}`,
        ogImage: '/icon.png',
        ogUrl: 'https://furwaz.com' + route.fullPath
    });
}

header.setTitle(t('projects.name'));

const search = ref<string>(route.query.search as string || '');
const type = ref<string>(route.query.type as string || 'all');

watch(search, () => { router.push({ query: { search: search.value, type: type.value } }); });
watch(type, () => { router.push({ query: { search: search.value, type: type.value } }); });

const projectTypes = ref<{ value: string, label: string }[]>([
    { value: 'all', label: t('projects.type.all') },
    { value: 'project', label: t('projects.type.project') },
    { value: 'application', label: t('projects.type.application') },
    { value: 'website', label: t('projects.type.website') },
    { value: 'game', label: t('projects.type.game') }
]);
watch(locale, () => {
    projectTypes.value = [
        { value: 'all', label: t('projects.type.all') },
        { value: 'project', label: t('projects.type.project') },
        { value: 'application', label: t('projects.type.application') },
        { value: 'website', label: t('projects.type.website') },
        { value: 'game', label: t('projects.type.game') }
    ];
});

function levenshteinDistance(s: string, t: string) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] = i === 0
                ? j
                : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
        }
    }
    return arr[t.length][s.length];
};

const filteredProjects = computed(() => {
    const categoryFiltered = projects.value.filter(p => type.value === 'all' || p.type === type.value);
    if (search.value.trim().length === 0) return categoryFiltered;

    const keys = search.value.split(" ").filter(item => item.length > 0);
    const weightedProjects = categoryFiltered.map(project => {
        let nameWeight = 0;
        let descriptionWeight = 0;
        let tagsWeight = 0;

        keys.forEach((key, index) => {
            const nameMatches = project.name.toLowerCase().includes(key.toLowerCase());
            const descriptionMatches = text(project.description).toLowerCase().includes(key.toLowerCase());
            const searchMatches = (project.tags !== undefined && project.tags !== null && project.tags.length > 0)
                ? project.tags.reduce((acc, tag) => {
                    const tagMatches = tag.toLowerCase().includes(key.toLowerCase());
                    if (tagMatches) return acc + 5;
                    const distance = levenshteinDistance(tag.toLowerCase(), key.toLowerCase());
                    if (distance <= 2) return acc + (4 - distance);
                    return acc;
                }, 0)
                : 0;
            const ratio = 1 - (index / keys.length);
            nameWeight += (nameMatches? 10: 0) * ratio;
            descriptionWeight += (descriptionMatches? 5: 0) * ratio;
            tagsWeight += (searchMatches) * ratio;
        });

        return {
            project,
            weight: nameWeight + descriptionWeight + tagsWeight
        };
    });

    const sortedProjects = weightedProjects.sort((a, b) => b.weight - a.weight);
    return sortedProjects.filter(item => item.weight > 0).map(item => item.project);
});
</script>