<template>
    <div class="flex flex-col">
        <div class="show-down flex flex-col items-center space-y-4">
            <UInput class="show-down" v-model="search" :placeholder="t('account.applications.search')" />
        </div>
        <div class="flex flex-wrap h-fit w-full overflow-auto px-2">
            <ApplicationCard v-for="(application, index) in applications" :key="application.id" :application="application"
                class="show-up my-4 mx-auto" :style="`animation-delay: ${index}00ms`"/>

            <div v-if="applications === undefined" class="flex flex-col w-full py-8 space-y-4">
                <p class="text-center"> {{ t('account.applications.loading') }}  </p>
                <FwSpinner class="w-8 h-8 m-auto" />
            </div>
            <div v-if="applications === null" class="text-center">
                <p class="text-center"> {{ t('account.applications.error') }}  </p>
            </div>
            <div v-if="applications && applications.length <= 0" class="text-center">
                <p class="text-center"> {{ t('account.applications.nothing') }}  </p>
            </div>
        </div>
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

type Application = { id: number; name: string; description: string; icon: string; };
const applications = ref<Application[]|undefined|null>(undefined);

setTimeout(() => {
    applications.value = [
        {
            id: 1,
            name: 'Pypoll',
            description: 'Pypoll is a social media platform for pets.',
            icon: '/icon.png'
        },
        {
            id: 2,
            name: 'VyBeen',
            description: 'VyBeen is a social media platform for pets.',
            icon: '/icon.png'
        },
    ];
}, 500);

const search = ref<string>('');
</script>
