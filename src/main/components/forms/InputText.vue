<template>
    <div class="flex md:flex-row flex-col justify-between w-full h-fit md:space-x-4">
        <p class="dark:text-slate-50 text-slate-600 text-lg font-semibold"> {{ this.label }} : </p>
        <input
            :type="this.type" :name="this._name" :value="this.value"
            class="border-2 px-1 font-semibold rounded bg-transparent outline-none transition-all"
            :class="this.disabled? 'border-slate-600 dark:text-slate-300 text-slate-600' : 'border-slate-400 dark:text-slate-50 text-slate-700 focus:border-orange-500'"
            :disabled="this.disabled"
        >
    </div>
</template>

<script>
export default {
    name: "InputText",
    props: {
        label: {
            type: String,
            default: "Input",
            required: true
        },
        onchange: {
            type: Function,
            default: undefined,
            required: false
        },
        type: {
            type: String,
            default: "text",
            required: false
        },
        name: {
            type: String,
            default: "",
            required: false
        },
        value: {
            type: String,
            default: "",
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    methods: {},
    data() {
        if (!this.name)
            this._name = this.label.toLowerCase().replace(" ", "-");
        else this._name = this.name;
        return {};
    },
    setup() {},
    mounted() {
        this.$el.querySelector("input").addEventListener("change", ev => {
            if (this.onchange) this.onchange(ev);
        });
    }
};
</script>