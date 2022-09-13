<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
        class="txtbtn-1 flex flex-col justify-center cursor-pointer mx-2"
        v-on:click="callback(this)">
        <p ref="text" class="text-white text-md font-bold whitespace-nowrap">
            <slot></slot>
        </p>
        <span class="txtbtn-2"></span>
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

<style scoped>
.txtbtn-1 > .txtbtn-2 {
    @apply w-0 h-0 bg-white/[0.1] mx-auto transition-all rounded-md;
}
.txtbtn-1:hover > .txtbtn-2 {
    @apply w-full h-1 bg-white/[0.2] mx-auto
}
</style>