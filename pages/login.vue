<template>
    <div>
        <div class="flex flex-col grow justify-evenly items-center">
            <div class="show-down flex flex-col h-fit w-full">
                <FwIcon class="w-28 h-28 m-auto" />
                <div>
                    <h1 v-show="mode === 'login'" class="text-center show-up"> {{ $t('login.login') }} </h1>
                    <h1 v-show="mode !== 'login'" class="text-center show-up"> {{ $t('login.register') }} </h1>
                </div>
            </div>

            <div class="flex h-fit w-full justify-center items-center px-4 overflow-hidden">
                <div class="flex w-full h-fit items-center transition-all ease-custom duration-custom" :class="mode !== 'login'? 'translate-x-0' : '-translate-x-full'">
                    <div class="flex h-fit min-w-full justify-center items-center">
                        <UForm :schema="registerSchema" :state="registerState" class="show-up p-4 space-y-4 w-full max-w-[20em]" @submit="onRegisterSubmit">
                            <UFormGroup :label="$t('login.pseudo')" name="pseudo">
                                <UInput v-model="registerState.pseudo" autocomplete="pseudo" />
                            </UFormGroup>

                            <UFormGroup :label="$t('login.email')" name="email">
                                <UInput v-model="registerState.email" autocomplete="email" />
                            </UFormGroup>

                            <UFormGroup :label="$t('login.password')" name="password">
                                <UInput v-model="registerState.password" type="password" autocomplete="password" />
                            </UFormGroup>

                            <UFormGroup :label="$t('login.confirmPassword')" name="confirm">
                                <UInput v-model="registerState.confirm" type="password" autocomplete="password" />
                            </UFormGroup>

                            <UAlert
                                v-show="registerError" @close="registerError = null" :title="registerError ?? ''"
                                variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                            />

                            <div class="flex justify-between items-center">
                                <UButton variant="ghost" @click="$router.back()">
                                    {{ $t('verb.cancel') }}
                                </UButton>

                                <UButton :loading="registerButtonLoading" type="submit" icon="i-heroicons-chevron-right" trailing>
                                    {{ $t('verb.continue') }}
                                </UButton>
                            </div>
                        </UForm>
                    </div>
                    <div class="flex h-fit min-w-full justify-center items-center">
                        <UForm :schema="loginSchema" :state="loginState" class="show-up p-4 space-y-4 w-full max-w-[20em]" @submit="onLoginSubmit">
                            <UFormGroup :label="$t('login.email')" name="email">
                                <UInput v-model="loginState.email" autocomplete="email" />
                            </UFormGroup>

                            <UFormGroup :label="$t('login.password')" name="password">
                                <UInput v-model="loginState.password" type="password" autocomplete="password" />
                            </UFormGroup>
                            <UButton variant="link" :padded="false" color="gray">
                                {{ $t('login.forgotPassword') }}
                            </UButton>

                            <UAlert
                                v-show="loginError" @close="loginError = null" :title="loginError ?? ''"
                                variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                            />

                            <div class="flex justify-between items-center">
                                <UButton variant="ghost" @click="$router.back()">
                                    {{ $t('verb.cancel') }}
                                </UButton>

                                <UButton :loading="loginButtonLoading" type="submit" icon="i-heroicons-chevron-right" trailing>
                                    {{ $t('verb.continue') }}
                                </UButton>
                            </div>
                        </UForm>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex h-fit w-full items-center py-4">
            <UButton v-show="mode === 'login'" @click="mode = 'register'"
                variant="link" color="gray" icon="i-heroicons-chevron-left" leading class="show-left mr-auto">
                {{ $t('login.register') }}
            </UButton>
            <UButton v-show="mode !== 'login'" @click="mode = 'login'"
                variant="link" color="gray" icon="i-heroicons-chevron-right" trailing class="show-right ml-auto">
                {{ $t('login.login') }}
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const header = useHeader();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
import { object, string, ref as yupref, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

useSeoMeta({
    title: `FurWaz - ${t('login.title')}`,
    description: `${t('login.description')}`,
    ogTitle: `FurWaz - ${t('login.title')}`,
    ogDescription: `${t('login.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});

const mode = ref<'login' | 'register'>(router.currentRoute.value.query.mode as 'login' | 'register' ?? 'login');
header.setTitle(t('login.' + mode.value));
watch(() => router.currentRoute.value, () => {
    mode.value = router.currentRoute.value.query.mode as 'login' | 'register' ?? 'login';
});
watch(mode, () => {
    header.setTitle(t('login.' + mode.value));
});

const loginState = reactive({
    email: undefined,
    password: undefined
});
const registerState = reactive({
    pseudo: undefined,
    email: undefined,
    password: undefined,
    confirm: undefined
});

const loginSchema = object({
    email: string() .required(t('login.message.specifyEmail')),
    password: string() .required(t('login.message.specifyPassword'))
});

const registerSchema = object({
    pseudo: string()
        .required(t('login.message.specifyPseudo')),
    email: string()
        .email(t('login.message.invalidEmail'))
        .required(t('login.message.specifyEmail')),
    password: string()
        .min(8, t('login.message.passwordMinLength'))
        .required(t('login.message.specifyPassword')),
    confirm: string()
        .oneOf([yupref('password')], t('login.message.passwordMismatch'))
        .required(t('login.message.specifyConfirm'))
});

type LoginSchema = InferType<typeof loginSchema>;
type RegisterSchema = InferType<typeof registerSchema>;

const loginButtonLoading = ref(false);
const loginError = ref<string | null>(null);
async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
    loginButtonLoading.value = true;

    const res = await API.Request(ROUTES.AUTH.LOGIN(event.data.email, event.data.password));
    if (res.error) {
        console.error('Error logging in:', res.message);
        loginError.value = res.message;
        setTimeout(() => { loginError.value = null; }, 4000);
    } else {
        const user = await User.FromTokens(res.data);
        user.save();
        redirect('/');
    }
    loginButtonLoading.value = false;
}

const registerButtonLoading = ref(false);
const registerError = ref<string | null>(null);
async function onRegisterSubmit(event: FormSubmitEvent<RegisterSchema>) {
    registerButtonLoading.value = true;

    const res = await API.Request(ROUTES.USERS.CREATE(event.data.pseudo, event.data.email, event.data.password));
    if (res.error) {
        console.error('Error registering in:', res.message);
        registerError.value = res.message;
        setTimeout(() => { registerError.value = null; }, 4000);
    } else {
        const user = await User.FromTokens(res.data);
        user.save();
        redirect('/');
    }
    registerButtonLoading.value = false;
}
</script>