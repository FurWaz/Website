<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header :label="lang.Apps()" />
        <div class="flex justify-start">
            <button-block
                class="show-right m-4 my-8"
                :onclick="() => $refs['create-modal'].open()"
            >
                {{ lang.CreateApp() }}
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
                    {{ lang.NoApps() }}
                </title-text>
                <base-text class="show-up">
                    {{ lang.NoAppsDesc() }}
                </base-text>
            </div>
            <div
                v-show="loading"
                class="flex flex-col grow h-full w-full justify-center items-center"
            >
                <title-text class="show-up">
                    {{ lang.LoadingApps() }}
                </title-text>
                <base-text class="show-up">
                    {{ lang.LoadingAppsDesc() }}
                </base-text>
            </div>
        </div>
        <div class="flex flex-col w-full h-fit md:px-20 px-2 pb-20">
            <section-text class="show-up mx-auto">
                {{ lang.AppPortal() }}
            </section-text>
            <title-text class="show-up">
                {{ lang.AppPortalUsage() }}
            </title-text>
            <div class="flex show-up h-full w-full">
                <div class="w-full">
                    <block-text :text="lang.AppPortalDesc1()" />
                    <code-text
                        lang="js"
                        :text="lang.AppPortalCode1()"
                    />
                    <block-text :text="lang.AppPortalDesc2()" />
                    <code-text
                        lang="js"
                        :text="lang.AppPortalCode2()"
                    />
                    <block-text :text="lang.AppPortalDesc3()" />
                    <code-text
                        lang="js"
                        :text="lang.AppPortalCode3()"
                    />
                    <block-text :text="lang.AppPortalDesc4()" />
                    <code-text
                        lang="js"
                        :text="lang.AppPortalCode4()"
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
                    {{ lang.AppPortalScript() }}
                </title-text>
                <div class="inline">
                    <block-text :text="lang.AppPortalScriptDesc()" />
                </div>
                <code-text
                    lang="html"
                    :text="lang.AppPortalScriptCode()"
                />
            </div>
        </div>
    </div>
    <modal-card ref="create-modal">
        <title-text class="show-up">
            {{ lang.CreateApp() }}
        </title-text>
        <form-card
            :validate="lang.Create()"
            :on-cancel="() => $refs['create-modal'].close()"
            :on-validate="createApp"
            :display-icon="false"
            :borders="false"
        >
            <input-text
                class="show-up"
                name="name"
                orientation="col"
                :label="lang.AppName()"
                :placeholder="lang.AppName()"
            />
            <input-area
                class="show-up"
                name="description"
                :label="lang.AppDescription()"
                :placeholder="lang.AppDescription()"
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
        BaseText
    },
    data() {
        return {
            lang: Lang.CurrentLang,
            apps,
            loading: true
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        animateShows(this.$el);
        fetchMyApps().then(apps => {
            this.apps = apps;
            this.loading = false;
        });
    },
    methods: {
        createApp(form) {
            const log = form.log(this.lang.Creating(), Log.INFO);
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