<template>
    <component
        :is="borders? 'badge-card' : 'div'"
        class="show-up"
        :hoverable="false"
    >
        <div
            v-show="displayIcon"
            class="flex flex-col mb-4 justify-center items-center"
        >
            <icon-card
                :clickable="false"
                :animate="true"
                class="w-20 h-20"
            />
            <p
                class="show-up text-lg font-semibold text-slate-600 dark:text-slate-200"
                style="animation-delay: 300ms;"
            >
                <GetText :context="title" />
            </p>
        </div>
    
        <div ref="content">
            <slot />
        </div>

        <LogZone ref="LogZone" />
        <span
            class="show-up flex w-full h-1 rounded-lg bg-slate-200 dark:bg-slate-600 my-2"
            style="animation-delay: 200ms;"
        />
        <div
            class="show-up flex w-full mt-2 space-x-4"
            :class="cancel === '' ? 'justify-end' : 'justify-between'"
            style="animation-delay: 300ms;"
        >
            <ButtonText
                v-show="cancel !== ''"
                :onclick="doCancel"
                :color="cancelColor"
            >
                <GetText :context="cancel" />
            </ButtonText>
            <ButtonBlock
                v-show="validate !== ''"
                :disabled="disabled"
                :onclick="doValidate"
            >
                <GetText :context="validate" />
            </ButtonBlock>
        </div>
    </component>
</template>

<script>
import { getTypedValue } from '../../scripts/dom';
import Lang from '../../scripts/Lang';
import BadgeCard from '../cards/BadgeCard.vue';
import IconCard from '../cards/IconCard.vue';
import LogZone from '../cards/LogZone.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import ButtonText from '../inputs/ButtonText.vue';
import GetText from '../text/GetText.vue';

export default {
    name: "FormCard",
    components: {
        BadgeCard,
        IconCard,
        ButtonText,
        ButtonBlock,
        LogZone,
        GetText
    },
    props: {
        title: {
            type: [Object, String],
            required: false,
            default: () => ""
        },
        validate: {
            type: [Object, String],
            default: () => Lang.CreateTranslationContext('verbs', 'Validate')
        },
        cancel: {
            type: [Object, String],
            default: () => Lang.CreateTranslationContext('verbs', 'Cancel')
        },
        cancelColor: {
            type: String,
            default: 'slate'
        },
        onValidate: {
            type: Function,
            default: () => {}
        },
        onCancel: {
            type: Function,
            default: (modal) => { modal.$router.go(-1); }
        },
        displayIcon: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        borders: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data() {
        return {
            lang: Lang.CurrentLang,
            title_str: '',
            validate_str: '',
            cancel_str: ''
        };
    },
    watch: {
        title() { this.fetchTranslations(); },
        validate() { this.fetchTranslations(); },
        cancel() { this.fetchTranslations(); }
    },
    mounted() {
        this.fetchTranslations();

        this.log = (msg, type) => {
            const logZone = this.$refs['LogZone'];
            const log = logZone.log(msg, type);
            return log;
        }

        this.$el.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                this.doValidate(null, ev);
                ev.preventDefault();
            }
        });
    },
    methods: {
        doValidate(btn, ev) {
            if (this.onValidate) this.onValidate(this, ev);
        },
        doCancel(btn, ev) {
            if (this.onCancel) this.onCancel(this, ev);
        },
        body() {
            const body = {};
            const content = this.$refs['content'];
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
        focus(inputName) {
            const content = this.$refs['content'];
            const tags = ['input', 'select', 'textarea'];
            const inputs = content.querySelectorAll(tags.join(','));
            const input = Array.from(inputs).find(i => i.name === inputName);
            if (input) input.focus();
        },
        async fetchTranslations() {
            this.title_str = await Lang.GetTextAsync(this.title);
            this.validate_str = await Lang.GetTextAsync(this.validate);
            this.cancel_str = await Lang.GetTextAsync(this.cancel);
        }
    }
}
</script>