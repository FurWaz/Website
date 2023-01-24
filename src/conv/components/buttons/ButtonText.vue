<template>
    <button
        class="flex flex-col justify-center cursor-pointer mx-2 rounded-md px-2 py-1
               border-2 border-transparent hover:text-teal-500 hover:bg-teal-50 hover:border-teal-200 hover:shadow-xl hover:-translate-y-[2px] transition-all"
        :class="color=='white'? ' text-teal-50' : ' text-teal-500'"
        v-on:click="callback(this)">
        <p ref="text" class="text-md font-bold whitespace-nowrap">
            <slot></slot>
        </p>
    </button>
</template>

<script>
import { redirectTo } from "../../scripts/common.js";

export default {
    name: "ButtonText",
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
        color: {
            type: String,
            default: "white",
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