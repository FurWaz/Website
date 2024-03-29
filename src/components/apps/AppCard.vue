<template>
    <badge-card
        class="md:p-4 p-2 space-y-4 min-h-0 min-h-0 min-w-0 h-fit w-fit max-h-full max-w-full"
    >
        <div class="flex flex-col justify-center items-center space-y-4 min-h-0 w-full">
            <title-text v-if="mode === 'view'">
                {{ app.name }}
            </title-text>
            <input-text
                v-if="mode === 'edit'"
                ref="input-name"
                :value="app.name"
            />
            <base-text
                v-if="mode === 'view'"
                class="text-center overflow-hidden text-ellipsis"
            >
                {{ app.description }}
            </base-text>
            <input-area
                v-if="mode === 'edit'"
                ref="input-description"
                class="w-full"
                :value="app.description"
            />
        </div>
        <div class="flex grow justify-end w-full" />
        <div class="flex justify-end w-full">
            <input-text
                orientation="col"
                type="password"
                name="key-app"
                :value="app.key"
                :show-copy="true"
                :label="Lang.CreateTranslationContext('apps', 'AppKey')"
            />
        </div>
        <log-zone ref="log-zone" />
        <div
            v-if="mode === 'view'"
            class="flex justify-between w-full"
        >
            <div>
                <button-block
                    color="red"
                    :onclick="() => $refs['delete-modal'].open()"
                >
                    <get-text :context="Lang.CreateTranslationContext('verbs', 'Delete')" />
                </button-block>
            </div>
            <button-block :onclick="() => mode = 'edit'">
                <get-text :context="Lang.CreateTranslationContext('verbs', 'Edit')" />
            </button-block>
        </div>
        <div
            v-if="mode === 'edit'"
            class="flex justify-between w-full"
        >
            <div>
                <button-text
                    :onclick="() => mode = 'view'"
                >
                    <get-text :context="Lang.CreateTranslationContext('verbs', 'Cancel')" />
                </button-text>
            </div>
            <button-block :onclick="uploadModifications">
                <get-text :context="Lang.CreateTranslationContext('verbs', 'Validate')" />
            </button-block>
        </div>
        <modal-card ref="delete-modal">
            <confirm-form
                color="red"
                :title="Lang.CreateTranslationContext('apps', 'DeleteApp')"
                :description="Lang.CreateTranslationContext('apps', 'DeleteAppConfirm')"
                :on-cancel="() => $refs['delete-modal'].close()"
                :on-confirm="deleteApp"
            />
        </modal-card>
    </badge-card>
</template>

<script>
import BadgeCard from "../cards/BadgeCard.vue";
import BaseText from '../text/BaseText.vue';
import TitleText from '../text/TitleText.vue';
import Lang from '../../scripts/Lang';
import InputText from '../inputs/InputText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import LogZone from '../cards/LogZone.vue';
import ModalCard from '../cards/ModalCard.vue';
import ConfirmForm from '../cards/ConfirmForm.vue';
import { Log } from '../../scripts/Logs';
import API from '../../scripts/API';
import GetText from '../text/GetText.vue';
import ButtonText from '../inputs/ButtonText.vue';
import InputArea from '../inputs/InputArea.vue';

export default {
    name: "AppCard",
    components: {
        BadgeCard,
        TitleText,
        BaseText,
        InputText,
        ButtonBlock,
        LogZone,
        ModalCard,
        ConfirmForm,
        GetText,
        ButtonText,
        InputArea
    },
    props: {
        app: {
            type: Object,
            required: true
        },
        onDelete: {
            type: Function,
            required: false,
            default: () => {}
        }
    },
    data() {
        return {
            Lang,
            mode: 'view'
        };
    },
    mounted() {
        
    },
    methods: {
        deleteApp(modal) {
            const log = modal.log("", Log.INFO);
            Lang.GetText(Lang.CreateTranslationContext("verbs", "Deleting"), text => {
                log.update(text);
            });
            API.execute_logged(API.ROUTE.APPS(this.app.id), API.METHOD.DELETE).then(res => {
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => {
                    log.delete();
                    this.$refs["delete-modal"].close();
                    this.onDelete?.();
                }, 2000);
            }).catch(err => {
                log.error(err);
                setTimeout(() => { log.delete(); }, 4000);
            });
        },
        uploadModifications() {
            const description = this.$refs['input-description'].getValue();
            const name = this.$refs['input-name'].value;

            if (description === this.app.description && name === this.app.name) {
                this.mode = 'view';
                return;
            }

            API.execute_logged(API.ROUTE.APPS(this.app.id), API.METHOD.PATCH, {
                description,
                name
            }).then(res => {
                this.mode = 'view';
                // eslint-disable-next-line vue/no-mutating-props
                this.app.description = res.data.app.description;
                // eslint-disable-next-line vue/no-mutating-props
                this.app.name = res.data.app.name;
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>