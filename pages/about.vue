<template>
    <div>
        
    </div>
</template>

<script setup lang="ts">
const header = useHeader();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('about.title')}`,
    description: `${t('about.description')}`,
    ogTitle: `FurWaz - ${t('about.title')}`,
    ogDescription: `${t('about.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('about.name'));
</script>