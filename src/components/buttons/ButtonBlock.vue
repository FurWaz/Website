<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
        class="blkbtn-1 flex cursor-pointer border border-2 border-white/[0.1] rounded-md shadow-md hover:bg-white/[0.1] hover:border-white/[0.2] transition-all"
        v-on:click="callback(this)">
        <p ref="text" class="mx-4 my-2 text-white text-md font-bold whitespace-nowrap">
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
.blkbtn-1 > p {
    @apply translate-y-0 transition-all
}
.blkbtn-1:hover > p {
    @apply -translate-y-[2px] transition-all
}
</style>