<template>
    <div class="flex flex-col grow justify-start items-center py-4 px-2">
        <div class="show-down flex space-x-4 justify-evenly items-center card p-4 w-fit h-fit">
            <div class="flex w-fit h-full justify-center items-center">
                <UIcon name="i-heroicons-user" class="w-12 h-12" />
            </div>
            <div class="flex flex-col w-fit h-full justify-center items-start">
                <h3> {{ User.Current?.pseudo ?? '- - - - - - -' }} </h3>
                <p> {{ User.Current?.email ?? '- - - - - - - - - - - - - - -' }} </p>
            </div>
        </div>
        <div class="flex grow justify-center items-center">
            <div class="flex flex-col space-y-8 w-fit">
                <UButton class="show-up w-full" variant="outline" style="animation-delay: 000ms;"
                    icon="i-heroicons-identification" :to="localePath('/account/informations')">
                    {{ $t('account.action.informations') }}
                </UButton>
                <UButton class="show-up w-full" variant="outline" style="animation-delay: 100ms;"
                    icon="i-heroicons-squares-2x2" :to="localePath('/account/applications')">
                    {{ $t('account.action.applications') }}
                </UButton>
                <UButton class="show-up w-full" variant="outline" style="animation-delay: 200ms;"
                    icon="i-heroicons-cog-6-tooth" :to="localePath('/account/settings')">
                    {{ $t('account.action.settings') }}
                </UButton>
            </div>
        </div>
        <div class="show-up flex h-fit w-full justify-center items-center">
            <UButton variant="solid" icon="i-heroicons-arrow-left-start-on-rectangle" @click="User.Forget()">
                {{ $t('verb.logout') }}
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
    title: `FurWaz - ${t('account.title')}`,
    description: `${t('account.description')}`,
    ogTitle: `FurWaz - ${t('account.title')}`,
    ogDescription: `${t('account.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});

definePageMeta({
    middleware: 'auth'
});
</script>