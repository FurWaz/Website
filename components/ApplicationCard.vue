<template>
    <div class="flex flex-col card p-4 justify-center items-start space-y-8 w-80">
        <div class="flex space-x-4 justify-start items-center w-full">
            <img v-if="application.icon" :src="application.icon" class="min-w-fit w-12 h-12" />
            <div v-else class="flex justify-center items-center min-w-12 w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-md">
                <UIcon name="i-heroicons-cube" class="w-8 h-8" />
            </div>
            <h3> {{ application.name }} </h3>
            <div v-if="application.verified" class="flex h-fit w-fit justify-start text-emerald-500">
                <UIcon name="i-heroicons-check-badge" class="w-6 h-6" />
            </div>
        </div>
        <div class="flex flex-col grow space-y-2">
            <p class="flex grow text-slate-600 dark:text-slate-300"> {{ application.description }} </p>
            <UButtonGroup>
                <UInput v-model="application.key" type="password" />
                <UButton icon="i-heroicons-clipboard" @click="copyKey" variant="solid" />
            </UButtonGroup>
        </div>
        <div class="flex justify-between items-center w-full">
            <UButton icon="i-heroicons-pencil" @click="editPopupOpen = true">
                {{ $t('verb.edit') }}
            </UButton>
            <UButton icon="i-heroicons-trash" @click="removePopupOpen = true" color="error" variant="ghost">
                {{ $t('verb.delete') }}
            </UButton>
        </div>
        <UModal v-model="editPopupOpen">
            <UForm class="p-4" :schema="appSchema" :state="appState" @submit="editApp">
                <p class="text-center text-lg font-medium"> {{ $t('verb.edit') }} <span class="text-primary">{{ application.name }}</span> </p>
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
                    <UAlert v-show="editLogError" @close="editLogError = null" :title="editLogError ?? ''"
                        variant="subtle" color="error" class="show-down" icon="i-heroicons-exclamation-triangle"
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                />
                </div>
                <div class="flex w-full h-fit justify-between">
                    <UButton variant="ghost" @click="editPopupOpen = false">
                        {{ $t('verb.cancel') }}
                    </UButton>
                    <UButton icon="i-heroicons-check" variant="solid" type="submit" :loading="editLoading">
                        {{ $t('verb.save') }}
                    </UButton>
                </div>
            </UForm>
        </UModal>
        <UModal v-model="removePopupOpen">
            <div class="p-4">
                <p class="text-center text-lg font-medium"> {{ $t('verb.delete') }} <span class="text-primary">{{ application.name }}</span> </p>
                <div class="h-fit py-8">
                    <p class="text-center text-sm text-slate-600 dark:text-slate-300"> Êtes-vous sûr de vouloir supprimer cette application ? </p>
                </div>
                <div class="flex w-full h-fit justify-between">
                    <UButton variant="ghost" @click="removePopupOpen = false">
                        {{ $t('verb.cancel') }}
                    </UButton>
                    <UButton icon="i-heroicons-trash" variant="solid" @click="removeApp" :loading="editLoading">
                        {{ $t('verb.delete') }}
                    </UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import { boolean, object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

type Application = { id: number; name: string; description: string; icon: string; key: string; verified: boolean };
const props = defineProps<{
    application: Application
}>();
const emit = defineEmits<{
    update: [id: Application]
    delete: [id: number]
}>();

function copyKey() {
    navigator.clipboard.writeText(props.application.key);
}

const appSchema = object({
    name: string().required(),
    description: string().required(),
    // icon: string().url(),
});
type AppSchemaType = InferType<typeof appSchema>;

const appState = reactive({
    name: props.application.name,
    description: props.application.description,
    // icon: props.application.icon,
});

const editPopupOpen = ref<boolean>(false);
const editLoading = ref<boolean>(false);
const editLogError = ref<string | null>(null);
async function editApp(event: FormSubmitEvent<AppSchemaType>) {
    editLoading.value = true;

    const res = await API.RequestLogged(ROUTES.APPS.UPDATE(
        props.application.id,
        event.data.name,
        event.data.description
    ));
    if (res.error) {
        console.error(res.message);
        editLogError.value = res.message;
    } else {
        appState.name = res.data.name;
        appState.description = res.data.description;
        emit('update', { ...props.application, ...appState });
        editPopupOpen.value = false;
    }

    editLoading.value = false;
}

const removePopupOpen = ref<boolean>(false);
const removeLogError = ref<string | null>(null);
async function removeApp() {
    editLoading.value = true;

    const res = await API.RequestLogged(ROUTES.APPS.DELETE(
        props.application.id,
    ));
    if (res.error) {
        console.error(res.message);
        removeLogError.value = res.message;
    } else {
        emit('delete', props.application.id);
        removePopupOpen.value = false;
    }

    editLoading.value = false;
}
</script>
