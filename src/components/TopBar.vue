<template>
    <div
        ref="topbar-cont"
        class="fixed left-0 flex grow h-fit w-full md:p-2 p-1 transition-all"
        style="top: 0; z-index: 1000;"
    >
        <div
            ref="topbar"
            class="show-down flex flex-col grow h-fit w-full border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-md transition-all"
        >
            <!-- DESKTOP START -->
            <div
                v-if="!mobile"
                class="md:flex hidden grow ml-1"
            >
                <router-link
                    class="flex w-fit items-center space-x-2"
                    to="/"
                >
                    <icon-card
                        class="h-14 w-14"
                        :clickable="true"
                        :animate="false"
                    />
                    <h1 class="text-xl font-bold text-slate-700 dark:text-white">
                        FurWaz
                    </h1>
                </router-link>
                <div class="flex grow justify-evenly items-center space-x-4 overflow-x-auto px-20">
                    <button-text
                        v-for="item in menu"
                        v-show="item.condition() && item.name !== 'Account'"
                        :key="item.name"
                        :href="item.href"
                        class="m-2 min-w-fit outline-none focus:outline-orange-500 rounded"
                    >
                        {{ lang[item.name]() }}
                    </button-text>
                </div>
                <div class="flex w-fit justify-end items-center space-x-2">
                    <div 
                        v-show="User.CurrentUser !== null"
                        class="flex wrap justify-evenly items-center grow"
                    >
                        <button-block
                            class="m-2"
                            href="/my"
                        >
                            {{ lang.Account() }}
                        </button-block>
                    </div>

                    <div 
                        v-show="User.CurrentUser === null"
                        class="flex wrap justify-evenly items-center grow"
                    >
                        <button-text
                            class="m-2"
                            href="/register"
                        >
                            {{ lang.Register() }}
                        </button-text>
                        <button-block
                            class="m-2"
                            href="/login"
                        >
                            {{ lang.Login() }}
                        </button-block>
                    </div>
                </div>
            </div>
            <!-- DESKTOP END -->
            
            <!-- MOBILE START -->
            <div
                v-if="mobile"
                class="md:hidden flex grow space-x-2 mx-1"
            >
                <router-link
                    class="flex w-fit items-center space-x-2"
                    to="/"
                >
                    <icon-card
                        class="h-12 w-12"
                        :clickable="true"
                        :animate="false"
                    />
                    <h1 class="text-xl font-bold text-slate-700 dark:text-white">
                        FurWaz
                    </h1>
                </router-link>
                <div class="flex grow justify-end items-center">
                    <button
                        class="text-slate-600 dark:text-slate-200 hover:text-slate-700 hover:dark:text-white"
                        @click="toogleMobileMenu();"
                    >
                        <bars-3-icon class="h-6 w-6 mx-2" />
                    </button>
                </div>
            </div>
            <!-- MOBILE END -->
            
            <!-- MOBILE MENU -->
            <div
                v-if="mobile"
                ref="mobile-menu"
                class="md:hidden flex grow space-x-2 transition-all overflow-hidden"
                style="max-height: 0;"
            >
                <div class="flex flex-col grow h-fit mx-2 max-w-full min-w-0">
                    <span class="h-0.5 w-full rounded-lg bg-slate-200 dark:bg-slate-600" />

                    <div class="flex flex-wrap justify-evenly items-center grow py-2 max-w-full min-w-0">
                        <router-link 
                            v-for="item in menu"
                            v-show="item.condition()"
                            :key="item.name"
                            :to="item.href"
                            class="w-[30vw] m-2 outline-none focus:outline-orange-500 rounded"
                        >
                            <badge-card class="py-1 px-2">
                                <component
                                    :is="item.icon"
                                    class="h-7 w-7"
                                />
                                <span class="text-md font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-full">
                                    {{ lang[item.name]() }}
                                </span>
                            </badge-card>
                        </router-link>
                    </div>

                    <div 
                        v-show="User.CurrentUser === null"
                        class="flex wrap justify-evenly items-center grow py-2"
                    >
                        <button-text
                            class="w-full m-2"
                            href="/register"
                        >
                            {{ lang.Register() }}
                        </button-text>
                        <button-block
                            class="w-full m-2"
                            href="/login"
                        >
                            {{ lang.Login() }}
                        </button-block>
                    </div>
                </div>
            </div>
            <!-- MOBILE MENU -->
        </div>
    </div>
