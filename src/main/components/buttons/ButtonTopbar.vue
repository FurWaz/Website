<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
        class="flex flex-col justify-center cursor-pointer mx-2 text-slate-300 hover:text-blue-500 transition-all"
        v-on:click="callback(this)"
    >
        <p ref="text" class="text-lg font-bold whitespace-nowrap">
            <slot></slot>
        </p>
    </button>
</template>

<script>
import { redirectTo } from "../../scripts/common.js";

export default {
    name: "ButtonTopbar",
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
            if (this.href) {
                redirectTo(this.href);
            } else if (this.action) {
                this.action(this);
            }
        }
    }
};
</script>