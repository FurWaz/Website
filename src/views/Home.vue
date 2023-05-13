<template>
    <div class="flex flex-col grow min-h-full w-full">
        <div class="flex flex-col justify-center items-center h-[90%] my-20">
            <icon-card class="h-40 w-40" />
            <h1
                class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                FurWaz
            </h1>
        </div>
        <div class="flex h-fit w-full mt-20">
            <div class="flex flex-col h-fit w-full grow">
                <div class="flex flex-col w-full h-[48em] pt-[13.25em] px-[10%] items-end space-y-4">
                    <div class="flex space-x-4">
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-4"
                            style="animation-delay: 400ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-3"
                            style="animation-delay: 300ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-2"
                            style="animation-delay: 200ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-1"
                            style="animation-delay: 100ms;"
                        />
                    </div>
                    <div
                        class="show-left flex flex-col items-center w-full h-fit p-4 space-y-8"
                        style="animation-delay: 400ms;"
                    >
                        <title-text>
                            {{ lang.MyApps() }}
                        </title-text>
                        <base-text class="text-right">
                            {{ lang.MyAppsDesc() }}
                        </base-text>

                        <div class="flex justify-evenly w-[50%]">
                            <!-- Fullbowody -->
                            <svg-text class="w-12 rotate-[-10deg]">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                />
                            </svg-text>
                            <!-- Converter -->
                            <svg-text class="w-12 rotate-[20deg]">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                />
                            </svg-text>
                            <!-- Vybeen -->
                            <svg-text class="w-12 rotate-[10deg]">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                />
                            </svg-text>
                        </div>

                        <button-block
                            class="ml-auto"
                            href="/apps"
                        >
                            {{ lang.MyAppsBtn() }}
                        </button-block>
                    </div>
                </div>
                <div class="flex flex-col w-full h-[48em] pt-[13.25em] px-[10%] items-end space-y-4">
                    <div class="flex space-x-4">
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-4"
                            style="animation-delay: 400ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-3"
                            style="animation-delay: 300ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-2"
                            style="animation-delay: 200ms;"
                        />
                        <span
                            class="show-left flex grow-0 h-2 w-10 bg-prim-1"
                            style="animation-delay: 100ms;"
                        />
                    </div>
                    <div
                        class="show-left flex flex-col items-center w-full h-fit p-4 space-y-8"
                        style="animation-delay: 400ms;"
                    >
                        <title-text>
                            {{ lang.MyAbout() }}
                        </title-text>
                        <base-text class="text-right">
                            {{ lang.MyAboutDesc() }}
                        </base-text>

                        <button-block
                            class="ml-auto"
                            href="/about"
                        >
                            {{ lang.MyAboutBtn() }}
                        </button-block>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-fit items-end space-y-4">
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-1 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-2 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-3 shadow-md" />
                <span class="show-up w-2 h-[3em] bg-prim-4 shadow-md" />
            </div>
            <div class="flex flex-col h-fit w-full pt-[24em] grow">
                <div class="flex flex-col w-full h-[48em] pt-[13.25em] px-[10%] items-start space-y-4">
                    <div class="flex space-x-4">
                        <span
                            class="show-right flex grow-0 h-2 w-10 bg-prim-1"
                            style="animation-delay: 100ms;"
                        />
                        <span
                            class="show-right flex grow-0 h-2 w-10 bg-prim-2"
                            style="animation-delay: 200ms;"
                        />
                        <span
                            class="show-right flex grow-0 h-2 w-10 bg-prim-3"
                            style="animation-delay: 300ms;"
                        />
                        <span
                            class="show-right flex grow-0 h-2 w-10 bg-prim-4"
                            style="animation-delay: 400ms;"
                        />
                    </div>
                    <div
                        class="show-right flex flex-col items-center w-full h-fit p-4 space-y-8"
                        style="animation-delay: 400ms;"
                    >
                        <title-text>
                            {{ lang.MyProjects() }}
                        </title-text>
                        <base-text class="text-left">
                            {{ lang.MyProjectsDesc() }}
                        </base-text>

                        <div class="flex justify-evenly w-[50%]">
                            <!-- Robot -->
                            <svg-text class="w-12 rotate-[-10deg]">
                                <rect width="18" height="10" x="3" y="11" rx="2"></rect>
                                <circle cx="12" cy="5" r="2"></circle>
                                <path d="M12 7v4"></path>
                                <line x1="8" x2="8" y1="16" y2="16"></line>
                                <line x1="16" x2="16" y1="16" y2="16"></line>
                            </svg-text>
                            <!-- Car share -->
                            <svg-text
                                class="w-12 rotate-[20deg]"
                                viewBox="0 0 58 21"
                            >
                                <circle cx="10.48" cy="17.33" r="4.36" />
                                <path d="M167.7,156.83a4.36,4.36,0,1,0,4.36,4.36A4.36,4.36,0,0,0,167.7,156.83Z" transform="translate(-122.27 -143.86)" />
                                <path d="M177.68,155.66c1-4.33-.84-4.19-4.94-6.55-3.35-2.33-6.35-4.77-9.91-5.07-6.14-.11-14.18-.31-14.71,0-4.74,1.39-7.93,4.33-11.84,5.62-5.12,2.35-12.16-.64-12.64,6-1.9-.26-1.45,3.37-.9,4.68,1,1.29,2.81.36,4.22.56.5-7.15,11.27-7.1,11.49.21l23.74-.05c-.09-7.19,11.34-7.1,11.08.13,1.5-.25,3.35.52,4.56-.53C178.66,159.24,179.84,155.37,177.68,155.66Zm-23.2-5.44c-.32.53-12.7.66-13.41.07-.82-.39,7.66-4.58,8.33-4.63.44-.23,4.74-.34,5.09,0S155,150.21,154.48,150.22Zm15.69.07c-.63.59-11.6.46-11.89-.07-.49,0-.36-4.32,0-4.57s4.12-.22,4.5,0C163.38,145.71,170.9,149.9,170.17,150.29Z" transform="translate(-122.27 -143.86)" />
                            </svg-text>
                            <!-- Cocktail -->
                            <svg-text class="w-12 rotate-[10deg]">
                                <path d="M8 22h8"></path>
                                <path d="M12 11v11"></path>
                                <path d="m19 3-7 8-7-8Z"></path>
                            </svg-text>
                        </div>

                        <button-block
                            class="mr-auto"
                            href="/projects"
                        >
                            {{ lang.MyProjectsBtn() }}
                        </button-block>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center items-center py-12">
            <p class="show-up text-lg font-bold text-slate-600 italic">
                snuggles and wuggles
            </p>
        </div>
    </div>
</template>

<script>
import IconCard from "../components/cards/IconCard.vue";
import TitleText from '../components/text/TitleText.vue';
import BaseText from '../components/text/BaseText.vue';
import SvgText from '../components/text/SvgText.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

export default {
    name: "HomeView",
    components: {
        IconCard,
        TitleText,
        BaseText,
        SvgText,
        ButtonBlock
    },
    data() {
        return { lang: Lang.CurrentLang };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
    }
}
</script>