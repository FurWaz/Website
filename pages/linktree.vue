<template>
    <div class="flex flex-col justify-start items-center space-y-12 w-full h-full">
        <div v-for="(categ, i) in links" class="show-up space-y-4 min-w-0 w-md max-w-full">
            <div class="flex justify-left items-center">
                <img :src="categ.icon" alt="icon" class="w-12 h-12 mr-2 rounded-lg" />
                <h1> {{ categ.category }} </h1>
            </div>
            <div class="flex flex-col space-y-2">
                <LinkTreeLink v-for="(link, i) in categ.links" :key="link.url" :label="link.label" :url="link.url" :icon="link.icon" :delay="i" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const header = useHeader();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('linktree.title')}`,
    description: `${t('linktree.description')}`,
    ogTitle: `FurWaz - ${t('linktree.title')}`,
    ogDescription: `${t('linktree.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('linktree.name'));

const links = [
    {
        category: 'FurWaz (Paul LOISIL)',
        icon: 'https://furwaz.com/logo.png',
        links: [
            { icon: 'i-lucide-panels-top-left', label: 'Website', url: 'https://furwaz.com' },
            { icon: 'i-lucide-github', label: 'GitHub', url: 'https://github.com/FurWaz' },
            { icon: 'i-lucide-twitter', label: 'Twitter', url: 'https://twitter.com/FurWaz' },
            { icon: 'i-lucide-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/paul-loisil/' },
            { icon: 'i-lucide-youtube', label: 'YouTube', url: 'https://www.youtube.com/@FurWaz' },
            { icon: 'i-lucide-music-2', label: 'TikTok', url: 'https://www.tiktok.com/@furwaz_' },
            { icon: 'i-lucide-instagram', label: 'Instagram', url: 'https://www.instagram.com/furwaz_' },
        ],
    },
    {
        category: 'TNY Robotics (TNY-360)',
        icon: 'https://tny-robotics.com/icon-border.png',
        links: [
            { icon: 'i-lucide-panels-top-left', label: 'Website', url: 'https://tny-robotics.com' },
            { icon: 'i-lucide-github', label: 'GitHub', url: 'https://github.com/TNY-Robotics' },
        ],
    }
];
</script>

<style></style>