<template>
    <div class="flex flex-col">
        <div class="flex flex-col">
            <title-text>
                <get-text :context="title" />
            </title-text>
            <base-text
                v-for="line in description_str.split('\n')"
                :key="line"
            >
                {{ line }}
            </base-text>
        </div>
        <log-zone
            ref="log-zone"
            class="my-2"
        />
        <div class="flex justify-between w-full space-x-4">
            <button-text
                :onclick="callOnCancel"
            >
                <get-text :context="cancel" />
            </button-text>
            <button-block
                :color="color"
                :onclick="callOnConfirm"
            >
                <get-text :context="confirm" />
            </button-block>
        </div>
    </div>
</template>

<script>
import ButtonText from '../inputs/ButtonText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import Lang from '../../scripts/Lang';
import TitleText from '../text/TitleText.vue';
import BaseText from '../text/BaseText.vue';
import LogZone from './LogZone.vue';
import GetText from '../text/GetText.vue';

export default {
    name: 'ConfirmForm',
    components: {
        ButtonText,
        ButtonBlock,
        BaseText,
        TitleText,
        LogZone,
        GetText
    },
    props: {
        title: {
            type: Object,
            default: () => null,
            required: false
        },
        description: {
            type: Object,
            default: () => null,
            required: false
        },
        confirm: {
            type: Object,
            default: Lang.CreateTranslationContext('verbs', 'Confirm'),
            required: false
        },
        cancel: {
            type: Object,
            default: Lang.CreateTranslationContext('verbs', 'Cancel'),
            required: false
        },
        onConfirm: {
            type: Function,
            default: () => {},
            required: false
        },
        onCancel: {
            type: Function,
            default: () => {},
            required: false
        },
        color: {
            type: String,
            default: undefined,
            required: false
        }
    },
    data() {
        return {
            description_str: ''
        };
    },
    watch: {
        description() { this.fetchTranslations(); }
    },
    mounted() {
        this.fetchTranslations();
    },
    methods: {
        callOnCancel() {
            this.onCancel?.(this.getModal());
        },
        callOnConfirm() {
            this.onConfirm?.(this.getModal());
        },
        getModal() {
            return {
                log: this.$refs['log-zone'].log
            };
        },
        async fetchTranslations() {
            this.description_str = await Lang.GetTextAsync(this.description) ?? '';
        }
    }
}
</script>