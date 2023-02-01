<template>
    <div class="flex flex-col grow py-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.About }} </page-title>
    </div>
</template>

<script>
import PageTitle from '../components/labels/PageTitle.vue';
import Lang from '../scripts/Lang';

export default {
    name: "Home",
    components: {
        PageTitle
    },
    methods: {},
    data() { return { Lang }; },
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