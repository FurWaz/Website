<template>
    <div class="flex w-screen h-screen bg-slate-700">
        <topbar></topbar>
        <div class="flex flex-col grow pt-20">
            <fb-title> Documentation </fb-title>
        </div>
    </div>
</template>

<script>
import Topbar from '../../components/Topbar.vue';
import FbTitle from '../components/FbTitle.vue';

function setup(obj) {
    
}

export default {
    name: "Home",
    components: {
        Topbar,
        FbTitle
    },
    methods: {},
    data() { return {}; },
    setup() {},
    mounted() {
        setup(this);
    }
};
</script>

<style>

</style>