<template>
    <div class="flex flex-col grow h-fit w-full max-w-full min-w-0 justify-between items-center md:my-2 my-1 space-y-1">
        <label
            v-if="label"
            class="flex text-lg text-slate-600 dark:text-slate-300 font-bold whitespace-nowrap text-ellipsis w-fit mr-auto"
        >
            <GetText :context="label" />
        </label>
        <div class="flex max-w-full min-w-0 h-fit">
            <input
                ref="input"
                class="flex h-fit border-2 rounded-md px-2 py-1 border-slate-300 dark:border-slate-600 font-bold text-md whitespace-nowrap max-w-full
                    min-w-0 w-full text-ellipsis transition-colors outline-2 outline-offset-2 outline-orange-500 focus:outline placeholder-slate-400"
                :class="additionnalClasses"
                :placeholder="placeholder_str"
                :type="type"
                :name="name"
                :value="value_str"
                :min="min"
                :max="max"
                :disabled="disabled"
            >
            <button
                v-if="showCopy"
                class="bg-slate-200 dark:bg-slate-600 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-500 rounded-lg rounded-l-none transition-colors outline-none outline-offset-2 focus:outline-orange-500"
                @click="copy"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :viewBox="showCopyCheck ? '0 0 384 512' : '0 0 448 512'"
                    class="text-slate-600 dark:text-slate-200 w-8 px-2"
                    fill="currentColor"
                >
                    <path
                        v-show="!showCopyCheck"
                        d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                    />
                    <path
                        v-show="showCopyCheck"
                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import Lang from '../../scripts/Lang';
import GetText from '../text/GetText.vue';

export default {
    name: 'InputText',
    components: { GetText },
    props: {
        label: {
            type: Object,
            default: () => null,
            required: false
        },
        placeholder: {
            type: Object,
            default: () => null,
            required: false
        },
        value: {
            type: [Object, String, Number],
            default: () => null,
            required: false
        },
        name: {
            type: String,
            default: '',
            required: false
        },
        type: {
            type: String,
            default: 'text',
            required: false
        },
        min: {
            type: [Number, String],
            default: "",
            required: false
        },
        max: {
            type: [Number, String],
            default: "",
            required: false
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        },
        showCopy: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    data() {
        return {
            isDisabled: true,
            additionnalClasses:
                (this.disabled ? ' bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-400 ' : ' bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-200 hover:border-slate-400 hover:dark:border-slate-500 ') +
                (this.showCopy ? ' rounded-r-none' : ''),
            showCopyCheck: false,
            placeholder_str: "",
            value_str: ""
        }
    },
    watch: {
        placeholder() { this.fetchPlaceholderTranslations(); },
        value() { this.fetchValueTranslations(); }
    },
    mounted() {
        this.focus = () => this.$refs.input.focus();
        this.getValue = () => this.$refs.input.value;

        this.fetchTranslations();
    },
    methods: {
        copy() {
            this.$refs.input.select();
            navigator.clipboard.writeText(this.$refs.input.value);
            this.showCopyCheck = true;
            setTimeout(() => { this.showCopyCheck = false; }, 1000);
            this.$refs.input.blur();
        },
        async fetchTranslations() {
            await this.fetchPlaceholderTranslations();
            await this.fetchValueTranslations();
        },
        async fetchPlaceholderTranslations() {
            this.placeholder_str = await Lang.GetTextAsync(this.placeholder);
        },
        async fetchValueTranslations() {
            this.value_str = await Lang.GetTextAsync(this.value);
        }
    }
}
</script>

<style scoped>
input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 36px;
    height: 36px;
    @apply rounded-md bg-white dark:bg-slate-600 cursor-pointer transition-all;
}
input[type="checkbox"]:checked {
    @apply bg-orange-500 border-8;
}
</style>