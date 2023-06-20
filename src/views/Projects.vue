<template>
    <div class="flex flex-col grow min-h-full w-full">
        <icon-header :label="lang.Projects()" />

        <div class="flex show-up h-fit w-fit justify-center mx-auto my-4 space-x-4">
            <input-text
                :placeholder="lang.Search()"
                :oninput="search"
                :value="searchValue"
            />
        </div>

        <div class="flex flex-wrap justify-evenly w-full my-12">
            <badge-card
                v-for="item in displayedProjects"
                :key="item.name()"
                class="show-up p-2 m-8 max-w-[18em] min-h-[22em] h-fit hover:shadow-md"
            >
                <div
                    class="flex flex-col items-center justify-center w-full"
                >
                    <svg-text
                        class="w-12 h-12 my-4"
                        v-html="item.icon"
                    />
                    <title-text class="mx-auto text-center">
                        {{ item.name() }}
                    </title-text>
                </div>
                <base-text class="flex grow mx-auto text-center">
                    {{ item.description() }}
                </base-text>
                <div class="flex justify-between w-full my-6">
                    <button-block
                        v-for="link in item.links"
                        :key="link.name()"
                        :href="link.url"
                    >
                        {{ link.name() }}
                    </button-block>
                </div>
                <div
                    v-if="item.tags && item.tags.length > 0"
                    class="flex w-full overflow-y-hidden overflow-x-auto pb-2"
                >
                    <router-link
                        v-for="tag in item.tags"
                        :key="tag"
                        :to="'/projects?tag=' + tag"
                        class="mx-2 px-2 pb-1 rounded-lg border-2 font-semibold border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400
                               hover:border-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-600 dark:hover:text-slate-200 transition-all"
                    >
                        #{{ tag }}
                    </router-link>
                </div>
            </badge-card>
        </div>
    </div>
</template>

<script>
import BadgeCard from '../components/cards/BadgeCard.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import SvgText from '../components/text/SvgText.vue';
import TitleText from '../components/text/TitleText.vue';
import BaseText from '../components/text/BaseText.vue';
import { animateShows, levenshteinDistance } from '../scripts/common';
import Lang from '../scripts/Lang';
import IconHeader from '../components/cards/IconHeader.vue';

import projects from '../data/projects.js';
import InputText from '../components/inputs/InputText.vue';
import InputChoice from '../components/inputs/InputChoice.vue';

export default {
    name: "AppsView",
    components: {
        TitleText,
        BaseText,
        BadgeCard,
        ButtonBlock,
        SvgText,
        IconHeader,
        InputText,
    },
    data() {
        return {
            lang: Lang.CurrentLang,
            displayedProjects: Array.from(projects),
            searchTimeout: -1,
            searchValue: ""
        };
    },
    watch: {
        $route(to, from) { this.checkForDefaultTag(); }
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
        this.checkForDefaultTag();
    },
    methods: {
        search(ev) {
            const input = ev.target.value;
            if (this.searchTimeout !== -1) {
                clearTimeout(this.searchTimeout);
            }
            this.searchTimeout = setTimeout(() => {
                this.searchTimeout = -1;
                this.filterProjects(input);
            }, 300);
        },
        filterProjects(input) {
            this.searchValue = input;
            if (input.length <= 0) {
                this.displayedProjects = Array.from(projects);
                return;
            }

            const keys = input.split(" ").filter(item => item.length > 0);
            const weightedProjects = projects.map(item => {
                let nameWeight = 0;
                let descriptionWeight = 0;
                let tagsWeight = 0;

                keys.forEach((key, index) => {
                    const nameMatches = item.name().toLowerCase().includes(key.toLowerCase());
                    const descriptionMatches = item.description().toLowerCase().includes(key.toLowerCase());
                    const tagsMatches = (item.tags !== undefined && item.tags !== null && item.tags.length > 0)
                        ? item.tags.reduce((acc, tag) => {
                            const tagMatches = tag.toLowerCase().includes(key.toLowerCase());
                            if (tagMatches) return acc + 5;
                            const distance = levenshteinDistance(tag.toLowerCase(), key.toLowerCase());
                            if (distance <= 2) return acc + (4 - distance);
                            return acc;
                        }, 0)
                        : 0;
                    const ratio = 1 - (index / keys.length);
                    nameWeight += (nameMatches? 10: 0) * ratio;
                    descriptionWeight += (descriptionMatches? 5: 0) * ratio;
                    tagsWeight += (tagsMatches) * ratio;
                });

                return {
                    project: item,
                    weight: nameWeight + descriptionWeight + tagsWeight
                };
            });
            const sortedProjects = weightedProjects.sort((a, b) => b.weight - a.weight);
            this.displayedProjects = sortedProjects.filter(item => item.weight > 0).map(item => item.project);
        },
        checkForDefaultTag() {
            const tag = window.location.search.includes("tag=")
                ? window.location.search.split("tag=")[1].split("&")[0]
                : null;
            if (tag) {
                this.filterProjects(tag);
            } else {
                this.displayedProjects = Array.from(projects);
            }
        }
    }
}
</script>