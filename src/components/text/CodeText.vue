<template>
    <div class="border-2 border-slate-300 dark:border-slate-900 rounded-lg bg-slate-200 dark:bg-slate-800 p-2 overflow-auto mb-6">
        <pre
            class="text-md md:text-lg font-semibold text-slate-600 dark:text-slate-300 my-1 min-h-[1em]"
            v-html="string"
        />
    </div>
</template>

<script>
import hljs from 'highlight.js/lib/common';
import Lang from '../../scripts/Lang';

export default {
    name: "CodeText",
    props: {
        text: {
            type: Object,
            default: () => null,
            required: true
        },
        lang: {
            type: String,
            default: 'javascript',
            required: false
        }
    },
    data() {
        return {
            text_str: '',
            string: ''
        };
    },
    watch: {
        text() { this.fetchTranslations(); },
    },
    mounted() {
        this.fetchTranslations();
    },
    methods: {
        async fetchTranslations() {
            this.text_str = (typeof(this.text) === 'string') ? this.text : await Lang.GetTextAsync(this.text) ?? '';
            this.createCodeString();
        },
        createCodeString() {
            this.string = hljs.highlight(this.lang, this.text_str).value;
        }
    }
}
</script>