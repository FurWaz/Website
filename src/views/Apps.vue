<template>
    <div class="flex flex-col grow min-h-full w-full">
        <div class="flex flex-col justify-center items-center h-[20%] my-20">
            <icon-card class="h-40 w-40" />
            <h1
                class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                {{ lang.Apps() }}
            </h1>
        </div>

        <div class="flex flex-col h-fit w-full mt-20">
            <title-text class="show-up mx-auto">
                {{ lang.ProjectManagement() }}
            </title-text>
            <div class="flex flex-col justify-center w-full my-12 px-4">
                <badge-card
                    class="show-up w-fit p-2 mx-auto"
                    :hoverable="false"
                >
                    <base-text class="mx-auto text-center">
                        {{ lang.OhWoops() }}
                    </base-text>
                    <base-text class="flex grow mx-auto text-center">
                        {{ lang.NothingInSection() }}
                    </base-text>
                </badge-card>
            </div>
        </div>
        
        <div class="flex flex-col h-fit w-full mt-20">
            <title-text class="show-up mx-auto">
                {{ lang.Technology() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in tech"
                    :key="item.name"
                    class="show-up p-2 space-y-8 max-w-[18em] min-h-[20em] h-full hover:shadow-md md:mx-0 mx-auto"
                    :style="'animation-delay: ' + (index * 100 + 100) + 'ms;'"
                >
                    <div
                        class="flex flex-col items-center justify-center w-full"
                    >
                        <svg-text
                            class="w-12 h-12 my-4"
                            v-html="item.icon"
                        />
                        <title-text class="mx-auto text-center">
                            {{ item.name }}
                        </title-text>
                    </div>
                    <base-text class="flex grow mx-auto text-center">
                        {{ item.description }}
                    </base-text>
                    <div class="flex justify-between w-full">
                        <button-block
                            v-for="link in item.links"
                            :key="link.name"
                            :href="link.url"
                        >
                            {{ link.name }}
                        </button-block>
                    </div>
                </badge-card>
            </div>
        </div>

        <div class="flex flex-col h-fit w-full mt-20">
            <title-text class="show-up mx-auto">
                {{ lang.Music() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in music"
                    :key="item.name"
                    class="show-up p-2 space-y-8 max-w-[18em] min-h-[20em] h-full hover:shadow-md md:mx-0 mx-auto"
                    :style="'animation-delay: ' + (index * 100 + 100) + 'ms;'"
                >
                    <div
                        class="flex flex-col items-center justify-center w-full"
                    >
                        <svg-text
                            class="w-12 h-12 my-4"
                            v-html="item.icon"
                        />
                        <title-text class="mx-auto text-center">
                            {{ item.name }}
                        </title-text>
                    </div>
                    <base-text class="flex grow mx-auto text-center">
                        {{ item.description }}
                    </base-text>
                    <div class="flex justify-between w-full">
                        <button-block
                            v-for="link in item.links"
                            :key="link.name"
                            :href="link.url"
                        >
                            {{ link.name }}
                        </button-block>
                    </div>
                </badge-card>
            </div>
        </div>

        <div class="flex flex-col h-fit w-full mt-20">
            <title-text class="show-up mx-auto">
                {{ lang.Other() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in other"
                    :key="item.name"
                    class="show-up p-2 space-y-8 max-w-[18em] min-h-[20em] h-full hover:shadow-md md:mx-0 mx-auto"
                    :style="'animation-delay: ' + (index * 100 + 100) + 'ms;'"
                >
                    <div
                        class="flex flex-col items-center justify-center w-full"
                    >
                        <svg-text
                            class="w-12 h-12 my-4"
                            v-html="item.icon"
                        />
                        <title-text class="mx-auto text-center">
                            {{ item.name }}
                        </title-text>
                    </div>
                    <base-text class="flex grow mx-auto text-center">
                        {{ item.description }}
                    </base-text>
                    <div class="flex justify-between w-full">
                        <button-block
                            v-for="link in item.links"
                            :key="link.name"
                            :href="link.url"
                        >
                            {{ link.name }}
                        </button-block>
                    </div>
                </badge-card>
            </div>
        </div>
    </div>
</template>

<script>
import BadgeCard from '../components/cards/BadgeCard.vue';
import IconCard from "../components/cards/IconCard.vue";
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import SvgText from '../components/text/SvgText.vue';
import TitleText from '../components/text/TitleText.vue';
import BaseText from '../components/text/BaseText.vue';
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

const project = [
    // TODO : Do some apps !
];

const tech = [
    {
        name: Lang.CurrentLang.Brainfuck(),
        icon: `<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 9.5 22c1.21 0 2.5-.74 2.5-2.5m0-15a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 14.5 22c-1.21 0-2.5-.74-2.5-2.5m0-15V5m0 14.5V19"></path><circle cx="12" cy="12" r="2"></circle><path d="M12 9v1"></path><path d="M12 14v1"></path><path d="m14.6 10.5-.87.5"></path><path d="m10.27 13-.87.5"></path><path d="m14.6 13.5-.87-.5"></path><path d="m10.27 11-.87-.5"></path>`,
        description: Lang.CurrentLang.BrainfuckDesc(),
        links: [
            {
                name: Lang.CurrentLang.BrainfuckBtn(),
                url: "https://github.com/FurWaz/Brainfuck"
            }
        ]
    },
];

const music = [
    {
        name: Lang.CurrentLang.FyneWav(),
        icon: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`,
        description: Lang.CurrentLang.FyneWavDesc(),
        links: [
            {
                name: Lang.CurrentLang.FyneWavBtn(),
                url: "https://github.com/FurWaz/FyneWav"
            }
        ]
    },
    {
        name: Lang.CurrentLang.Furalizer(),
        icon: `<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>`,
        description: Lang.CurrentLang.FuralizerDesc(),
        links: [
            {
                name: Lang.CurrentLang.FuralizerBtn(),
                url: "https://github.com/FurWaz/Furalizer"
            }
        ]
    },
];

const other = [
    {
        name: Lang.CurrentLang.Quid(),
        icon: `<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>`,
        description: Lang.CurrentLang.QuidDesc(),
        links: [
            {
                name: Lang.CurrentLang.QuidBtn(),
                url: "https://quid.apps.furwaz.fr"
            } // TODO : make the apps subdomain + add github link to the app
        ]
    },
    {
        name: Lang.CurrentLang.Converter(),
        icon: `<path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path>`,
        description: Lang.CurrentLang.ConverterDesc(),
        links: [
            {
                name: Lang.CurrentLang.ConverterBtn(),
                url: "https://conv.projects.furwaz.fr/"
            }
        ]
    },
];

export default {
    name: "AppsView",
    components: {
        IconCard,
        TitleText,
        BaseText,
        BadgeCard,
        ButtonBlock,
        SvgText,
    },
    data() {
        return {
            lang: Lang.CurrentLang,
            project,
            tech,
            music,
            other
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
    }
}
</script>