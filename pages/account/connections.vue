<template>
    <div class="justify-start items-center">
        <div class="show-down flex flex-col items-center space-y-4">
            <UInput class="show-down" v-model="search" :placeholder="t('account.connections.search')" />
        </div>
        <div class="flex flex-wrap h-fit w-full overflow-auto px-2">
            <ConnectionCard v-for="(connection, index) in connections" :key="connection.id" :connection="connection"
                class="show-up my-4 mx-auto" :style="`animation-delay: ${index}00ms`"/>

            <div v-if="connections === undefined" class="flex flex-col w-full py-8 space-y-4">
                <p class="text-center"> {{ t('account.connections.loading') }}  </p>
                <FwSpinner class="w-8 h-8 m-auto" />
            </div>
            <div v-if="connections === null" class="text-center">
                <p class="text-center"> {{ t('account.connections.error') }}  </p>
            </div>
            <div v-if="connections && connections.length <= 0" class="text-center">
                <p class="text-center"> {{ t('account.connections.nothing') }}  </p>
            </div>
        </div>
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

type Connection = { id: number; appId: number; };
const connections = ref<Connection[]|undefined|null>(undefined);

setTimeout(() => {
    connections.value = [
        {
            id: 1,
            appId: 1
        },
        {
            id: 2,
            appId: 2
        },
    ];
}, 500);

const search = ref<string>('');
</script>
