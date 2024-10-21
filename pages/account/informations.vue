<template>
    <div class="justify-start items-center">
        <div class="flex flex-col space-y-4">
            <div class="show-down flex flex-col w-full h-fit card p-2">
                <div class="flex space-x-4 justify-center items-center p-2">
                    <div class="flex w-fit h-full justify-center items-center">
                        <UIcon name="i-heroicons-user" class="w-12 h-12" />
                    </div>
                    <div class="flex w-fit h-fit">
                        <h2> {{ User.Current?.pseudo ?? '- - - - - - -' }} </h2>
                    </div>
                </div>
                <div>
                    <UForm :schema="userInfosSchema" :model="User.Current" :state="userInfosState" class="p-4 space-y-4 w-full max-w-[20em]" @submit="onUserUpdate">
                        <UFormGroup :label="$t('login.pseudo')" name="pseudo">
                            <UInput v-model="userInfosState.pseudo" @change="checkFormValidity" />
                        </UFormGroup>
                        <UFormGroup :label="$t('login.email')" name="email">
                            <UInput v-model="userInfosState.email" @change="checkFormValidity" />
                        </UFormGroup>

                        <UAlert
                            v-show="userInfosError" @close="userInfosError = null" :title="userInfosError ?? ''"
                            variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                        />

                        <div class="flex justify-between items-center">
                            <UButton variant="ghost" @click="resetUserInfos" disabled>
                                {{ $t('verb.reset') }}
                            </UButton>

                            <UButton type="submit" icon="i-heroicons-chevron-right" trailing
                                :loading="userInfosLoading" :disabled="userInfosDisabled">
                                {{ $t('verb.update') }}
                            </UButton>
                        </div>
                    </UForm>
                </div>
            </div>
            <UButton variant="outline" color="red" icon="i-heroicons-trash" class="show-up w-fit mx-auto"
                @click="showDeletePopup">
                {{ $t('account.delete.title') }}
            </UButton>
        </div>
        <UModal v-model="deleteModalOpen">
            <div class="flex flex-col space-y-4 p-4">
                <h2> {{ $t('account.delete.title') }} </h2>
                <p> {{ $t('account.delete.description') }} </p>

                <UForm :schema="userDeleteSchema" :state="userDeleteState" class="space-y-4" @submit="onUserDelete">
                    <UFormGroup :label="$t('login.password')" name="password">
                        <UInput type="password" v-model="userDeleteState.password" autocomplete="password" />
                    </UFormGroup>
                    <UCheckbox v-model="userDeleteState.onAllApps" :label="$t('account.delete.onAllApps')" name="deleteEverywhere" />

                    <UAlert
                        v-show="userDeleteError" @close="userDeleteError = null" :title="userDeleteError ?? ''"
                        variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                    />

                    <div class="flex justify-between items-center space-y-2">
                        <UButton variant="ghost" @click="deleteModalOpen = false">
                            {{ $t('verb.cancel') }}
                        </UButton>
                        <UButton type="submit" class="hidden sm:flex" :loading="userDeleteLoading" variant="solid" color="red" icon="i-heroicons-trash">
                            {{ $t('account.delete.action') }}
                        </UButton>
                        <UButton type="submit" class="flex sm:hidden" :loading="userDeleteLoading" variant="solid" color="red" icon="i-heroicons-trash">
                            {{ $t('verb.delete') }}
                        </UButton>
                    </div>
                </UForm>
            </div>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import { object, string, boolean, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

const header = useHeader();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.informations.title')}`,
    description: `${t('account.informations.description')}`,
    ogTitle: `FurWaz - ${t('account.informations.title')}`,
    ogDescription: `${t('account.informations.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('account.informations.title'));

definePageMeta({
    middleware: 'auth'
});

const mode = ref<'login' | 'register'>(router.currentRoute.value.query.mode as 'login' | 'register' ?? 'login');
watch(() => router.currentRoute.value, () => {
    mode.value = router.currentRoute.value.query.mode as 'login' | 'register' ?? 'login';
});

const userInfosState = reactive({
    pseudo: User.Current?.pseudo ?? '',
    email: User.Current?.email ?? '',
});
const userInfosSchema = object({
    pseudo: string().required(t('login.message.specifyPseudo')),
    email: string().email().required(t('login.message.specifyEmail'))
});
type UserInfosSchema = InferType<typeof userInfosSchema>;

const userInfosDisabled = ref<boolean>(true);
async function checkFormValidity() {
    const isValid = await userInfosSchema.isValid(userInfosState);
    if (!isValid) {
        userInfosDisabled.value = true;
        return;
    }

    if (userInfosState.pseudo === User.Current?.pseudo && userInfosState.email === User.Current?.email) {
        userInfosDisabled.value = true;
        return;
    }

    userInfosDisabled.value = false;
}

function resetUserInfos() {
    // TODO
}

const userInfosLoading = ref<boolean>(false);
const userInfosError = ref<string | null>(null);
async function onUserUpdate(event: FormSubmitEvent<UserInfosSchema>) {
    console.log('onUserUpdate', event.data);
    userInfosLoading.value = true;

    setTimeout(() => {
        userInfosLoading.value = false;
        userInfosError.value = 'Not implemented yet';
        setTimeout(() => { userInfosError.value = null; }, 4000);
    }, 500);
}

const deleteModalOpen = ref<boolean>(false);
function showDeletePopup() {
    deleteModalOpen.value = true;
}

const userDeleteState = reactive({
    password: '',
    onAllApps: true
});
const userDeleteSchema = object({
    password: string().required(t('login.message.specifyPassword')),
    onAllApps: boolean().required()
});
type UserDeleteSchema = InferType<typeof userDeleteSchema>;

const userDeleteLoading = ref<boolean>(false);
const userDeleteError = ref<string | null>(null);
async function onUserDelete(event: FormSubmitEvent<UserDeleteSchema>) {
    console.log('onUserDelete', event.data);
    userDeleteLoading.value = true;

    setTimeout(() => {
        userDeleteError.value = 'Not implemented yet';
        setTimeout(() => { userDeleteError.value = null; }, 4000);
        userDeleteLoading.value = false;
        // deleteModalOpen.value = false;
    }, 500);
}

onMounted(() => {
    checkFormValidity();
});
</script>
