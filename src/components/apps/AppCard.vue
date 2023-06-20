<template>
    <badge-card
        class="md:p-4 p-2 space-y-4 min-h-0 h-fit w-fit"
    >
        <div class="flex flex-col justify-center items-center space-y-4">
            <title-text>
                {{ app.name }}
            </title-text>
            <base-text>
                {{ app.description }}
            </base-text>
        </div>
        <div class="flex grow justify-end w-full" />
        <div class="flex justify-end w-full">
            <input-text
                orientation="col"
                type="password"
                name="key-app"
                :value="app.key"
                :show-copy="true"
                :label="lang.AppKey()"
            />
        </div>
        <log-zone ref="log-zone" />
        <div class="flex justify-between w-full">
            <div>
                <button-block
                    color="red"
                    :onclick="() => $refs['delete-modal'].open()"
                >
                    {{ lang.Delete() }}
                </button-block>
            </div>
            <button-block>
                {{ lang.Edit() }}
            </button-block>
        </div>
        <modal-card ref="delete-modal">
            <confirm-form
                color="red"
                :title="lang.DeleteApp()"
                :description="lang.DeleteAppConfirm()"
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
        ConfirmForm
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
            lang: Lang.CurrentLang
        };
    },
    mounted() {
        
    },
    methods: {
        deleteApp(modal) {
            const log = modal.log(Lang.CurrentLang.Deleting(), Log.INFO);
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
        }
    }
}
</script>