<template>
    <div>
        Applications
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.applications.title')}`,
    description: `${t('account.applications.description')}`,
    ogTitle: `FurWaz - ${t('account.applications.title')}`,
    ogDescription: `${t('account.applications.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('account.applications.title'));

definePageMeta({
    middleware: 'auth'
});
</script>
