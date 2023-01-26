<template>
    <div class="flex grow">
        <div class="flex flex-col grow pt-10 min-w-0">
            <div class="flex w-full h-fit justify-center">
                <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                    <h1 class="show-down text-slate-200 text-4xl font-bold mb-1"> About </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {
        
    },
    methods: {},
    data() { return {}; },
    setup() {},
    mounted() {}
};
</script>

<style>
@keyframes jump {
    0%, 100% {
        transform: translateX(0px);
    }
    10% {
        transform: translateX(5px);
    }
}

.jump { animation: jump 8s infinite cubic-bezier(0.5, 0, 0, 0.5); }
</style>