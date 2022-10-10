<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
        class="flex border-2 border-slate-600 rounded-md transition-all"
        :class="this.disabled? ' text-slate-400 cursor-default' : ' text-slate-300 shadow hover:bg-slate-600 hover:border-blue-500 hover:text-slate-200 hover:shadow-lg cursor-pointer'"
        v-on:click="callback(this)">
        <p ref="text" class="mx-4 my-2 text-md font-bold whitespace-nowrap">
            <slot></slot>
        </p>
    </button>
</template>

<script>
import { redirectTo } from "../../scripts/common.js";

export default {
    name: "RedirectButton",
    props: {
        href: {
            type: String,
            default: undefined,
            required: false
        },
        action: {
            type: Function,
            default: undefined,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    setup() {},
    data() {
        this.setText = text => {
            this.$refs.text.innerText = text;
        };
        this.getText = () => {
            return this.$refs.text.innerText;
        };
        return {};
    },
    methods: {
        callback() {
            if (this.disabled) return;

            if (this.href) {
                redirectTo(this.href);
            } else if (this.action) {
                this.action(this);
            }
        }
    }
};
</script>

<style scoped>

</style>