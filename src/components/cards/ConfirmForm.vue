<template>
    <div class="flex flex-col">
        <div class="flex flex-col">
            <title-text>
                {{ title }}
            </title-text>
            <base-text
                v-for="line in description.split('\n')"
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
                {{ cancel }}
            </button-text>
            <button-block
                :color="color"
                :onclick="callOnConfirm"
            >
                {{ confirm }}
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

export default {
    name: 'ConfirmForm',
    components: {
        ButtonText,
        ButtonBlock,
        BaseText,
        TitleText,
        LogZone
    },
    props: {
        title: {
            type: String,
            default: '',
            required: false
        },
        description: {
            type: String,
            default: '',
            required: false
        },
        confirm: {
            type: String,
            default: Lang.CurrentLang.Confirm(),
            required: false
        },
        cancel: {
            type: String,
            default: Lang.CurrentLang.Cancel(),
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
            
        };
    },
    mounted() {
        
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
        }
    }
}
</script>