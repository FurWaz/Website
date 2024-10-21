<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="px-2 h-fit" />
        <icon-header :label="Lang.CreateTranslationContext('apps', 'Apps')" />
        <div class="flex justify-start">
            <ButtonBlock
                class="show-right m-4 my-8"
                :onclick="() => $refs['create-modal'].open()"
            >
                <GetText :context="Lang.CreateTranslationContext('apps', 'CreateApp')" />
            </ButtonBlock>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-8 md:space-y-0 space-y-4 items-center justify-evenly w-full pb-8">
            <div
                v-for="(app, index) in apps"
                :key="app.id"
                class="show-up"
                :style="'animation-delay: '+index+'00ms;'"
            >
                <app-card
                    :id="app.id"
                    :on-delete="() => apps.splice(index, 1)"
                />
            </div>
            <div
                v-show="apps.length <= 0 && !loading"
                class="flex flex-col grow h-full w-full justify-center items-center"
            >
                <title-text class="show-up">
                    <GetText :context="Lang.CreateTranslationContext('apps', 'NoApps')" />
                </title-text>
                <base-text class="show-up">
                    <GetText :context="Lang.CreateTranslationContext('apps', 'NoAppsDesc')" />
                </base-text>
            </div>
            <div
                v-show="loading"
                class="flex flex-col grow h-full w-full justify-center items-center"
            >
                <title-text class="show-up">
                    <GetText :context="Lang.CreateTranslationContext('apps', 'LoadingApps')" />
                </title-text>
                <base-text class="show-up">
                    <GetText :context="Lang.CreateTranslationContext('apps', 'LoadingAppsDesc')" />
                </base-text>
            </div>
        </div>
    </div>
    <modal-card ref="create-modal">
        <title-text class="show-up mb-2 p-1 pb-2 border-b-2 border-slate-500">
            <GetText :context="Lang.CreateTranslationContext('apps', 'CreateApp')" />
        </title-text>
        <FormCard
            :validate="Lang.CreateTranslationContext('verbs', 'Create')"
            :on-cancel="() => $refs['create-modal'].close()"
            :on-validate="createApp"
            :display-icon="false"
            :borders="false"
        >
            <div class="space-y-4 my-2">
                <InputText
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
            </div>
        </FormCard>
    </modal-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppCard from "../../components/apps/AppCard.vue";
import { animateShows } from '../../scripts/common';
import Lang from '../../scripts/Lang';
import { API } from '../../scripts/API';
import ROUTES from '../../scripts/routes';
import IconHeader from '../../components/cards/IconHeader.vue';
import ButtonBlock from '../../components/inputs/ButtonBlock.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import FormCard from '../../components/cards/FormCard.vue';
import ModalCard from '../../components/cards/ModalCard.vue';
import InputText from '../../components/inputs/InputText.vue';
import TitleText from '../../components/text/TitleText.vue';
import InputArea from '../../components/inputs/InputArea.vue';
import { Log } from '../../scripts/Logs';
import BaseText from '../../components/text/BaseText.vue';
import GetText from '../../components/text/GetText.vue';

async function fetchMyApps() {
    return (await API.RequestLogged(ROUTES.APPS.ME.GET())).data;
}

export default defineComponent({
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
        BaseText,
        GetText
    },
    data() {
        return {
            Lang,
            apps: [] as any[],
            loading: true
        };
    },
    mounted() {
        animateShows(this.$el);
        fetchMyApps().then(res => {
            this.apps = res.apps;
            this.loading = false;
        });
    },
    methods: {
        async createApp(form: any) {
            const text = await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Creating'));
            const log = form.log(text, Log.INFO);
            const body = form.body();

            if (!body.name) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('apps', 'SpecifyName')), Log.WARNING);
                form.focus('name');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            if (!body.description) {
                log.update(await Lang.GetTextAsync(Lang.CreateTranslationContext('apps', 'SpecifyDescription')), Log.WARNING);
                form.focus('description');
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            const res = await API.RequestLogged(ROUTES.APPS.CREATE(body.name, body.description));
            if (res.error) {
                log.error(res);
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            log.update(res.message, Log.SUCCESS);
            this.apps.push(res.data);
            setTimeout(() => {
                log.delete();
                (this.$refs['create-modal'] as any).close();
            }, 2000);
        }
    }
});
</script>