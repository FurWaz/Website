<template>
    <a
        :href="href"
        class="flex cursor-pointer rounded-lg border-2 border-blue-50 hover:border-blue-100 hover:translate-x-1 hover:shadow-md transition-all"
    >
        <div class="flex flex-col justify-center pl-1 pr-2">
            <component :is="icon" class="flex-shrink-0 h-6 w-6" aria-hidden="true" />
        </div>
        <div class="flex flex-col justify-center w-fit max-w-[300px] h-fit p-1">
            <p class="text-blue-500 text-lg font-bold whitespace-nowrap text-ellipsis overflow-hidden"> {{ name }} </p>
            <p class="text-blue-400 font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-full"> {{ desc }} </p>
        </div>
    </a>
</template>

<script>
import { EllipsisVerticalIcon } from "@heroicons/vue/24/solid";

export default {
    name: "TopButton",
    methods: {},
    components: {
        
    },
    props: {
        name: {
            type: String,
            default: undefined,
            required: true
        },
        desc: {
            type: String,
            default: undefined,
            required: true
        },
        icon: {
            default: EllipsisVerticalIcon,
            required: false
        },
        href: {
            type: String,
            default: undefined,
            required: false
        }
    },
    setup() {},
    data() { return {}; },
    mounted() {
        
    }
}
</script>