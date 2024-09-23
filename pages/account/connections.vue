<template>
    <div>
        Connexions
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.connections.title')}`,
    description: `${t('account.connections.description')}`,
    ogTitle: `FurWaz - ${t('account.connections.title')}`,
    ogDescription: `${t('account.connections.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('account.connections.title'));

definePageMeta({
    middleware: 'auth'
});
</script>
