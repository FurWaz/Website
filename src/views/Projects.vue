<template>
    <div class="flex flex-col grow min-h-full w-full">
        <div class="flex flex-col justify-center items-center h-[20%] my-20">
            <icon-card class="h-40 w-40" />
            <h1
                class="noscroll show-up text-4xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                {{ lang.Projects() }}
            </h1>
        </div>

        <div class="flex flex-col h-fit w-full mt-20">
            <title-text class="show-up mx-auto">
                {{ lang.MyGames() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in games"
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
                {{ lang.MyProjects() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in projects"
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
                {{ lang.SchoolProjects() }}
            </title-text>
            <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full my-12">
                <badge-card
                    v-for="(item, index) in school"
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

const games = [
    {
        name: Lang.CurrentLang.ToTheTop(),
        icon: `<path d="M9 19h6"></path><path d="M9 15v-3H5l7-7 7 7h-4v3H9z"></path>`,
        description: Lang.CurrentLang.ToTheTopDesc(),
        links: [
            {
                name: Lang.CurrentLang.ToTheTopBtn(),
                url: ""
            }
        ]
    },
    {
        name: Lang.CurrentLang.Obstruct(),
        icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" x2="15" y1="9" y2="15"></line><line x1="15" x2="9" y1="9" y2="15"></line>`,
        description: Lang.CurrentLang.ObstructDesc(),
        links: [
            {
                name: Lang.CurrentLang.ObstructBtn(),
                url: "https://furwaz.itch.io/0bstruct"
            }
        ]
    },
    {
        name: Lang.CurrentLang.Steroids(),
        icon: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>`,
        description: Lang.CurrentLang.SteroidsDesc(),
        links: [
            {
                name: Lang.CurrentLang.SteroidsBtn(),
                url: "https://furwaz.itch.io/steroids"
            }
        ]
    }
];

const projects = [
    {
        name: Lang.CurrentLang.VyBeen(),
        icon: `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
        description: Lang.CurrentLang.VyBeenDesc(),
        links: [
            {
                name: Lang.CurrentLang.VyBeenBtn(),
                url: "https://vybeen.projects.furwaz.fr"
            }
        ]
    },
    {
        name: Lang.CurrentLang.AlgoSnipper(),
        icon: `<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"></path><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path>`,
        description: Lang.CurrentLang.AlgoSnipperDesc(),
        links: [
            {
                name: Lang.CurrentLang.AlgoSnipperBtn(),
                url: "https://github.com/FurWaz/AlgoSnipper"
            }
        ]
    },
    {
        name: Lang.CurrentLang.Codec(),
        icon: `<rect width="18" height="10" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line>`,
        description: Lang.CurrentLang.CodecDesc(),
        links: [
            {
                name: Lang.CurrentLang.CodecBtn(),
                url: "https://github.com/FurWaz/Codec"
            }
        ]
    }
];

const school = [
    {
        name: Lang.CurrentLang.XRTouch(),
        icon: `<rect width="18" height="10" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line>`,
        description: Lang.CurrentLang.XRTouchDesc(),
        links: [
            {
                name: Lang.CurrentLang.XRTouchBtn(),
                url: "https://github.com/XRTouch"
            }
        ]
    },
    {
        name: Lang.CurrentLang.WebXR(),
        icon: `<circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"></path><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"></path>`,
        description: Lang.CurrentLang.WebXRDesc(),
        links: [
            {
                name: Lang.CurrentLang.WebXRBtn(),
                url: "https://github.com/FurWaz/WebXR"
            }
        ]
    },
    {
        name: Lang.CurrentLang.Cocktails(),
        icon: `<path d="M8 22h8"></path><path d="M12 11v11"></path><path d="m19 3-7 8-7-8Z"></path>`,
        description: Lang.CurrentLang.CocktailsDesc(),
        links: [
            {
                name: Lang.CurrentLang.CocktailsBtn(),
                url: "https://cocktails.projects.furwaz.fr"
            }
        ]
    },
    // TODO : Add roomview and other projects
];

export default {
    name: "ProjectsView",
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
            games,
            projects,
            school
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
    }
}
</script>