<template>
    <div class="space-y-32 pb-32">
        <div class="show-down flex flex-col h-fit w-full">
            <FwIcon class="w-28 h-28 m-auto" />
            <h1 class="text-3xl text-center show-down"> FurWaz </h1>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-8"> {{ $t('about.whoAmI.title') }} </h2>
            <div class="flex flex-col md:flex-row w-full h-fit justify-evenly items-center pb-8 md:space-x-4">
                <div class="flex md:hidden pb-8">
                    <div class="flex flex-col w-fit space-y-4 overflow-hidden pt-16">
                        <div
                            class="relative border-2 border-slate-300 dark:border-slate-600 rounded-lg w-fit h-48 p-4">
                            <div class="w-48" />
                            <img src="~/assets/img/moi.png" alt="Moi" class="absolute w-48 bottom-0 drop-shadow-2xl">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-fit space-y-8">
                    <h3 class="text-2xl font-semibold"> Paul LOISIL </h3>
                    <div class="flex flex-col space-y-4 md:max-w-[40vw]">
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description') }} </p>
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description2') }} </p>
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description3') }} </p>
                    </div>
                    <UButton to="/about" variant="solid" class="w-fit" size="xl" icon="i-heroicons-chevron-right" trailing>
                        {{ $t('about.whoAmI.action') }}
                    </UButton>
                </div>
                <div class="hidden md:flex pb-8">
                    <div class="flex flex-col min-w-fit w-fit space-y-4 overflow-hidden pt-24">
                        <div
                            class="relative border-2 border-slate-300 dark:border-slate-600 rounded-lg w-fit h-64 p-4">
                            <div class="w-64" />
                            <img src="~/assets/img/moi.png" alt="Moi" class="absolute w-64 bottom-0 drop-shadow-2xl">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-4 md:p-8">{{ $t('home.myProjects.title') }}</h2>
            <div class="flex flex-col md:flex-row w-full h-fit pb-16">
                <div class="flex grow min-w-0 h-fit justify-center items-center">
                    <TNYCard class="scale-100 transition-all duration-custom ease-custom" />
                </div>
            </div>
            <div class="flex w-full justify-center">
                <UButton to="/projects?type=project" variant="link" size="xl" color="primary">
                    {{ $t('home.myProjects.action') }}
                </UButton>
            </div>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-4 md:p-8">{{ $t('home.myApps.title') }}</h2>
            <div class="flex flex-col md:flex-row w-full h-fit">
                <div class="flex grow-0 w-full md:w-fit justify-between items-center p-2 pb-4 md:p-4">
                    <UButton icon="i-heroicons-chevron-left" variant="subtle" size="xl" color="neutral"
                        @click="scroll(appsContainer, -1)" />
                    <UButton icon="i-heroicons-chevron-right" variant="subtle" size="xl" color="neutral"
                        @click="scroll(appsContainer, +1)" class="flex md:hidden" />
                </div>
                <div class="flex grow min-w-0 h-fit justify-center items-center">
                    <div ref="appsContainer"
                        class="flex grow w-full h-fit justify-center items-center overflow-hidden pb-16">
                        <div class="flex min-w-0 max-w-full h-fit">
                            <div class="flex justify-center items-center min-w-full">
                                <FullBowodyCard class="scale-100 transition-all duration-custom ease-custom" />
                            </div>
                            <div class="flex justify-center items-center min-w-full">
                                <PypollCard class="scale-75 opacity-50 transition-all duration-custom ease-custom" />
                            </div>
                            <div class="flex justify-center items-center min-w-full">
                                <VybeenCard class="scale-75 opacity-50 transition-all duration-custom ease-custom" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden md:flex grow-0 w-fit justify-center items-center px-4">
                    <UButton icon="i-heroicons-chevron-right" variant="subtle" size="xl" color="neutral"
                        @click="scroll(appsContainer, +1)" />
                </div>
            </div>
            <div class="flex w-full justify-center">
                <UButton to="/projects?type=application" variant="link" size="xl" color="primary">
                    {{ $t('home.myApps.action') }}
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const header = useHeader();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('home.title')}`,
    description: `${t('home.description')}`,
    ogTitle: `FurWaz - ${t('home.title')}`,
    ogDescription: `${t('home.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle('FurWaz');

const appsContainer = ref<HTMLElement | null>(null);
function scroll(container: HTMLElement | null, direction: number) {
    if (!container) return;

    const child = container.firstElementChild as HTMLElement;
    if (!child) return;

    const childWidth = child.getBoundingClientRect().width;
    const currentScroll = container.scrollLeft;
    const currentTargetIndex = Math.round(currentScroll / childWidth);
    const nextTargetIndex = currentTargetIndex + direction;

    const nextTargetDiv = child.children[nextTargetIndex] as HTMLElement;
    if (!nextTargetDiv) return;

    for (let i = 0; i < child.children.length; i++) {
        const div = child.children[i] as HTMLElement;
        if (div !== nextTargetDiv) {
            div.firstElementChild?.classList.remove('scale-100');
            div.firstElementChild?.classList.add('scale-75', 'opacity-50');
        } else {
            div.firstElementChild?.classList.remove('scale-75', 'opacity-50');
            div.firstElementChild?.classList.add('scale-100');
        }
    }

    container.scrollTo({
        left: childWidth * nextTargetIndex,
        behavior: 'smooth'
    });
}

onMounted(() => {
    scroll(appsContainer.value, 0);
});
</script>
