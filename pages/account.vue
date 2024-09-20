<template>
    <div class="flex flex-col grow">
        
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.title')}`,
    description: `${t('account.description')}`,
    ogTitle: `FurWaz - ${t('account.title')}`,
    ogDescription: `${t('account.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});

definePageMeta({
    middleware: 'auth'
});
</script>