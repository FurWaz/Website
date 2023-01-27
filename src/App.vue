<template>
    <div class="flex md:flex-row flex-col grow min-w-0 min-h-0 dark:bg-slate-800 bg-slate-50 overflow-hidden">
        <sidebar style="z-index: 1;"></sidebar>
        <router-view class="overflow-y-scroll"></router-view>
    </div>
</template>

<script>
import Sidebar from './main/components/sidebar/Sidebar.vue'

export default {
    name: "App",
    components: {
        Sidebar
    },
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
};
</script>

<style>
</style>