<template>
    <div>
        <p> {{ $t('account.settings.noSettings') }} </p>
    </div>
</template>

<script lang="ts" setup>
import auth from '~/middleware/auth';

const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.settings.title')}`,
    description: `${t('account.settings.description')}`,
    ogTitle: `FurWaz - ${t('account.settings.title')}`,
    ogDescription: `${t('account.settings.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('account.settings.title'));

definePageMeta({
    middleware: auth
});
</script>
