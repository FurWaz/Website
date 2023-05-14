<template>
    <div class="flex flex-col grow min-w-0 min-h-0 dark:bg-slate-700 bg-slate-50 overflow-hidden">        
        <top-bar />
        <div
            id="page-content"
            ref="content"
            class="flex grow max-w-full max-h-full overflow-x-hidden overflow-y-auto md:pt-20 pt-14"
        >
            <router-view />
        </div>
    </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";

export default {
    name: "App",
    components: {
        TopBar
    },
    data() {
        return {lastScroll: 0}
    },
    mounted() {
        let theme = localStorage.getItem('theme');
        if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        this.$refs["content"].addEventListener("scroll", (ev) => {
            const deltaY = ev.target.scrollTop - this.lastScroll;
            this.lastScroll = ev.target.scrollTop;
            window.deltaY = deltaY;
            
            if (window.innerWidth >= 768) return; // not mobile, don't trigger fake events
            window.dispatchEvent(new Event("wheel"));
        });
    }
};
</script>

<style>
</style>