<template>
    <div class="flex flex-col grow min-h-full w-full">
        <icon-header :label="Lang.CreateTranslationContext('about', 'About')" />
        <div class="flex flex-col px-4 md:px-4 lg:px-[10%]">
            <div class="show-up flex space-x-4 md:space-x-8">
                <user-circle-icon class="w-10 md:w-12 text-slate-600 dark:text-slate-300" />
                <title-text class="my-10">
                    <get-text :context="Lang.CreateTranslationContext('about', 'AboutMe')" />
                </title-text>
            </div>
            <div class="show-up flex w-full mx-auto justify-center items-center md:space-x-32">
                <div class="flex w-fit h-fit flex-col space-y-4">
                    <badge-card
                        class="show-right flex w-full bg-slate-200 dark:bg-slate-600 py-2 px-3"
                        :style="'animation-delay: ' + (isMobile? 0: 1) + '00ms'"
                    >
                        <p class="flex space-x-2 w-full text-left text-lg">
                            <span class="flex font-bold text-slate-700 dark:text-slate-50 whitespace-nowrap">
                                <get-text :context="Lang.CreateTranslationContext('about', 'Name')" /> :
                            </span>
                            <span class="font-semibold text-slate-600 dark:text-slate-200 whitespace-nowrap">
                                Paul LOISIL
                            </span>
                        </p>
                    </badge-card>
                    <badge-card
                        class="show-right flex w-full bg-slate-200 dark:bg-slate-600 py-2 px-3"
                        :style="'animation-delay: ' + (isMobile? 0: 2) + '00ms'"
                    >
                        <p class="flex space-x-2 w-full text-left text-lg">
                            <span class="flex font-bold text-slate-700 dark:text-slate-50 whitespace-nowrap">
                                <get-text :context="Lang.CreateTranslationContext('about', 'Grade')" /> :
                            </span>
                            <span class="font-semibold text-slate-600 dark:text-slate-200 whitespace-nowrap">
                                Master 1
                            </span>
                        </p>
                    </badge-card>
                    <badge-card
                        class="show-right flex w-full bg-slate-200 dark:bg-slate-600 py-2 px-3"
                        :style="'animation-delay: ' + (isMobile? 0: 3) + '00ms'"
                    >
                        <p class="flex space-x-2 w-full text-left text-lg">
                            <span class="flex font-bold text-slate-700 dark:text-slate-50 whitespace-nowrap">
                                <get-text :context="Lang.CreateTranslationContext('about', 'Domain')" /> :
                            </span>
                            <span class="flex font-semibold text-slate-600 dark:text-slate-200 whitespace-nowrap">
                                <get-text :context="Lang.CreateTranslationContext('about', 'ComputerScience')" />
                            </span>
                        </p>
                    </badge-card>
                </div>
                <div class="flex justify-center items-center">
                    <div class="show-left hidden md:flex h-48 w-48">
                        <div class="flex grow items-end relative rounded-[6em] h-80 -translate-y-32 overflow-hidden">
                            <div class="absolute w-full aspect-square border-4 border-orange-500 rounded-[6em]" />
                            <div class="z-10">
                                <img
                                    class="w-full border-4 border-transparent rounded-[6em]"
                                    src="/img/moi.png"
                                    alt="Moi"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="show-left flex flex-col items-center absolute top-0 right-0 w-6 h-6 md:flex hidden space-y-4"
                    :style="'animation-delay: ' + (isMobile? 0: 4) + '00ms'"
                >
                    <button
                        class="w-fit h-fit dring drop-shadow-lg"
                        :style="'animation-delay: ' + (isMobile? 0: 8) + '00ms'"
                        @click="displayCV"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            fill="currentColor"
                            class="w-12 text-orange-500 -rotate-[15deg] mx-auto"
                        >
                            <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
                        </svg>
                    </button>
                    <p
                        class="text-center text-lg text-orange-500 font-bold w-32 show-down"
                        :style="'animation-delay: ' + (isMobile? 0: 9) + '00ms'"
                    >
                        <get-text :context="Lang.CreateTranslationContext('about', 'DownloadCV')" />
                    </p>
                </div>
            </div>
            <div class="show-up flex mx-auto">
                <title-text class="my-8 text-slate-500 dark:text-slate-400">
                    <get-text :context="Lang.CreateTranslationContext('about', 'Interests')" />
                </title-text>
            </div>
            <div class="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0">
                <badge-card
                    class="show-up bg-slate-200 dark:bg-slate-600 p-4 w-full md:w-[22%] h-fit md:h-full space-y-2"
                    :style="'animation-delay: ' + (isMobile? 0: 1) + '00ms'"
                >
                    <code-bracket-icon class="w-10 mr-auto text-orange-500" />
                    <p class="text-lg font-semibold mr-auto text-orange-500">
                        <get-text :context="Lang.CreateTranslationContext('about', 'WebDev')" />
                    </p>
                    <p class="flex grow items-center text-md font-base">
                        <get-text :context="Lang.CreateTranslationContext('about', 'WebDevDesc')" />
                    </p>
                </badge-card>
                <badge-card
                    class="show-up bg-slate-200 dark:bg-slate-600 p-4 w-full md:w-[22%] h-fit md:h-full space-y-2"
                    :style="'animation-delay: ' + (isMobile? 0: 2) + '00ms'"
                >
                    <device-phone-mobile-icon class="w-10 mr-auto text-pink-500" />
                    <p class="text-lg font-semibold mr-auto text-pink-500">
                        <get-text :context="Lang.CreateTranslationContext('about', 'MobDev')" />
                    </p>
                    <p class="flex grow items-center text-md font-base">
                        <get-text :context="Lang.CreateTranslationContext('about', 'MobDevDesc')" />
                    </p>
                </badge-card>
                <badge-card
                    class="show-up bg-slate-200 dark:bg-slate-600 p-4 w-full md:w-[22%] h-fit md:h-full space-y-2"
                    :style="'animation-delay: ' + (isMobile? 0: 3) + '00ms'"
                >
                    <computer-desktop-icon class="w-10 mr-auto text-fuchsia-500" />
                    <p class="text-lg font-semibold mr-auto text-fuchsia-500">
                        <get-text :context="Lang.CreateTranslationContext('about', 'DesDev')" />
                    </p>
                    <p class="flex grow items-center text-md font-base">
                        <get-text :context="Lang.CreateTranslationContext('about', 'DesDevDesc')" />
                    </p>
                </badge-card>
                <badge-card
                    class="show-up bg-slate-200 dark:bg-slate-600 p-4 w-full md:w-[22%] h-fit md:h-full space-y-2"
                    :style="'animation-delay: ' + (isMobile? 0: 4) + '00ms'"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" class="w-10 h-10 mr-auto text-purple-500">
                        <path d="M216 336H424c22 0 41.2 15 46.6 36.4l3.6 14.3c6.7 26.6 30.6 45.3 58 45.3c33 0 59.8-26.8 59.8-59.8v-2.8c0-3.5-.3-7.1-.9-10.6L558.4 168c-6.2-36-27.8-60.4-54.6-67.1C461.4 90.3 399.7 80 320 80s-141.5 10.3-183.7 20.9C109.4 107.6 87.8 132 81.6 168L48.9 358.8c-.6 3.5-.9 7-.9 10.6v2.8c0 33 26.8 59.8 59.8 59.8c27.4 0 51.4-18.7 58-45.3l3.6-14.3C174.8 351 194 336 216 336zm211.6 62.3L424 384H216l-3.6 14.3c-12 48-55.1 81.7-104.6 81.7C48.3 480 0 431.7 0 372.2v-2.8c0-6.3 .5-12.5 1.6-18.7L34.3 159.8c8.6-50.2 40.9-93.2 90.3-105.5C170.5 42.9 236.2 32 320 32s149.5 10.9 195.3 22.3c49.4 12.3 81.7 55.3 90.3 105.5l32.7 190.9c1.1 6.2 1.6 12.4 1.6 18.7v2.8C640 431.7 591.7 480 532.2 480c-49.5 0-92.6-33.7-104.6-81.7zM232 168v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H232v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H152c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24zm168 72a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm32-64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <p class="text-lg font-semibold mr-auto text-purple-500">
                        <get-text :context="Lang.CreateTranslationContext('about', 'GameDev')" />
                    </p>
                    <p class="flex grow items-center text-md font-base">
                        <get-text :context="Lang.CreateTranslationContext('about', 'GameDevDesc')" />
                    </p>
                </badge-card>
            </div>
            <!-- <div class="show-up flex space-x-4 md:space-x-8 mt-20">
                <building-office-2-icon class="w-10 md:w-12 text-slate-600 dark:text-slate-300" />
                <title-text class="my-10">
                    About FurWaz
                </title-text>
            </div>
            <div class="show-up flex flex-col">
                
            </div> -->
            <div class="show-up flex space-x-4 md:space-x-8 mt-20">
                <link-icon class="w-10 md:w-12 text-slate-600 dark:text-slate-300" />
                <title-text class="my-10">
                    <get-text :context="Lang.CreateTranslationContext('about', 'Links')" />
                </title-text>
            </div>
            <div class="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0">
                <a
                    v-for="link in links"
                    :key="link.name"
                    :href="link.link"
                    class="show-up mx-auto w-48 md:w-[15%] h-fit"
                    :style="'animation-delay: ' + (100 * (isMobile? 0: (links.length - links.indexOf(link)))) + 'ms'"
                    target="_blank"
                >
                    <badge-card
                        class="show-up bg-slate-200 dark:bg-slate-600 p-4 space-y-2"
                    >
                        <div class="flex mx-auto w-12 text-slate-700 dark:text-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="link.viewbox" fill="currentColor">
                                <path :d="link.path" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-center text-lg font-semibold m-auto text-slate-700 dark:text-slate-200">
                                {{ link.name }}
                            </p>
                            <p class="text-center text-md font-base m-auto text-slate-500 dark:text-slate-400 italic">
                                {{ link.desc }}
                            </p>
                        </div>
                    </badge-card>
                </a>
            </div>
            <div class="show-up flex space-x-4 md:space-x-8 mt-20">
                <user-group-icon class="w-10 md:w-12 text-slate-600 dark:text-slate-300" />
                <title-text class="my-10">
                    <get-text :context="Lang.CreateTranslationContext('about', 'Friends')" />
                </title-text>
            </div>
            <div class="show-up flex flex-wrap justify-evenly">
                <badge-card
                    v-for="friend in friends"
                    :key="friend.name"
                    class="show-up bg-slate-200 dark:bg-slate-600 p-2 w-fit my-4 md:mx-4"
                    :style="'animation-delay: ' + (100 * (isMobile? 0: friends.indexOf(friend) + 1)) + 'ms'"
                >
                    <div class="flex justify-center items-center">
                        <img
                            class="w-20 rounded-lg"
                            :src="friend.icon"
                            :alt="friend.name + ' icon'"
                        >
                        <div class="px-4">
                            <p class="text-xl font-semibold text-slate-700 dark:text-slate-200 pl-1"> {{ friend.name }} </p>
                            <base-text>
                                <a
                                    class="href"
                                    target="_blank"
                                    :href="friend.website"
                                >
                                    {{ friend.website.replace(/(http|https):\/\//, '') }}
                                </a>
                            </base-text>
                        </div>
                    </div>
                </badge-card>
            </div>
            <div class="show-up flex space-x-4 md:space-x-8 mt-20">
                <envelope-icon class="w-10 md:w-12 text-slate-600 dark:text-slate-300" />
                <title-text class="my-10">
                    <get-text :context="Lang.CreateTranslationContext('about', 'ContactMe')" />
                </title-text>
            </div>
            <div class="show-up flex justify-center mb-20">
                <a
                    class="w-fit h-fit"
                    href="mailto:loisil.paul06@gmail.com"
                    target="_blank"
                >
                    <badge-card
                        class="show-up bg-slate-200 dark:bg-slate-600 p-4 space-y-2"
                    >
                        <p class="flex space-x-2 w-full text-left text-lg">
                            <span class="flex font-bold text-slate-700 dark:text-slate-50 whitespace-nowrap">
                                <get-text :context="Lang.CreateTranslationContext('about', 'Mail')" /> :
                            </span>
                            <span class="font-semibold text-slate-600 dark:text-slate-200 whitespace-nowrap">
                                loisil.paul06@gmail.com
                            </span>
                        </p>
                    </badge-card>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { animateShows } from '../scripts/common';
import IconHeader from '../components/cards/IconHeader.vue';
import TitleText from '../components/text/TitleText.vue';
import BadgeCard from '../components/cards/BadgeCard.vue';
import BaseText from '../components/text/BaseText.vue';
import GetText from '../components/text/GetText.vue';
import Lang from '../scripts/Lang';

import {
    BuildingOffice2Icon,
    UserCircleIcon,
    UserGroupIcon,
    CodeBracketIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    LinkIcon,
    ComputerDesktopIcon
} from '@heroicons/vue/24/outline';

const friends = [
    {
        name: "Toxicbloud",
        icon: "/img/friends/toxicbloud.png",
        website: "https://antoninrousseau.fr"
    },
    {
        name: "Cats & Foxes",
        icon: "/img/friends/catsandfoxes.png",
        website: "https://catsandfoxes.com"
    },
    {
        name: "LeToucan",
        icon: "/img/friends/letoucan.png",
        website: "https://antoinectx.fr"
    }
];

const links = [
    {
        name: "GitHub",
        desc: "FurWaz",
        link: "https://github.com/FurWaz",
        viewbox: "0 0 496 512",
        path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    },
    {
        name: "LinkedIn",
        desc: "Paul Loisil",
        link: "https://www.linkedin.com/in/loisil-paul/",
        viewbox: "0 0 498 512",
        path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
    },
    {
        name: "Twitter",
        desc: "FurWaz",
        link: "https://twitter.com/FurWaz",
        viewbox: "0 0 512 512",
        path: "M512 97.2c-18.8 8.3-39.1 13.9-60.2 16.4 21.6-12.9 38.2-33.3 46-57.6-20.2 12-42.6 20.7-66.4 25.4C418.2 62.8 391.7 48 362.2 48c-59.4 0-107.5 48-107.5 107.5 0 8.4.9 16.6 2.6 24.5-89.3-4.5-168.6-47.3-221.5-112.6-9.2 15.8-14.5 34.2-14.5 53.8 0 37.2 18.9 69.9 47.6 88.9-17.5-.5-34-5.4-48.4-13.5v1.3c0 51.9 36.8 95.3 85.7 105.2-8.9 2.4-18.3 3.7-28 3.7-6.8 0-13.4-.7-19.8-2 13.5 42.1 52.5 72.8 98.6 73.6-36.2 28.4-81.7 45.3-131.3 45.3-8.5 0-16.9-.5-25.2-1.5C46.8 462.5 102.2 480 161.2 480c193.4 0 298.9-160.2 298.9-298.9 0-4.6-.1-9.1-.3-13.5 20.5-14.8 38.2-33.3 52.3-54.4z"
    }
];

export default {
    name: "AboutView",
    components: {
        IconHeader,
        // BuildingOffice2Icon,
        UserCircleIcon,
        TitleText,
        UserGroupIcon,
        BadgeCard,
        CodeBracketIcon,
        DevicePhoneMobileIcon,
        EnvelopeIcon,
        LinkIcon,
        BaseText,
        GetText,
        ComputerDesktopIcon
    },
    data() {
        return {
            Lang,
            friends,
            links,
            isMobile: window.innerWidth < 768
        };
    },
    mounted() {
        animateShows(this.$el);
        window.addEventListener("resize", () => {
            this.isMobile = window.innerWidth < 768;
        });
    },
    methods: {
        displayCV() {
            const CVurl = "/CurriculumVitae.pdf";
            window.open(CVurl, "_blank");
        }
    }
}
</script>