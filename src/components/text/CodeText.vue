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

export default {
    name: "CodeText",
    props: {
        text: {
            type: String,
            default: '',
            required: true
        },
        lang: {
            type: String,
            default: 'javascript',
            required: false
        }
    },
    computed: {
        string() {
            return hljs.highlight(this.lang, this.text).value;
        }
    }
}
</script>