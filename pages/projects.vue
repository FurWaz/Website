<template>
    <div>
        
    </div>
</template>

<script setup lang="ts">
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
</script>