<template>
    <div class="flex flex-col">
        <div class="flex flex-col">
            <title-text class="mb-4">
                <GetText :context="title" />
            </title-text>
            <base-text
                v-for="line in description_str.split('\n')"
                :key="line"
            >
                {{ line }}
            </base-text>
        </div>
        <div
            ref="content"
            class="flex flex-col mx-auto my-4"
        >
            <slot />
        </div>
        <LogZone
            ref="LogZone"
            class="my-2"
        />
        <div class="flex justify-between w-full space-x-4">
            <ButtonText
                :onclick="callOnCancel"
            >
                <GetText :context="cancel" />
            </ButtonText>
            <ButtonBlock
                :color="color"
                :onclick="callOnConfirm"
            >
                <GetText :context="confirm" />
            </ButtonBlock>
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
import { getTypedValue } from '../../scripts/dom';

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
            const form = this;
            return {
                log: form.$refs['LogZone'].log,
                body() {
                    const body = {};
                    const content = form.$refs['content'];
                    const inputs = content.querySelectorAll('input');
                    const selects = content.querySelectorAll('select');
                    const textareas = content.querySelectorAll('textarea');
                    const checkboxes = content.querySelectorAll('input[type="checkbox"]');
                    const radios = content.querySelectorAll('input[type="radio"]');
                    const files = content.querySelectorAll('input[type="file"]');

                    inputs.forEach(input => { body[input.name] = getTypedValue(input.value); });
                    selects.forEach(select => { body[select.name] = getTypedValue(select.value); });
                    textareas.forEach(textarea => { body[textarea.name] = getTypedValue(textarea.value); });
                    checkboxes.forEach(checkbox => { body[checkbox.name] = getTypedValue(checkbox.checked); });
                    radios.forEach(radio => { if (radio.checked) body[radio.name] = getTypedValue(radio.value); });
                    files.forEach(file => { body[file.name] = getTypedValue(file.files); });

                    return body;
                },
            };
        },
        async fetchTranslations() {
            this.description_str = await Lang.GetTextAsync(this.description) ?? '';
        }
    }
}
</script>