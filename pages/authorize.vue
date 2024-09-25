<template>
    <div>
        <div class="flex flex-col grow justify-evenly items-center">
            <div class="show-down flex flex-col h-fit w-full">
                <FwIcon class="w-28 h-28 m-auto" />
                <div>
                    <h1 class="text-center"> {{ $t('portal.name') }} </h1>
                </div>
            </div>

            <div class="show-up p-4 flex flex-col h-fit w-fit justify-center items-start space-y-4">
                <div>
                    <h2>
                        {{ $t('portal.connectTo') }}
                        <span class="text-primary"> {{ 'VyBeen' }} </span>
                        {{ $t('portal.connectWith') }}
                        <span class="text-primary"> {{ User.Current?.pseudo ?? '- - - - -' }} </span>
                        .
                    </h2>
                </div>
                <div>
                    <p>{{ $t('portal.appAccess.title') }}</p>
                    <div>
                        <ul>
                            <li>- {{ $t('portal.appAccess.pseudo') }}</li>
                            <li>- {{ $t('portal.appAccess.email') }}</li>
                        </ul>
                    </div>
                </div>
                <div class="flex w-full h-fit pt-8">
                    <UButton variant="link" color="gray" :to="`/login?redirect=${$route.fullPath}`" >
                        {{ $t('portal.connectWithOther') }}
                    </UButton>
                </div>
                <UAlert
                    v-show="logError" @close="logError = null" :title="logError ?? ''"
                    variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                />
                <div class="flex w-full h-fit justify-between items-center">
                    <UButton variant="ghost" @click="$router.back()">
                        {{ $t('verb.cancel') }}
                    </UButton>
                    <UButton icon="i-heroicons-chevron-right" trailing variant="solid" @click="authorize" :loading="continueLoading">
                        {{ $t('verb.continue') }}
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const logError = ref<string | null>(null);
const continueLoading = ref(false);
function authorize() {
    continueLoading.value = true;
    setTimeout(() => {
        continueLoading.value = false;
        logError.value = 'Not implemented yet';
        setTimeout(() => { logError.value = null; }, 4000);
    }, 500);
}
</script>
