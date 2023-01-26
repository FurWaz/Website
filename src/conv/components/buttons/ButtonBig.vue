<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
        class="flex border-2 border-teal-500 rounded-md px-4 py-2 transition-all"
        :class="this.disabled? ' text-teal-200 bg-teal-400 cursor-default' : ' text-teal-500 bg-transparent hover:border-teal-500 hover:text-teal-50 hover:bg-teal-500 hover:shadow-xl hover:-translate-y-[2px] cursor-pointer'"
        v-on:click="callback(this)">
        <p ref="text" class="mx-4 my-1 text-lg font-bold whitespace-nowrap">
            <slot></slot>
        </p>
    </button>
</template>

<script>


export default {
    name: "ButtonBig",
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