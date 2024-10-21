<template>
    <div class="flex flex-col space-y-16">
        <div class="show-right w-full h-fit">
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
                    <h3 class="text-primary text-3xl font-semibold"> Paul LOISIL </h3>
                    <div class="flex flex-col space-y-4 md:max-w-[40vw]">
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description') }} </p>
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description2') }} </p>
                        <p class="text-base md:text-lg"> {{ $t('about.whoAmI.description3') }} </p>
                    </div>
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
        <div class="show-left w-full h-fit">
            <h2 class="text-2xl text-center p-8"> {{ $t('about.whatIDo.title') }} </h2>
            <div class="flex flex-wrap w-full h-fit justify-evenly items-center pb-8">
                <div class="card p-4 w-full md:w-min m-2 md:m-4 space-y-4">
                    <div class="flex flex-col w-fit space-y-4">
                        <div class="flex justify-start items-center space-x-4">
                            <UIcon name="i-heroicons-code-bracket" class="w-10 h-10" />
                            <h3 class="text-xl font-semibold md:whitespace-nowrap"> {{ $t('about.whatIDo.web.title') }} </h3>
                        </div>
                        <p class="text-base"> {{ $t('about.whatIDo.web.description') }} </p>
                    </div>
                    <UButton to="/projects?type=website" icon="i-heroicons-chevron-right" trailing>
                        {{ $t('about.whatIDo.web.action') }}
                    </UButton>
                </div>
                <div class="card p-4 w-full md:w-min m-2 md:m-4 space-y-4">
                    <div class="flex flex-col w-fit space-y-4">
                        <div class="flex justify-start items-center space-x-4">
                            <UIcon name="i-heroicons-puzzle-piece" class="w-10 h-10" />
                            <h3 class="text-xl font-semibold md:whitespace-nowrap"> {{ $t('about.whatIDo.game.title') }} </h3>
                        </div>
                        <p class="text-base"> {{ $t('about.whatIDo.game.description') }} </p>
                    </div>
                    <UButton to="/projects?type=game" icon="i-heroicons-chevron-right" trailing>
                        {{ $t('about.whatIDo.game.action') }}
                    </UButton>
                </div>
                <div class="card p-4 w-full md:w-min m-2 md:m-4 space-y-4">
                    <div class="flex flex-col w-fit space-y-4">
                        <div class="flex justify-start items-center space-x-4">
                            <UIcon name="i-heroicons-device-phone-mobile" class="w-10 h-10" />
                            <h3 class="text-xl font-semibold md:whitespace-nowrap"> {{ $t('about.whatIDo.app.title') }} </h3>
                        </div>
                        <p class="text-base"> {{ $t('about.whatIDo.app.description') }} </p>
                    </div>
                    <UButton to="/projects?type=application" icon="i-heroicons-chevron-right" trailing>
                        {{ $t('about.whatIDo.app.action') }}
                    </UButton>
                </div>
                <div class="card p-4 w-full md:w-min m-2 md:m-4 space-y-4">
                    <div class="flex flex-col w-fit space-y-4">
                        <div class="flex justify-start items-center space-x-4">
                            <UIcon name="i-heroicons-bolt" class="w-10 h-10" />
                            <h3 class="text-xl font-semibold md:whitespace-nowrap"> {{ $t('about.whatIDo.robot.title') }} </h3>
                        </div>
                        <p class="text-base"> {{ $t('about.whatIDo.robot.description') }} </p>
                    </div>
                    <UButton to="/projects?type=project" icon="i-heroicons-chevron-right" trailing>
                        {{ $t('about.whatIDo.robot.action') }}
                    </UButton>
                </div>
            </div>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-8"> {{ $t('about.myCareer.title') }} </h2>
            <div class="flex flex-col justify-center items-center">
                <div v-for="i in [1, 2, 3, 4, 5]" :key="i" class="w-fit">
                    <div class="flex justify-center items-center space-x-4">
                        <div class="flex justify-center items-center rounded-full border-2 border-primary h-16 min-w-16 w-16">
                            {{ $t(`about.myCareer.step${i}.year`) }}
                        </div>
                        <span class="w-8 border-b-2 border-primary border-dashed" />
                        <h3 class="flex grow"> {{ $t(`about.myCareer.step${i}.title`) }} </h3>
                    </div>
                    <div class="flex justify-center items-start{{ $t(`about.myCareer.step${i}.title`) }} space-x-4 py-4">
                        <div class="flex justify-center items-center h-full min-w-16 w-16">
                            <span class="flex min-h-[8em] md:min-h-[6em] h-full border-r-2 border-primary border-dashed" />
                        </div>
                        <div class="flex flex-col grow max-w-[25em]">
                            <p class="text-slate-600 dark:text-slate-300 text-base italic">
                                {{ $t(`about.myCareer.step${i}.description`) }}
                                <span v-if="i === 5">
                                    <br>
                                    {{ $t('about.myCareer.yearInProgress') }} ...
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-8"> {{ $t('about.mySocials.title') }} </h2>
            <div class="flex flex-wrap justify-evenly items-center">
                <UButton to="https://www.youtube.com/channel/UCYw9qRksXslrsgMELYPCWNw" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> YouTube </p>
                    </div>
                </UButton>
                <UButton to="https://github.com/FurWaz" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> Github </p>
                    </div>
                </UButton>
                <UButton to="https://www.linkedin.com/in/loisil-paul" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> LinkedIn </p>
                    </div>
                </UButton>
                <UButton to="https://x.com/FurWaz" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> X / Twitter </p>
                    </div>
                </UButton>
                <UButton to="https://www.facebook.com/furwaz" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> Facebook </p>
                    </div>
                </UButton>
                <UButton to="https://www.instagram.com/furwaz_" target="_blank" variant="outline" class="m-2">
                    <div class="flex flex-col justify-center items-center space-y-2 pt-2">
                        <div class="flex justify-center items-center h-14 w-14 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                            </svg>
                        </div>
                        <p class="text-lg font-medium"> Instagram </p>
                    </div>
                </UButton>
            </div>
        </div>
        <div class="show-up w-full h-fit">
            <h2 class="text-2xl text-center p-8"> {{ $t('about.contactMe.title') }} </h2>
            <div class="flex flex-col justify-center items-center space-y-4">
                <p class="text-lg text-center"> {{ $t('about.contactMe.description') }} </p>
                <div class="flex flex-wrap justify-center items-center space-x-4">
                    <UButton to="mailto:contact@furwaz.com" icon="i-heroicons-envelope" size="lg">
                        contact@furwaz.com
                    </UButton>
                </div>
            </div>
        </div>
        <div class="h-16">

        </div>
    </div>
</template>

<script setup lang="ts">
const header = useHeader();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('about.title')}`,
    description: `${t('about.description')}`,
    ogTitle: `FurWaz - ${t('about.title')}`,
    ogDescription: `${t('about.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('about.name'));
</script>