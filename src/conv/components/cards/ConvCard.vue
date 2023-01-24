<template>
    <div
        style="animation-delay: 300ms;"
        class="show-down flex bg-teal-500 md:px-8 px-4 md:py-2 py-1 md:rounded-xl rounded-md shadow-xl w-fit h-fit mx-auto space-x-2"
    >
        <div class="flex flex-col justify-center">
            <conv-icon style="animation-delay: 300ms;" class="show-jump md:w-14 w-8 text-blue-50"></conv-icon>
        </div>
        <div class="flex flex-col justify-center">
            <div class="flex justify pb-2">
                <h1 style="animation-delay: 500ms;" class="show-jump text-blue-50 md:text-6xl text-4xl font-extrabold">C</h1>
                <h1 style="animation-delay: 600ms;" class="show-jump text-blue-50 md:text-6xl text-4xl font-extrabold">o</h1>
                <h1 style="animation-delay: 700ms;" class="show-jump text-blue-50 md:text-6xl text-4xl font-extrabold">n</h1>
                <h1 style="animation-delay: 800ms;" class="show-jump text-blue-50 md:text-6xl text-4xl font-extrabold">v</h1>
            </div>
        </div>
    </div>
</template>

<script>
import ConvIcon from '../ConvIcon.vue';

export default {
    name: "QuidCard",
    components: {
        ConvIcon
    },
    methods: {},
    data() { return {}; },
    setup() {},
    mounted() {}
};
</script>