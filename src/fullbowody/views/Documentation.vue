<template>
    <div class="flex flex-col grow">
        <fb-title> Documentation </fb-title>
        <p class="show-up text-4xl font-bold text-slate-600 text-center mt-20"> Sorry, the documentation isn't available yet :/</p>
        <button-block class="show-up w-fit mx-auto mt-10" style="animation-delay: 200ms;" :action="goBack"> Go Back </button-block>
    </div>
</template>

<script>
import FbTitle from '../components/FbTitle.vue';
import ButtonBlock from '../../main/components/buttons/ButtonBlock.vue';
import { goBack } from '../../main/scripts/common.js';

function setup(obj) {
    
}

export default {
    name: "Home",
    components: {
        FbTitle,
        ButtonBlock
    },
    methods: { goBack },
    data() { return {}; },
    setup() {},
    mounted() {
        setup(this);
    }
};
</script>

<style>

</style>