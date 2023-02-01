<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <a
        :href="href==''? null : href" target="_blank"
        class="flex border-2 dark:border-slate-600 border-slate-400 rounded-md transition-all min-w-0 max-w-full"
        v-on:click="callback($event)"
        :class="this.disabled? ' text-slate-400 cursor-default' : ' dark:text-slate-300 text-slate-500 shadow hover:dark:bg-slate-600 hover:bg-slate-300 hover:dark:border-orange-500 hover:border-orange-500 hover:dark:text-slate-200 hover:text-slate-700 hover:shadow-lg cursor-pointer'">
        <p ref="text" class="mx-4 my-2 text-md font-bold whitespace-nowrap text-ellipsis overflow-hidden">
            <slot></slot>
        </p>
    </a>
</template>

<script>
export default {
    name: "ButtonBlock",
    props: {
        href: {
            type: String,
            default: "",
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
    mounted() {
        
    },
    methods: {
        callback(ev) {
            if (this.disabled) return;

            if (this.href !== "") {
                if (this.href.startsWith("http")) {
                    window.open(this.href, "_blank");
                } else {
                    this.$router.push(this.href).then(() => {
                        window.app.sidebar.update();
                    });
                }
            } else if (this.action) {
                this.action(this);
            }
            ev?.preventDefault();
        }
    }
};
</script>

<style scoped>

</style>