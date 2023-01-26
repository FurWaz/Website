<template>
    <div class="flex flex-col h-screen w-min bg-slate-700 shadow-lg">
        <sideicon href="/account" name="Account"></sideicon>
        <div class="flex grow flex-col space-y-6 mt-10">
            <sidebtn href="/" name="Home" :icon="HomeIcon"></sidebtn>
            <sidebtn href="/apps" name="Apps" :icon="Squares2X2Icon"></sidebtn>
            <sidebtn href="/projects" name="Projects" :icon="WrenchScrewdriverIcon"></sidebtn>
            <sidebtn href="/about" name="About" :icon="InformationCircleIcon"></sidebtn>
        </div>
        <sidebtn bg="slate-800" name="Settings" :icon="Cog6ToothIcon"></sidebtn>
    </div>
</template>

<script>
import Sidebtn from './Sidebtn.vue';
import Sideicon from './Sideicon.vue';

import {
    HomeIcon,
    Squares2X2Icon,
    WrenchScrewdriverIcon,
    Cog6ToothIcon,
    InformationCircleIcon
} from '@heroicons/vue/24/outline';

function setup(obj) {
    if (!window.app) window.app = {};
    window.app.sidebar = obj;

    obj._buttons = [];
    obj.addButton = (btn) => {
        obj._buttons.push(btn);
    };

    obj.update = () => {
        obj._buttons.forEach(btn => {
            btn.update();
        });
    };
}

export default {
    name: "Sidebar",
    methods: {  },
    components: {
        Sidebtn,
        Sideicon
    },
    data() {
        setup(this);
        return {
            HomeIcon,
            Squares2X2Icon,
            WrenchScrewdriverIcon,
            Cog6ToothIcon,
            InformationCircleIcon
        };
    },
    setup() {},
    mounted() {}
};
</script>