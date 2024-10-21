<template>
    <badge-card
        class="min-h-0 min-w-0 h-fit w-fit max-h-full max-w-full p-4"
        :hoverable="false"
    >
        <div v-if="app === undefined">
            <LoadingIcon class="m-4" />
        </div>
        <div v-else-if="app === null">
            error
        </div>
        <div v-else class="show-up">
            <!-- VIEW MODE ZONE -->
            <div
                v-if="mode === 'view'"
                class="flex flex-col justify-center items-center min-h-0 w-min min-w-[16em]"
            >
                <div class="flex-col space-y-4 w-fit h-fit">
                    <div class="flex items-center space-x-2">
                        <div class="dark:bg-slate-800 rounded-lg p-1">
                            <Squares2X2Icon
                                class="w-8 h-8"
                            />
                        </div>
                        <div class="flex justify-center items-center space-x-2">
                            <TitleText>
                                {{ app.name }}
                            </TitleText>
                            <div
                                id="app-check"
                            >
                                <check-badge-icon
                                    class="w-6 h-6"
                                    :class="app.verified? 'text-green-500': 'text-slate-400'"
                                />
                            </div>
                            <NameCard
                                :value="Lang.CreateTranslationContext('portal', 'AppVerified')"
                                target="#app-check"
                            />
                        </div>
                    </div>
                    <base-text class="overflow-hidden text-ellipsis">
                        {{ app.description }}
                    </base-text>
                    <base-text
                        v-if="app.authorId !== user?.id || !canEdit"
                        class="flex space-x-1 w-full text-sm"
                    >
                        <GetText :context="Lang.CreateTranslationContext('portal', 'CreatedBy')" />
                        <span class="font-bold">{{ app.author?.pseudo || '...' }}</span>
                    </base-text>
                    <InputText
                        v-if="app.key && !viewOnly"
                        type="password"
                        name="key-app"
                        :value="app.key"
                        :show-copy="true"
                        :label="Lang.CreateTranslationContext('apps', 'AppKey')"
                    />
                </div>
                <div
                    v-if="canEdit"
                    class="flex flex-col w-full"
                >
                    <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-full my-4" />
                    <div class="flex justify-between w-full space-x-4">
                        <ButtonBlock
                            color="red"
                            :onclick="() => $refs['delete-modal'].open()"
                        >
                            <GetText :context="Lang.CreateTranslationContext('verbs', 'Delete')" />
                        </ButtonBlock>
                        <ButtonBlock :onclick="() => mode = 'edit'">
                            <GetText :context="Lang.CreateTranslationContext('verbs', 'Edit')" />
                        </ButtonBlock>
                    </div>
                </div>
            </div>

            <!-- EDIT MODE ZONE -->
            <div
                v-else
                class="flex flex-col justify-center items-center min-h-0 w-full"
            >
                <InputText
                    ref="input-name"
                    class="w-full"
                    orientation="col"
                    :value="app.name"
                    :label="Lang.CreateTranslationContext('apps', 'AppName')"
                />
                <input-area
                    v-if="mode === 'edit'"
                    ref="input-description"
                    class="w-full"
                    :value="app.description"
                    :label="Lang.CreateTranslationContext('apps', 'AppDescription')"
                />
                <LogZone ref="LogZone" />
                <span class="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-full my-4" />
                <div class="flex justify-between w-full space-x-4">
                    <ButtonText :onclick="() => mode = 'view'">
                        <GetText :context="Lang.CreateTranslationContext('verbs', 'Cancel')" />
                    </ButtonText>
                    <ButtonBlock :onclick="updateApp">
                        <GetText :context="Lang.CreateTranslationContext('verbs', 'Validate')" />
                    </ButtonBlock>
                </div>
            </div>
        </div>
    </badge-card>
    <modal-card ref="delete-modal">
        <confirm-form
            color="red"
            :title="Lang.CreateTranslationContext('apps', 'DeleteApp')"
            :description="Lang.CreateTranslationContext('apps', 'DeleteAppConfirm')"
            :on-cancel="() => $refs['delete-modal'].close()"
            :on-confirm="deleteApp"
        />
    </modal-card>
</template>

<script>
import BadgeCard from "../cards/BadgeCard.vue";
import BaseText from '../text/BaseText.vue';
import TitleText from '../text/TitleText.vue';
import InputText from '../inputs/InputText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import ModalCard from '../cards/ModalCard.vue';
import ConfirmForm from '../cards/ConfirmForm.vue';
import ButtonText from '../inputs/ButtonText.vue';
import InputArea from '../inputs/InputArea.vue';
import NameCard from "../cards/NameCard.vue";
import LoadingIcon from '../cards/LoadingIcon.vue';
import LogZone from '../cards/LogZone.vue';
import GetText from '../text/GetText.vue';
import { Log } from '../../scripts/Logs';
import { API } from '../../scripts/API';
import ROUTES from '../../scripts/routes';
import Lang from '../../scripts/Lang';
import User from "@/scripts/User";

import {
    CheckBadgeIcon,
    Squares2X2Icon
} from '@heroicons/vue/24/outline';
import App from "@/scripts/Models/App";

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
        InputArea,
        LoadingIcon,
        CheckBadgeIcon,
        Squares2X2Icon,
        NameCard
    },
    props: {
        id: {
            type: Number
        },
        onDelete: {
            type: Function,
            required: false,
            default: () => {}
        },
        viewOnly: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            mode: 'view',
            app: undefined
        };
    },
    mounted() {
        if (this.id) this.fetchApp();
    },
    watch: {
        id() {
            this.fetchApp();
        }
    },
    computed: {
        canEdit() {
            return this.app && this.app.key && !this.viewOnly;
        }
    },
    methods: {
        async fetchApp() {
            if (!this.id) return this.app = null;
            const app = await App.FromId(this.id);
            app.onUpdate(() => this.app = app.toJSON());
            this.app = app.toJSON();
        },
        async deleteApp(modal) {
            const text = await Lang.GetTextAsync(Lang.CreateTranslationContext("verbs", "Deleting"));
            const log = modal.log(text, Log.INFO);

            const res = await API.RequestLogged(ROUTES.APPS.DELETE(this.id));
            if (res.error) {
                log.update(res.message, Log.ERROR);
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            log.update(res.message, Log.SUCCESS);
            setTimeout(() => {
                log.delete();
                this.$refs["delete-modal"].close();
                this.onDelete?.();
            }, 2000);
        },
        async updateApp() {
            const description = this.$refs['input-description'].getValue();
            const name = this.$refs['input-name'].value;

            if (description === this.app.description && name === this.app.name) {
                this.mode = 'view';
                return;
            }
            
            const LogZone = this.$refs['LogZone'];
            const text = await Lang.GetTextAsync(Lang.CreateTranslationContext("verbs", "Updating"));
            const log = LogZone.log(text, Log.INFO);

            const res = await API.RequestLogged(ROUTES.APPS.UPDATE(this.id, name, description));
            if (res.error) {
                log.error(res);
                setTimeout(() => { log.delete(); }, 4000);
                return;
            }

            this.app.description = res.data.description;
            this.app.name = res.data.name;
            log.update(res.message, Log.SUCCESS);
            setTimeout(() => {
                log.delete();
                setTimeout(() => { this.mode = 'view'; }, 500);
            }, 1000);
        }
    }
}
</script>