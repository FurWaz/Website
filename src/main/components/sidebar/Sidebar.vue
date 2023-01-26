<template>
    <div class="flex grow-0 flex-col">
        <div class="flex md:flex-col flex-row md:h-screen w-screen md:w-min h-min bg-slate-700 shadow-lg">
            <sideicon href="/profile" name="Account"></sideicon>
            <div class="md:flex hidden flex-col grow">
                <backbtn></backbtn>
                <sidebtn v-for="el in menu" :href="el.href" :name="el.name" :icon="el.icon"></sidebtn>
            </div>
            <div ref="mobile-btn" class="md:hidden flex grow justify-end pr-4">
                <div class="flex flex-col justify-center transition-all">
                    <bars3-icon class="w-10 text-slate-50"></bars3-icon>
                </div>
            </div>
            <sidebtn bg="slate-800" name="Settings" :icon="Cog6ToothIcon"></sidebtn>
        </div>
        <div ref="mobile-menu" class="md:hidden flex grow-0 bg-slate-700 transition-all overflow-hidden" style="height: 0px;">
            <div class="flex grow flex-wrap justify-center h-fit">
                <sidebtn v-for="el in menu" :href="el.href" :icon="el.icon"></sidebtn>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebtn from './Sidebtn.vue';
import Backbtn from './Backbtn.vue';
import Sideicon from './Sideicon.vue';

import {
    HomeIcon,
    Squares2X2Icon,
    WrenchScrewdriverIcon,
    Cog6ToothIcon,
    InformationCircleIcon,
    Bars3Icon,
} from '@heroicons/vue/24/outline';

const menu = [
    {
        href: "/",
        name: "Home",
        icon: HomeIcon
    },
    {
        href: "/apps",
        name: "Apps",
        icon: Squares2X2Icon
    },
    {
        href: "/projects",
        name: "Projects",
        icon: WrenchScrewdriverIcon
    },
    {
        href: "/about",
        name: "About",
        icon: InformationCircleIcon
    }
];

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
        obj.$refs["mobile-menu"].style.height = "0px";
    };
}

function mounted(obj) {
    const btn = obj.$refs["mobile-btn"];
    const icon = btn.firstElementChild;
    const menu = obj.$refs["mobile-menu"];

    btn.addEventListener("click", ev => {
        if (menu.style.height !== "0px") {
            icon.classList.remove("rotate-90");
            icon.classList.add("rotate-0");
            menu.style.height = "0px";
        } else {
            icon.classList.remove("rotate-0");
            icon.classList.add("rotate-90");
            menu.classList.remove("hidden");
            const height = menu.firstElementChild.getBoundingClientRect().height;
            menu.style.height = height + "px";
        }
    });
}

export default {
    name: "Sidebar",
    methods: {  },
    components: {
        Sidebtn,
        Sideicon,
        Bars3Icon,
        Backbtn,
    },
    data() {
        setup(this);
        return {
            menu,
            Cog6ToothIcon,
        };
    },
    setup() {},
    mounted() {
        mounted(this);
    }
};
</script>