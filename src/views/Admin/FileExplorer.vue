<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header
            :label="Lang.CreateTranslationContext('explorer', 'FileExplorer')"
            :show-icon="false"
        />
        <div class="show-up flex flex-col grow m-4 border-2 border-slate-300 dark:border-slate-800 rounded-lg overflow-hidden">
            <div class="flex grow h-fit border-b-2 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-800 p-2 space-x-2">
                <div class="flex grow m-auto">
                    <button-block
                        class="show-right"
                        :onclick="backFolder"
                    >
                        <get-text :context="Lang.CreateTranslationContext('explorer', 'Back')" />
                    </button-block>
                </div>
                <div class="show-left flex grow m-auto min-w-0">
                    <p class="h-fit min-w-0 w-full text-slate-600 dark:text-slate-300 text-xl font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                        {{ element?.name }}
                    </p>
                </div>
            </div>
            <div class="min-h-0 h-full bg-white dark:bg-slate-800 overflow-auto">
                <div class="h-fit w-full">
                    <div
                        v-for="el in element?.elements"
                        :key="el"
                        class="flex grow m-1 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded-lg"
                        :class="animationClass"
                        @click="selectElement(el)"
                    >
                        <div class="flex w-8 my-auto mr-4 text-slate-700 dark:text-slate-300">
                            <div
                                v-if="el?.type === 'folder'"
                                class="mx-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="h-6">
                                    <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"/>
                                </svg>
                            </div>
                            <div
                                v-else
                                class="mx-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" class="h-6">
                                    <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex grow m-auto">
                            <p class="h-fit text-slate-700 dark:text-slate-300 text-lg">
                                {{ el?.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { animateShows } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import IconHeader from '../../components/cards/IconHeader.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import User from '../../scripts/User';
import ButtonBlock from '../../components/inputs/ButtonBlock.vue';
import GetText from '../../components/text/GetText.vue';

export default {
    name: "FileExplorer",
    components: {
        IconHeader,
        ButtonBlock,
        ButtonBack,
        GetText
    },
    data() {
        return {
            Lang,
            element: null,
            path: '/',
            animationClass: "show-left"
        };
    },
    mounted() {
        animateShows(this.$el);
        this.fetchCurrentFolder();
    },
    methods: {
        fetchCurrentFolder() {
            this.element = null;
            fetch(import.meta.env.VITE_FILE_API_URL + this.path, {
                headers: {Authorization: User.CurrentUser.access}
            }).then(res => res.json()).then(json => {
                this.element = json.data;
            }).catch(err => {
                console.error(err);
            })
        },
        selectElement(el) {
            if (el.type !== 'folder') return;
            this.path += el.name + '/';
            this.fetchCurrentFolder();
            this.animationClass = "show-left";
        },
        backFolder() {
            if (this.path === '/') return;
            this.path = this.path.split('/').slice(0, -2).join('/') + '/';
            this.fetchCurrentFolder();
            this.animationClass = "show-right";
        }
    }
}
</script>