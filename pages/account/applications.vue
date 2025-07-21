<template>
    <div class="flex flex-col">
        <div class="show-down flex flex-col items-center space-y-4">
            <h2 class="text-2xl text-center"> {{ $t('account.applications.title') }} </h2>
            <UInput class="show-down" v-model="search" :placeholder="t('account.applications.search')" />
        </div>
        <div class="flex flex-wrap justify-center h-fit w-full overflow-auto py-4 p-2">
            <ApplicationCard v-for="application in applications" :key="application.id" :application="application" class="show-up m-4" @update="onAppUpdate" @delete="onAppDelete" />

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
        <div class="flex w-full h-fit justify-center">
            <UButton icon="i-heroicons-plus" variant="solid" class="show-up m-4" @click="createPopupOpen = true">
                {{ t('verb.create') }}
            </UButton>
        </div>
        <UModal v-model="createPopupOpen">
            <UForm class="p-4" :schema="appSchema" :state="appState" @submit="createApp">
                <p class="text-center text-lg font-medium"> {{ $t('account.applications.createApp') }} </p>
                <div class="flex flex-col w-full h-fit py-8">
                    <div class="space-y-4">
                        <UFormField :label="`Nom`" name="name">
                            <UInput v-model="appState.name" />
                        </UFormField>
                        <UFormField :label="`Description`" name="description">
                            <UInput v-model="appState.description" />
                        </UFormField>
                        <!-- <UFormField :label="`Icone`" name="icon">
                            <UInput v-model="appState.icon" />
                        </UFormField> -->
                    </div>
                </div>
                <div class="py-2">
                    <UAlert v-show="logError" @close="logError = null" :title="logError ?? ''"
                        variant="subtle" color="error" class="show-down" icon="i-heroicons-exclamation-triangle"
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                />
                </div>
                <div class="flex w-full h-fit justify-between">
                    <UButton variant="ghost" @click="createPopupOpen = false">
                        {{ $t('verb.cancel') }}
                    </UButton>
                    <UButton icon="i-heroicons-plus" variant="solid" type="submit" :loading="createLoading">
                        {{ $t('verb.create') }}
                    </UButton>
                </div>
            </UForm>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import { boolean, object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

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

type Application = { id: number; name: string; description: string; icon: string; key: string; verified: boolean };
const applications = ref<Application[]|undefined|null>(undefined);
const search = ref<string>('');

function onAppUpdate(app: Application) {
    const appIndex = applications.value?.findIndex(a => a.id === app.id);
    if (appIndex !== undefined && appIndex >= 0) {
        applications.value![appIndex] = app;
    }
}
function onAppDelete(appId: number) {
    const appIndex = applications.value?.findIndex(a => a.id === appId);
    if (appIndex !== undefined && appIndex >= 0) {
        applications.value!.splice(appIndex, 1);
    }
}

const appSchema = object({
    name: string().required(),
    description: string().required()
});
type AppSchemaType = InferType<typeof appSchema>;

const appState = reactive({
    name: '',
    description: ''
});
const createPopupOpen = ref(false);
const logError = ref<string | null>(null);
const createLoading = ref(false);
async function createApp(event: FormSubmitEvent<AppSchemaType>) {
    createLoading.value = true;
    const res = await API.RequestLogged(ROUTES.APPS.CREATE(
        event.data.name,
        event.data.description
    ));
    if (res.error) {
        console.error(res.message);
        logError.value = res.message;
    } else {
        applications.value?.push(res.data);
        createPopupOpen.value = false;
        appState.name = '';
        appState.description = '';
    }
    createLoading.value = false;
}

onMounted(async () => {
    const res = await API.RequestLogged(ROUTES.APPS.ME.GET());
    if (res.error) {
        applications.value = null;
    } else {
        applications.value = res.data.apps;
    }
});

</script>
