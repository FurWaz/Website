<template>
    <div class="flex flex-col grow justify-start items-center">
        <div class="show-down flex space-x-4 justify-evenly items-center card p-4 w-fit h-fit">
            <div class="flex w-fit h-full justify-center items-center">
                <UIcon name="i-heroicons-user" class="w-12 h-12" />
            </div>
            <div class="flex flex-col w-fit h-full justify-center items-start">
                <h3> {{ User.Current?.pseudo ?? '- - - - - - -' }} </h3>
                <p class="text-slate-600 dark:text-slate-300"> {{ User.Current?.email ?? '- - - - - - - - - - - - - - -'
                    }} </p>
            </div>
        </div>
        <div class="flex grow justify-center items-center">
            <div class="flex flex-col space-y-8 w-fit px-4">
                <UButton class="show-up w-full justify-between space-x-2" variant="ghost"
                    style="animation-delay: 000ms;" icon="i-heroicons-chevron-right" to="/account/informations"
                    trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.informations.title') }}</p>
                        <p class="text-sm">{{ $t('account.informations.description') }}</p>
                    </div>
                </UButton>
                <UButton class="show-up w-full justify-between space-x-2" variant="ghost"
                    style="animation-delay: 100ms;" icon="i-heroicons-chevron-right" to="/account/applications"
                    trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.applications.title') }}</p>
                        <p class="text-sm">{{ $t('account.applications.description') }}</p>
                    </div>
                </UButton>
                <UButton class="show-up w-full justify-between space-x-2" variant="ghost"
                    style="animation-delay: 200ms;" icon="i-heroicons-chevron-right" to="/account/connections" trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.connections.title') }}</p>
                        <p class="text-sm">{{ $t('account.connections.description') }}</p>
                    </div>
                </UButton>
                <UButton class="show-up w-full justify-between space-x-2" variant="ghost"
                    style="animation-delay: 300ms;" icon="i-heroicons-chevron-right" to="/account/settings" trailing>
                    <div>
                        <p class="font-semibold">{{ $t('account.settings.title') }}</p>
                        <p class="text-sm">{{ $t('account.settings.description') }}</p>
                    </div>
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
import auth from '~/middleware/auth';

const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('account.title')}`,
    description: `${t('account.description')}`,
    ogTitle: `FurWaz - ${t('account.title')}`,
    ogDescription: `${t('account.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('account.name'));

definePageMeta({
    middleware: auth
});
</script>