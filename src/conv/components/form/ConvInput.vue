<template>
    <div class="flex flex-col md:flex-row justify-between">
        <input
            class="py-1 px-2 bg-transparent text-teal-500 text-xl font-semibold outline-none
                   border-2 border-teal-50/[0.2] rounded-md hover:border-teal-500/[0.5] focus:border-teal-500 transition-all box-border w-full"
            :type="type"
            :name="name"
            :placeholder="placeholder"
        >
    </div>
</template>

<script>
export default {
    name: "ConvInput",
    components: {},
    methods: {},
    props: {
        label: {
            type: String,
            required: false,
            default: ""
        },
        placeholder: {
            type: String,
            required: false,
            default: ""
        },
        type: {
            type: String,
            required: false,
            default: "text"
        },
        name: {
            type: String,
            required: false,
            default: ""
        }
    },
    data() { return {}; },
    setup() {},
    mounted() {}
}
</script>