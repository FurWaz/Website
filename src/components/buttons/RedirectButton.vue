<template>
    <!-- Template Back Button : Used to go bakc in the website -->
    <button
       style="transition: background ease 0.1s;"
       class="h-fit cursor-pointer whitespace-nowrap flex justify-center px-4 py-2 border rounded-md shadow-md text-black bg-black/[0] hover:bg-black/[0.1]"
       v-on:click="redirectTo(href)">
        <slot></slot>
    </button>
</template>

<script>
import { redirectTo } from "../../script/common.js";

export default {
    name: "RedirectButton",
    props: {
        href: {
            type: String,
            required: true
        }
    },
    setup() {

    },
    methods: {
        redirectTo
    }
};
</script>
