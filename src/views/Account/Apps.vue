<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header :label="Lang.CreateTranslationContext('apps', 'Apps')" />
        <div class="flex justify-start">
            <button-block
                class="show-right m-4 my-8"
                :onclick="() => $refs['create-modal'].open()"
            >
                <get-text :context="Lang.CreateTranslationContext('apps', 'CreateApp')" />
            </button-block>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 justify-evenly w-full min-h-[22em] pb-8">
            <app-card
                v-for="(app, index) in apps"
                :key="app"
                class="show-up mx-auto"
                :style="'animation-delay: '+index+'00ms;'"
                :app="app"
                :on-delete="() => apps.splice(index, 1)"
            />
            <div
                v-show="apps.length <= 0 && !loading"
                class="flex flex-col grow h-full w-full justify-center items-center"
            >
                <title-text class="show-up">
                    <get-text :context="Lang.CreateTranslationContext('apps', 'NoApps')" />
                </title-text>
                <base-text class="show-up">
                    <get-text :context="Lang.CreateTranslationContext('apps', 'NoAppsDesc')" />
                </base-text>
            </div>
            <div
                v-show="loading"
                class="flex flex-col grow h-full w-full justify-center items-center"
            >
                <title-text class="show-up">
                    <get-text :context="Lang.CreateTranslationContext('apps', 'LoadingApps')" />
                </title-text>
                <base-text class="show-up">
                    <get-text :context="Lang.CreateTranslationContext('apps', 'LoadingAppsDesc')" />
                </base-text>
            </div>
        </div>
        <div class="flex flex-col w-full h-fit md:px-20 px-2 pb-20">
            <section-text class="show-up mx-auto">
                <get-text :context="Lang.CreateTranslationContext('apps', 'AppPortal')" />
            </section-text>
            <title-text class="show-up">
                <get-text :context="Lang.CreateTranslationContext('apps', 'AppPortalUsage')" />
            </title-text>
            <div class="flex show-up h-full w-full">
                <div class="w-full">
                    <block-text :text="Lang.CreateTranslationContext('apps', 'AppPortalDesc1')" />
                    <code-text
                        lang="js"
                        :text="Lang.CreateTranslationContext('apps', 'AppPortalCode1')"
                    />
                    <block-text :text="Lang.CreateTranslationContext('apps', 'AppPortalDesc2')" />
                    <code-text
                        lang="js"
                        :text="Lang.CreateTranslationContext('apps', 'AppPortalCode2')"
                    />
                    <block-text :text="Lang.CreateTranslationContext('apps', 'AppPortalDesc3')" />
                    <code-text
                        lang="js"
                        :text="Lang.CreateTranslationContext('apps', 'AppPortalCode3')"
                    />
                    <block-text :text="Lang.CreateTranslationContext('apps', 'AppPortalDesc4')" />
                    <code-text
                        lang="js"
                        :text="Lang.CreateTranslationContext('apps', 'AppPortalCode4')"
                    />
                </div>
                <div class="md:flex hidden float-right w-fit h-fit pl-20">
                    <iframe
                        src="/portal?token=dummytoken"
                        class="w-[18em] h-[32em] rounded-lg shadow-lg border-2 border-slate-300 dark:border-slate-600"
                    />
                </div>
            </div>
            <div class="flex flex-col">
                <title-text class="show-up">
                    <get-text :context="Lang.CreateTranslationContext('apps', 'AppPortalScript')" />
                </title-text>
                <div class="inline">
                    <block-text :text="Lang.CreateTranslationContext('apps', 'AppPortalScriptDesc')" />
                </div>
                <code-text
                    lang="html"
                    :text="Lang.CreateTranslationContext('apps', 'AppPortalScriptCode')"
                />
            </div>
        </div>
    </div>
    <modal-card ref="create-modal">
        <title-text class="show-up">
            <get-text :context="Lang.CreateTranslationContext('apps', 'CreateApp')" />
        </title-text>
        <form-card
            :validate="Lang.CreateTranslationContext('verbs', 'Create')"
            :on-cancel="() => $refs['create-modal'].close()"
            :on-validate="createApp"
            :display-icon="false"
            :borders="false"
        >
            <input-text
                class="show-up"
                name="name"
                orientation="col"
                :label="Lang.CreateTranslationContext('apps', 'AppName')"
                :placeholder="Lang.CreateTranslationContext('apps', 'AppName')"
            />
            <input-area
                class="show-up"
                name="description"
                :label="Lang.CreateTranslationContext('apps', 'AppDescription')"
                :placeholder="Lang.CreateTranslationContext('apps', 'AppDescription')"
            />
        </form-card>
    </modal-card>
</template>

<script>
import AppCard from "../../components/apps/AppCard.vue";
import { animateShows } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import API from '../../scripts/API';
import IconHeader from '../../components/cards/IconHeader.vue';
import ButtonBlock from '../../components/inputs/ButtonBlock.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import FormCard from '../../components/cards/FormCard.vue';
import ModalCard from '../../components/cards/ModalCard.vue';
import InputText from '../../components/inputs/InputText.vue';
import TitleText from '../../components/text/TitleText.vue';
import InputArea from '../../components/inputs/InputArea.vue';
import { Log } from '../../scripts/Logs';
import SectionText from '../../components/text/SectionText.vue';
import BlockText from '../../components/text/BlockText.vue';
import CodeText from '../../components/text/CodeText.vue';
import BaseText from '../../components/text/BaseText.vue';
import GetText from '../../components/text/GetText.vue';

const apps = [];

function fetchMyApps() {
    return new Promise((resolve, reject) => {
        API.execute_logged(API.ROUTE.MY.APPS()).then(res => {
            resolve(res.data.items);
        }).catch(err => {
            console.error(err);
        });
    })
}

export default {
    name: "MyApps",
    components: {
        AppCard,
        IconHeader,
        ButtonBlock,
        ButtonBack,
        FormCard,
        ModalCard,
        InputText,
        TitleText,
        InputArea,
        SectionText,
        BlockText,
        CodeText,
        BaseText,
        GetText
    },
    data() {
        return {
            Lang,
            apps,
            loading: true
        };
    },
    mounted() {
        animateShows(this.$el);
        fetchMyApps().then(apps => {
            this.apps = apps;
            this.loading = false;
        });
    },
    methods: {
        createApp(form) {
            const log = form.log(Lang.CreateTranslationContext('verbs', 'Creating'), Log.INFO);
            const body = form.body();
            API.execute_logged(API.ROUTE.APPS(), API.METHOD.POST, body).then(res => {
                log.update(res.message, Log.SUCCESS);
                this.apps.push(res.data.app);
                setTimeout(() => {
                    log.delete();
                    this.$refs['create-modal'].close();
                }, 2000);
            }).catch(err => {
                log.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            });
        }
    }
}
</script>