<template>
    <div class="flex flex-col grow">
        <fb-title> Documentation </fb-title>
    </div>
</template>

<script>
import FbTitle from '../components/FbTitle.vue';

function setup(obj) {
    
}

export default {
    name: "Home",
    components: {
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