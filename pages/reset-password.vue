<template>
    <div>
        <div class="flex flex-col grow justify-evenly items-center">
            <div class="show-down flex flex-col h-fit w-full">
                <FwIcon class="w-28 h-28 m-auto" />
                <h1 class="text-center show-up"> {{ $t('login.forgotPassword.title') }} </h1>
            </div>

            <div class="flex h-fit w-full justify-center items-center px-4 overflow-hidden">
                <div class="flex h-fit min-w-full justify-center items-center">
                    <UForm :schema="formSchema" :state="formState" class="show-up p-4 space-y-4 w-full max-w-[20em]"
                        @submit="onformSubmit">
                        <UFormField :label="$t('login.forgotPassword.newPassword')" name="password">
                            <UInput v-model="formState.password" type="password" autocomplete="new-password" />
                        </UFormField>
                        <UFormField :label="$t('login.forgotPassword.confirmNewPassword')" name="confirm">
                            <UInput v-model="formState.confirm" type="password" autocomplete="new-password" />
                        </UFormField>


                        <UAlert v-show="formError" @close="formError = null" :title="formError ?? ''" variant="subtle"
                            color="error" class="show-down" icon="i-heroicons-exclamation-triangle"
                            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }" />

                        <UAlert v-show="formSuccess" @close="formSuccess = null" :title="formSuccess ?? ''"
                            variant="subtle" color="success" class="show-down" icon="i-heroicons-information-circle"
                            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'green', variant: 'ghost', padded: false }" />

                        <div class="flex justify-between items-center">
                            <UButton variant="ghost" @click="$router.back()">
                                {{ $t('verb.cancel') }}
                            </UButton>

                            <UButton :loading="formButtonLoading" :disabled="formButtonDisabled || (formError !== undefined)" type="submit"
                                icon="i-heroicons-chevron-right" trailing>
                                {{ $t('verb.continue') }}
                            </UButton>
                        </div>
                    </UForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const header = useHeader();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
import { object, string, ref as yupref, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

useSeoMeta({
    title: `FurWaz - ${t('login.forgotPassword.title')}`,
    description: `${t('login.forgotPassword.description')}`,
    ogTitle: `FurWaz - ${t('login.forgotPassword.title')}`,
    ogDescription: `${t('login.forgotPassword.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});

header.setTitle(t('login.forgotPassword.title'));

const formState = reactive({
    password: '',
    confirm: ''
});

const formSchema = object({
    password: string().required(t('login.message.specifyPassword')),
    confirm: string().required(t('login.forgotPassword.specifyConfirmPassword')).oneOf([yupref('password')], t('login.forgotPassword.passwordsDontMatch'))
});

const resetToken = ref<string | null>(null);
onMounted(() => {
    const token = route.query.token as string;
    if (token) {
        resetToken.value = token;
    } else {
        formError.value = t('login.forgotPassword.invalidToken');
    }
});

type formSchema = InferType<typeof formSchema>;

const formButtonLoading = ref(false);
const formButtonDisabled = ref(false);
const formError = ref<string | null>(null);
const formSuccess = ref<string | null>(null);
async function onformSubmit(event: FormSubmitEvent<formSchema>) {
    formButtonLoading.value = true;
    formButtonDisabled.value = true;

    if (!resetToken.value) {
        formError.value = t('login.forgotPassword.invalidToken');
        formButtonLoading.value = false;
        formButtonDisabled.value = false;
        return;
    }

    const res = await API.Request(ROUTES.PASSWORD.RESET(resetToken.value, event.data.password));
    if (res.error) {
        console.error('Error reseting password:', res.message);
        formError.value = res.message;
        formButtonDisabled.value = false;
        setTimeout(() => { formError.value = null; }, 4000);
    } else {
        formSuccess.value = res.message;
        setTimeout(() => { formSuccess.value = null; }, 4000);
        setTimeout(() => { router.push({ name: 'login' }); }, 2000);
    }
    formButtonLoading.value = false;
}
</script>