</template>

<script>
import IconCard from '../components/cards/IconCard.vue';
import BadgeCard from '../components/cards/BadgeCard.vue';
import ButtonBlock from './inputs/ButtonBlock.vue';
import ButtonText from './inputs/ButtonText.vue';
import User from '../scripts/User';
import Lang from '../scripts/Lang';

import {
    Bars3Icon,
    HomeIcon,
    InformationCircleIcon,
    WrenchScrewdriverIcon,
    UserIcon,
} from '@heroicons/vue/24/outline';

const menu = [
    {
        name: "Home",
        icon: HomeIcon,
        href: "/",
        condition: () => true
    },
    {
        name: "Projects",
        icon: WrenchScrewdriverIcon,
        href: "/projects",
        condition: () => true
    },
    {
        name: "Account",
        icon: UserIcon,
        href: "/my",
        condition: () => User.CurrentUser !== null
    },
    {
        name: "About",
        icon: InformationCircleIcon,
        href: "/about",
        condition: () => true
    }
];

export default {
    name: "TopBar",
    components: {
        IconCard,
        BadgeCard,
        Bars3Icon,
        ButtonBlock,
        ButtonText
    },
    data() {
        window.topbar = this;
        return {
            User,
            lang: Lang.CurrentLang,
            menu,
            hiding: false,
            isOpen: false,
            lastY: 0,
            mobile: window.innerWidth < 768,
            console
        };
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
        window.addEventListener("wheel", ev => {
            // using deltaY from page movement (calculated in App.vue)
            const deltaY = window.deltaY;
            const deadZone = 4;
            const shouldHide = (deltaY > deadZone) ? true : (deltaY < -deadZone) ? false : this.hiding;
            if (shouldHide !== this.hiding) {
                this.hiding = shouldHide;
                const container = this.$refs["topbar-cont"];
                if (shouldHide) {
                    container.style.transform = "translateY(-100%)";
                    if (this.isOpen) this.toogleMobileMenu();
                } else {
                    container.style.transform = "translateY(0)";
                }
            }
        });
        window.addEventListener("click", ev => {
            if (this.isOpen) {
                const topbar = this.$refs["topbar"];
                const rect = topbar.getBoundingClientRect();
                const isInside = ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
                if (!isInside) {
                    this.toogleMobileMenu();
                }
            }
        });

        window.addEventListener("resize", ev => {
            this.mobile = window.innerWidth < 768;
            if (this.isOpen) this.toogleMobileMenu();
        });

        this.$router.afterEach((to, from) => {
            if (to.fullPath === from.fullPath) return;
            if (this.isOpen) this.toogleMobileMenu();
            document.getElementById("page-content").scrollTo(0, 0);
        });
    },
    methods: {
        toogleMobileMenu() {
            const mobileMenu = this.$refs["mobile-menu"];
            const topbar = this.$refs["topbar"];

            if (!this.isOpen) {
                const childRect = mobileMenu.children[0].getBoundingClientRect();
                mobileMenu.style.maxHeight = `${childRect.height}px`;
                topbar.classList.add("shadow-lg");
                topbar.classList.remove("shadow-md");
            } else {
                mobileMenu.style.maxHeight = '0px';
                topbar.classList.remove("shadow-lg");
                topbar.classList.add("shadow-md");
            }
            this.isOpen = mobileMenu.style.maxHeight !== '0px';
        }
    }
}
</script>