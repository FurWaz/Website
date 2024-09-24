<template>
    <div class="z-50 sticky top-0 left-0 w-full h-fit p-2">
        <div class="flex flex-col bg-slate-50 dark:bg-slate-700 rounded-md shadow-md border border-slate-200 dark:border-slate-600 p-2">
            <div class="hidden md:flex justify-between items-center space-x-16">
                <NuxtLink class="flex justify-start items-center w-fit space-x-2" to="/">
                    <FwIcon class="h-8 w-8" />
                    <p class="text-md font-semibold"> FurWaz </p>
                </NuxtLink>
                <div class="flex w-full space-x-8 justify-start items-center overflow-auto">
                    <UButton icon="i-heroicons-home" :to="localePath('/')" variant="outline">
                        {{ $t('home.name') }}
                    </UButton>
                    <UButton icon="i-heroicons-wrench-screwdriver" :to="localePath('/projects')" variant="outline">
                        {{ $t('projects.name') }}
                    </UButton>
                    <UButton icon="i-heroicons-information-circle" :to="localePath('/about')" variant="outline">
                        {{ $t('about.name') }}
                    </UButton>
                </div>
                <div class="flex justify-end items-center space-x-4">
                    <ThemeSwitcher class="hidden lg:flex min-w-fit"/>
                    <LangSwitcher class="hidden lg:flex min-w-fit"/>
                    <div v-show="User.Current" class="flex justify-center items-center w-fit h-fit space-x-4">
                        <UButton :to="localePath('/account')" icon="i-heroicons-user">
                            {{ $t('account.name') }}
                        </UButton>
                    </div>
                    <div v-show="!User.Current" class="flex justify-center items-center w-fit h-fit space-x-4">
                        <UButton :to="localePath('/login')" variant="solid">
                            {{ $t('login.login') }}
                        </UButton>
                    </div>
                </div>
            </div>
            <div class="flex md:hidden justify-between items-center">
                <NuxtLink v-if="$route.fullPath === '/'" class="flex justify-start items-center w-12" :to="localePath('/')">
                    <FwIcon class="h-8 w-8" />
                </NuxtLink>
                <div v-else class="flex justify-start items-center w-12">
                    <UButton icon="i-heroicons-arrow-left" variant="ghost" color="white" @click="$router.back()"/>
                </div>
                <div>
                    <p v-show="title" class="show-up text-md font-semibold"> {{ title ?? '' }} </p>
                </div>
                <div class="flex justify-end items-center w-12">
                    <button class="flex w-fit h-fit" @click="toggleMobileHeader">
                        <UIcon name="i-heroicons-bars-3" class="h-8 w-8" />
                    </button>
                </div>
            </div>
            <div ref="mobileHeader" class="flex w-full h-fit overflow-hidden transition-all ease-custom duration-custom" style="max-height: 0px;">
                <div class="flex flex-col h-fit p-1 w-full">
                    <div class="flex flex-col w-fit h-fit py-2 justify-center items-center space-y-4 mx-auto">
                        <UButton class="w-full justify-between" icon="i-heroicons-home" :to="localePath('/')" variant="outline">
                            {{ $t('home.name') }}
                        </UButton>
                        <UButton class="w-full justify-between" icon="i-heroicons-wrench-screwdriver" :to="localePath('/projects')" variant="outline">
                            {{ $t('projects.name') }}
                        </UButton>
                        <UButton class="w-full justify-between" icon="i-heroicons-information-circle" :to="localePath('/about')" variant="outline">
                            {{ $t('about.name') }}
                        </UButton>
                    </div>
                    <div class="flex py-2.5">
                        <span class="flex w-full h-0.5 bg-slate-200 dark:bg-slate-600 rounded-full" />
                    </div>
                    <div class="flex flex-col w-full h-fit space-y-2.5">
                        <div class="flex justify-between items-center w-full h-fit">
                            <ThemeSwitcher />
                            <LangSwitcher />
                        </div>
                        <div v-show="User.Current" class="flex justify-between items-center w-full h-fit">
                            <UButton @click="() => { User.Forget() }" variant="ghost">
                                {{ $t('verb.logout') }}
                            </UButton>
                            <UButton :to="localePath('/account')" icon="i-heroicons-user">
                                {{ $t('account.name') }}
                            </UButton>
                        </div>
                        <div v-show="!User.Current" class="flex justify-between items-center w-full h-fit">
                            <UButton :to="localePath('/login?mode=register')" variant="ghost">
                                {{ $t('login.register') }}
                            </UButton>
                            <UButton :to="localePath('/login')" variant="ghost">
                                {{ $t('login.login') }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
const router = useRouter();
const header = useHeader();

const mobileHeader = ref<HTMLElement | null>(null);
function toggleMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    if (mobileHeader.value.style.maxHeight === '0px') {
        openMobileHeader();
    } else {
        closeMobileHeader();
    }
}
function openMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    const child = mobileHeader.value.firstElementChild;
    if (!child) return;

    const childHeight = child.getBoundingClientRect().height;
    mobileHeader.value.style.maxHeight = `${childHeight}px`;
}
function closeMobileHeader() {
    if (!mobileHeader || !mobileHeader.value) return;

    mobileHeader.value.style.maxHeight = '0px';
}

const title = ref<string | null>('FurWaz');
header.on('title', (newTitle: string) => {
    title.value = null;
    setTimeout(() => { title.value = newTitle; }, 10);
});

watchEffect(() => {
    if (!window) return;

    if (window.innerWidth >= 768) {
        closeMobileHeader();
    }
});

watch(() => router.currentRoute.value, () => {
    closeMobileHeader();
});
</script>
