<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header
            :label="Lang.CreateTranslationContext('explorer', 'FileExplorer')"
            :show-icon="false"
        />
        <div class="show-up flex flex-col grow m-4 border-2 border-slate-300 dark:border-slate-800 rounded-lg overflow-hidden">
            <div class="flex grow h-fit border-b-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-800 p-2 space-x-2">
                <div class="w-12 h-8">
                    <button-block
                        v-show="path !== '/'"
                        class="show-right"
                        :onclick="backFolder"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5" fill="currentColor">
                            <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l160-160c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 96 184 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-184 0 0 96c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-160-160z" />
                        </svg>
                    </button-block>
                </div>
                <div class="flex grow show-down min-w-0 text-center">
                    <p class="h-fit min-w-0 w-full text-slate-600 dark:text-slate-300 text-xl font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                        {{ element?.name }}
                    </p>
                </div>
                <div class="w-12 h-8">
                    <button-block
                        class="show-left"
                        :onclick="openSettings"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5" fill="currentColor">
                            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                        </svg>
                    </button-block>
                </div>
            </div>
            <div class="min-h-0 h-full bg-white dark:bg-slate-800 overflow-x-hidden overflow-y-auto">
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
    <modal-card ref="settings-modal">
        <title-text class="show-up mb-2 p-1 pb-2 border-b-2 border-slate-500">
            <get-text :context="Lang.CreateTranslationContext('explorer', 'Settings')" />
        </title-text>
        <form-card
            :validate="Lang.CreateTranslationContext('verbs', 'Validate')"
            :on-cancel="() => $refs['settings-modal'].close()"
            :on-validate="applySettings"
            :display-icon="false"
            :borders="false"
        >
            <input-text
                class="show-up"
                name="name"
                orientation="col"
                :value="serverURLInput"
                @input="ev => serverURLInput = ev.target.value"
                :label="Lang.CreateTranslationContext('explorer', 'ServerURL')"
                :placeholder="Lang.CreateTranslationContext('explorer', 'ServerURL')"
            />
        </form-card>
    </modal-card>
</template>

<script>
import { animateShows } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import IconHeader from '../../components/cards/IconHeader.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import User from '../../scripts/User';
import ButtonBlock from '../../components/inputs/ButtonBlock.vue';
import GetText from '../../components/text/GetText.vue';
import ModalCard from '../../components/cards/ModalCard.vue';
import TitleText from '../../components/text/TitleText.vue';
import FormCard from '../../components/cards/FormCard.vue';
import InputText from '../../components/inputs/InputText.vue';

export default {
    name: "FileExplorer",
    components: {
        IconHeader,
        ButtonBlock,
        ButtonBack,
        GetText,
        ModalCard,
        TitleText,
        FormCard,
        InputText
    },
    data() {
        return {
            Lang,
            element: null,
            path: '/',
            animationClass: "show-left",
            serverURL: localStorage.getItem('serverURL') || import.meta.env.VITE_FILE_API_URL,
            serverURLInput: '',
            console
        };
    },
    mounted() {
        animateShows(this.$el);
        this.fetchCurrentFolder();
    },
    methods: {
        fetchCurrentFolder() {
            this.element = null;
            fetch(this.serverURL + this.path, {
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
        },
        openSettings() {
            this.serverURLInput = '';
            this.$refs['settings-modal'].open();
            this.serverURLInput = this.serverURL;
        },
        applySettings() {
            this.$refs['settings-modal'].close();
            if (this.serverURLInput === this.serverURL) return;
            this.serverURL = this.serverURLInput;
            localStorage.setItem('serverURL', this.serverURL);
            this.fetchCurrentFolder();
        }
    }
}
</script>