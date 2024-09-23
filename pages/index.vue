<template>
    <div>
        <div class="show-down flex flex-col h-fit w-full">
            <FwIcon class="w-28 h-28 m-auto" />
            <h1 class="text-center show-down"> FurWaz </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('home.title')}`,
    description: `${t('home.description')}`,
    ogTitle: `FurWaz - ${t('home.title')}`,
    ogDescription: `${t('home.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle('FurWaz');
</script>