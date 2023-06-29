<template>
    <p
        v-for="line in text_str.split('\n')"
        :key="line"
        class="text-md md:text-lg font-semibold text-slate-600 dark:text-slate-300 my-1 min-h-[1em]"
    >
        {{ line }}
    </p>
</template>

<script>
import Lang from '../../scripts/Lang';

export default {
    name: "BlockText",
    props: {
        text: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            text_str: ''
        };
    },
    watch: {
        text() { this.fetchTranslations(); }
    },
    mounted() {
        this.fetchTranslations();
    },
    methods: {
        async fetchTranslations() {
            this.text_str = await Lang.GetTextAsync(this.text) ?? '';
        }
    }
}
</script>