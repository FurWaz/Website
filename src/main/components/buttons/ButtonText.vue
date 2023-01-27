<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <a
        :href="href==''? null : href"
        class="setchildblue flex flex-col justify-center cursor-pointer mx-2 text-slate-300 hover:text-slate-200 transition-all"
        v-on:click="callback(this)">
        <p ref="text" class="text-md font-bold whitespace-nowrap">
            <slot></slot>
        </p>
        <span class="txtbtn-2 h-[3px] bg-slate-600 rounded transition-all"></span>
    </a>
</template>

<script>
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
                this.$router.push(this.href).then(() => {
                    window.app.sidebar.update();
                });
            } else if (this.action) {
                this.action(this);
            }
        }
    }
};
</script>

<style scoped>
.setchildblue:hover > .txtbtn-2 {
    @apply bg-blue-500;
}
</style>