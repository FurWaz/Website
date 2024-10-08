<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <div class="flex md:flex-row flex-col grow min-h-full h-full w-full">
        <div
            ref="projects"
            class="flex flex-col grow min-h-0 w-full overflow-auto"
        >
            <icon-header :label="Lang.CreateTranslationContext('projects', 'Projects')" />

            <div class="flex show-down h-fit w-fit justify-center mx-auto my-4 space-x-4">
                <InputText
                    ref="searchbar"
                    :placeholder="Lang.CreateTranslationContext('verbs', 'Search')"
                    :oninput="search"
                    :value="searchValue"
                />
            </div>

            <div class="flex flex-wrap justify-evenly w-full">
                <badge-card
                    v-for="item in displayedProjects"
                    :ref="'project-' + item.id?.toLowerCase().trim()"
                    :key="item"
                    :selected="selectedApp === item"
                    class="flex show-up p-2 m-8 max-w-[18em] min-h-[22em] h-fit hover:shadow-md space-y-4"
                >
                    <div
                        class="flex flex-col items-center justify-center w-full"
                    >
                        <svg-text
                            class="w-14 h-14 my-4"
                            :viewBox="item.viewBox ?? '0 0 24 24'"
                            v-html="item.icon"
                        />
                        <title-text class="mx-auto text-center">
                            <GetText :context="item.name" />
                        </title-text>
                    </div>
                    <base-text class="flex grow mx-auto text-center">
                        <GetText :context="item.short" />
                    </base-text>
                    <div class="flex justify-between w-full">
                        <ButtonBlock
                            :onclick="() => openAppPreview(item)"
                        >
                            <GetText :context="item.button" />
                        </ButtonBlock>
                    </div>
                    <div
                        v-if="item.tags && item.tags.length > 0"
                        class="flex w-full overflow-y-hidden overflow-x-auto space-x-2"
                    >
                        <router-link
                            v-for="tag in item.tags"
                            :key="tag"
                            :to="'/projects?search=' + tag"
                            class="pt-1 px-2 pb-1 rounded-lg border-2 font-semibold border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400
                                hover:border-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-600 dark:hover:text-slate-200 transition-all"
                        >
                            <p class="whitespace-nowrap p-0">#{{ tag }}</p>
                        </router-link>
                    </div>
                </badge-card>
            </div>
        </div>
        <div
            ref="preview"
            class="flex hidden z-50 bg-slate-50 dark:bg-slate-700 transition-all duration-300 md:border-0 md:shadow-none shadow-md rounded-md border-2 border-slate-200 dark:border-slate-600 overflow-hidden"
            :class="isMobile? 'absolute left-2 right-2 -bottom-2' : 'w-0'"
            style="top: 100em;"
        >
            <div class="md:flex hidden py-4">
                <span class="flex grow w-1 h-full rounded-md bg-slate-300 dark:bg-slate-600" />
            </div>
            <div class="flex flex-col w-full p-2">
                <div class="flex justify-start h-fit w-full p-2">
                    <div class="md:rotate-180">
                        <button-back :on-click="closeAppPreview" />
                    </div>
                </div>
                <div
                    v-if="selectedApp"
                    class="flex grow max-h-full h-full max-w-full w-full overflow-auto md:p-4"
                >
                    <div class="flex flex-col grow items-center space-y-20 h-fit w-fit">
                        <div
                            class="show-up flex flex-col items-center space-y-4"
                            style="animation-delay: 0ms"
                        >
                            <img
                                :src="selectedApp?.logo ?? ''"
                                :alt="selectedApp?.id + ' icon'"
                                class="w-32 h-32 rounded-lg"
                            >
                            <h1 class="flex text-4xl font-bold text-slate-600 dark:text-slate-200 text-center">
                                <GetText :context="selectedApp?.name" />
                            </h1>
                            <p class="flex text-xl font-semibold text-slate-500 dark:text-slate-300 text-center">
                                <GetText :context="selectedApp?.short" />
                            </p>
                        </div>
                        <p
                            class="show-up flex text-md font-semibold italic text-slate-400 px-4"
                            style="animation-delay: 200ms"
                        >
                            <GetText
                                :context="selectedApp?.description"
                                class="flex flex-col space-y-2"
                            />
                        </p>
                        <div
                            class="show-up flex flex-wrap justify-evenly w-full"
                            style="animation-delay: 400ms"
                        >
                            <badge-card
                                v-for="item in selectedApp?.links"
                                :key="item"
                                class="p-2 space-y-6 md:my-0 m-2 w-fit"
                                :hoverable="!item.disabled"
                            >
                                <svg-text
                                    class="w-20 pt-2 text-slate-600 dark:text-slate-200"
                                    :viewBox="item.viewBox ?? '0 0 512 512'"
                                    v-html="item.icon"
                                />
                                <ButtonBlock
                                    :href="item.link"
                                    :disabled="item.disabled"
                                >
                                    <GetText :context="item.button" />
                                </ButtonBlock>
                            </badge-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
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
import ButtonBack from '../components/inputs/ButtonBack.vue';
import GetText from '../components/text/GetText.vue';

