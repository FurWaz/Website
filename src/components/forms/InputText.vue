<template>
    <div class="flex flex-row justify-between w-full h-fit space-x-4">
        <p class="text-white text-lg font-semibold"> {{ this.label }} : </p>
        <input :type="this.type" :name="this._name" class="border-2 text-white px-1 font-semibold rounded bg-transparent">
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
            default: null,
            required: false
        }
    },
    methods: {},
    data() {
        if (this.name == null)
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