<template>
    <button
        class="flex border-2 border-teal-50/[0.5] rounded-md transition-all"
        :class="this.disabled? ' text-teal-50 cursor-default' : ' text-teal-500 hover:bg-teal-500 hover:border-teal-500 hover:text-teal-50 hover:shadow-xl cursor-pointer'"
        v-on:click="callback(this)">
        <p ref="text" class="mx-4 my-1 text-lg font-bold whitespace-nowrap">
            <slot></slot>
        </p>
    </button>
</template>

<script>


export default {
    name: "ButtonBlock",
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