export default defineComponent({
    name: "AppsView",
    components: {
        TitleText,
        BaseText,
        BadgeCard,
        ButtonBlock,
        SvgText,
        IconHeader,
        InputText,
        ButtonBack,
        GetText,
    },
    data() {
        return {
            Lang,
            displayedProjects: Array.from(projects),
            searchTimeout: -1,
            searchValue: "",
            currentView: null,
            selectedApp: null
        };
    },
    computed: {
        isMobile: () => window.innerWidth <= 768,
    },
    watch: {
        $route() {
            this.checkForDefaultSearch();
            this.checkForDefaultApp();
        }
    },
    mounted() {
        animateShows(this.$el);
        this.checkForDefaultSearch();
        this.checkForDefaultApp();
        if (!this.isMobile)
            this.$refs.searchbar?.focus();
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
            this.updateUrl();
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
                    const nameMatches = (item.name_str??'').toLowerCase().includes(key.toLowerCase());
                    const descriptionMatches = (item.description_str??'').toLowerCase().includes(key.toLowerCase());
                    const searchMatches = (item.tags !== undefined && item.tags !== null && item.tags.length > 0)
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
                    tagsWeight += (searchMatches) * ratio;
                });

                return {
                    project: item,
                    weight: nameWeight + descriptionWeight + tagsWeight
                };
            });
            const sortedProjects = weightedProjects.sort((a, b) => b.weight - a.weight);
            this.displayedProjects = sortedProjects.filter(item => item.weight > 0).map(item => item.project);
        },
        displayApp(name) {
            const app = projects.find(item => item.id?.toLowerCase().trim() === name.toLowerCase().trim());
            if (app) {
                this.openAppPreview(app, app.vue ?? app.links[0].vue ?? null);
                const appDiv = this.$refs['project-' + app.id.toLowerCase().trim()][0]?.$el;
                this.$refs["projects"].scrollTo({
                    top: appDiv.offsetTop - 100,
                    behavior: "smooth"
                });
            }
        },
        checkForDefaultSearch() {
            const search = this.$route.query.search ?? null;
            if (search) this.filterProjects(search);
            else this.filterProjects('');
        },
        checkForDefaultApp() {
            const app = this.$route.query.app ?? null;
            if (app) this.displayApp(app);
        },
        openAppPreview(app) {
            this.selectedApp = app;
            this.updateUrl();

            const preview = this.$refs["preview"];
            preview.classList.remove("hidden");
            setTimeout(() => {
                if (this.isMobile) {
                    preview.style.bottom = "0.5em";
                    preview.style.top = "4em";
                } else preview.style.width = "60em";
            }, 10);
        },
        closeAppPreview() {
            this.selectedApp = null;
            this.updateUrl();

            const preview = this.$refs["preview"];
            if (this.isMobile) {
                preview.style.bottom = "-2em";
                preview.style.top = "100em";
            } else preview.style.width = "0em";

            setTimeout(() => {
                preview.classList.add("hidden");
            }, 250);
        },
        updateUrl() {
            this.$router.push({
                query: {
                    search: (!this.searchValue.length)? undefined: this.searchValue,
                    app: (!this.selectedApp)? undefined: this.selectedApp.id
                }
            });
        }
    }
});
</script>