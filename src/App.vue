<template>
    <div class="flex grow bg-slate-200 dark:bg-slate-700">        
        <TopBar />
        <div
            id="page-content"
            ref="content"
            class="flex grow overflow-x-hidden overflow-y-auto md:pt-20 pt-16"
        >
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "./components/TopBar.vue";
import { RouterView } from "vue-router";
import { API } from "./scripts/API";
import ROUTES from "./scripts/routes";
import User from "./scripts/User";

export default defineComponent({
    components: {
        TopBar,
        RouterView
    },
    data() {
        return {
            lastScroll: 0
        }
    },
    setup() {
        API.Setup(import.meta.env.VITE_API_URL);
    },
    mounted() {
        // scroll events for topbar show/hide
        const content = this.$refs.content as HTMLElement|null;
        if (!content) return;

        content.addEventListener("scroll", () => {
            const deltaY = content.scrollTop - this.lastScroll;
            this.lastScroll = content.scrollTop;
            (window as any).deltaY = deltaY;
            
            // not mobile, don't trigger fake events
            if (window.innerWidth >= 768) return;

            window.dispatchEvent(new Event("wheel"));
        });

        // Verify that user is connected and valid
        // (if not, it will automatically disconnect him)
        if (User.CurrentUser) {
            API.RequestLogged(ROUTES.USERS.ME.GET()).then(res => {
                User.CurrentUser?.setInformations(res.data);
                User.CurrentUser?.save();
            });
        }
    }
});
</script>

<style>
</style>