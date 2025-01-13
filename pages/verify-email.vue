<template>
    <div>
        <div class="flex flex-col grow justify-evenly items-center">
            <div class="show-down flex flex-col h-fit w-full">
                <FwIcon class="w-28 h-28 m-auto" />
                <h1 class="text-center show-up"> {{ $t('login.verify.title') }} </h1>
            </div>

            <div class="flex h-fit w-full justify-center items-center px-4 overflow-hidden">
                <div class="flex h-fit min-w-full justify-center items-center">
                    <div class="show-up p-4 space-y-4 w-full max-w-[20em]">
                        <UAlert v-show="tokenError" @close="tokenError = null" :title="tokenError ?? ''" variant="subtle"
                            color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }" />

                        <UAlert v-show="tokenSuccess" @close="tokenSuccess = null" :title="tokenSuccess ?? ''"
                            variant="subtle" color="green" class="show-down" icon="i-heroicons-information-circle"
                            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'green', variant: 'ghost', padded: false }" />

                        <div class="flex justify-between items-center">
                            <UButton variant="ghost" @click="$router.back()">
                                {{ $t('verb.cancel') }}
                            </UButton>

                            <UButton :disabled="tokenError !== null" type="submit"
                                icon="i-heroicons-chevron-right" trailing to="/">
                                {{ $t('verb.continue') }}
                            </UButton>
                        </div>
                    </div>
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

useSeoMeta({
    title: `FurWaz - ${t('login.verify.title')}`,
    description: `${t('login.verify.description')}`,
    ogTitle: `FurWaz - ${t('login.verify.title')}`,
    ogDescription: `${t('login.verify.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});

header.setTitle(t('login.verify.title'));

const tokenError = ref<string | null>(null);
const tokenSuccess = ref<string | null>(null);

onMounted(async () => {
    const token = route.query.token as string;
    if (!token) {
        tokenError.value = t('login.verify.invalidToken');
    }

    // Verify token
    const res = await API.Request(ROUTES.VERIFY.EMAIL(token));
    if (res.error) {
        tokenError.value = res.message;
    } else {
        tokenSuccess.value = res.message;
    }
});

</script>