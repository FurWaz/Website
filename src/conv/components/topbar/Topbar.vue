<template>
    <div class="show-down fixed z-50 w-screen h-fit">
        <div class="flex flex-col grow m-4 h-fit rounded-lg shadow-xl shadow-blue-500/[0.5] p-2 bg-blue-500 border-2 border-blue-500">
            <div class="hidden md:flex">
                <a class="animate flex cursor-pointer select-none w-80" href="/">
                    <div class="upside-down flex flex-col justify-center">
                        <quid-icon class="w-8 h-8"></quid-icon>
                    </div>
                    <div class="flex flex-col justify-center">
                        <h1 class="text-3xl font-extrabold mx-2 w-fit" > Quid </h1>
                    </div>
                </a>
                <div class="flex grow flex-row space-x-4 w-fit mx-8 overflow-x-auto justify-center">
                    <div v-for="el in menu" class="flex flex-col justify-center">
                        <top-categ :name="el.name">
                            <top-button
                                v-for="item in el.elements"
                                :name="item.name"
                                :desc="item.desc"
                                :icon="item.icon"
                                :href="item.href">
                            </top-button>
                        </top-categ>
                    </div>
                </div>
                <div class="flex justify-end w-80">
                    <div v-if="User.CurrentUser == null" class="flex flex-row w-fit justify-center space-x-6">
                        <div class="flex flex-col justify-center"> <button-text href="/register"> Inscription </button-text> </div>
                        <div class="flex flex-col justify-center"> <button-block href="/login"> Connexion </button-block> </div>
                    </div>
                    <div v-if="User.CurrentUser != null" class="flex flex-row justify-center space-x-6">
                        <div class="profile-btn text-blue-50 border-2 border-transparent rounded-lg cursor-pointer hover:shadow-md hover:text-slate-200 hover:border-blue-400 transition-all">
                            <div class="flex flex-row justify-between px-2 py-1 w-fit h-fit">
                                <div class="flex flex-col justify-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <p class="font-bold text-md"> {{ User.CurrentUser.username }} </p>
                                </div>
                            </div>
                            <div class="profile-menu flex grow-0 relative transition-all cursor-default">
                                <div class="absolute top-0 right-0 w-fit h-fit transition-all">
                                    <div class="bg-blue-50 shadow-lg rounded-lg px-2 mb-8 mt-2 ml-8 py-2 pb-3 w-fit ml-auto space-y-1">
                                        <button-text color="blue" href="/profile"> Profil </button-text>
                                        <button-text color="blue" :action="disconnect"> Déconnexion </button-text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex md:hidden grow">
                <div class="flex flex-col justify-center">
                    <h1
                        class="text-white text-2xl font-bold mx-2 w-fit cursor-pointer hover:text-blue-500 select-none transition-all"
                        v-on:click="redirectHome(false)"
                    > Quid </h1>
                </div>
                <div class="flex grow justify-end">
                    <div class="flex flex-col justify-center text-slate-50 cursor-pointer">
                        <svg ref="menu-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div ref="mobile-menu" class="flex flex-col grow h-fit md:hidden overflow-hidden transition-all" style="max-height: 0px;">
                <div class="flex flex-col grow">
                    <span class="flex grow h-[2px] bg-blue-200 rounded mx-4 mt-2"></span>
                    <div class="flex flex-col h-fit my-4 space-y-2">
                        <div v-for="el in menu" class="mobile-categ flex flex-col justify-center mx-4 bg-blue-400 border-2 border-blue-400 rounded-lg">
                            <div class="flex px-1">
                                <div class="flex flex-col justify-center transition-all"> <chevron-down-icon class="w-5 h-5 text-blue-200 -rotate-90" /> </div>
                                <p class="flex w-fit mx-auto text-blue-50 font-bold text-md p-1"> {{el.name}} </p>
                            </div>
                            <div class="bg-blue-500 rounded-lg h-fit overflow-hidden transition-all">
                                <div class="p-2 space-y-1">
                                    <div v-for="item in el.elements" class="flex flex-col justify-center">
                                        <button-text :href="item.href"> {{item.name}} </button-text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="flex grow h-[2px] bg-blue-200 rounded w-12 mx-auto"></span>
                    <div class="flex grow mt-4">
                        <div v-if="User.CurrentUser == null" class="flex grow justify-evenly space-x-4 mb-2">
                            <button-text href="/register"> Inscription </button-text>
                            <button-block href="/login"> Connexion </button-block>
                        </div>
                        <div v-if="User.CurrentUser != null" class="flex grow justify-evenly space-x-4 mb-2">
                            <button-text :action="disconnect"> Déconnexion </button-text>
                            <button-block href="/profile"> Profil </button-block>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QuidIcon from "../QuidIcon.vue";
import TopCateg from './TopCateg.vue';
import TopButton from './TopButton.vue';
import ButtonText from '../buttons/ButtonText.vue';
import ButtonBlock from '../buttons/ButtonBlock.vue';

import User from '../../scripts/User.js';
import {
    ListBulletIcon,
    PencilSquareIcon,
    QueueListIcon,
    UserCircleIcon,
    UserGroupIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/solid';

const menu = [
    {
        name: "Questionnaires",
        elements: [
            {
                name: "Voir les questionnaires",
                desc: "Voir la liste des questionnaires",
                icon: QueueListIcon,
                href: "/quizzes"
            },
            {
                name: "Créer un questionnaire",
                desc: "Créer un nouveau questionnaire",
                icon: PencilSquareIcon,
                href: "/quizz/new"
            }
        ]
    },
    {
        name: "Profil",
        elements: [
            {
                name: "Mon profil",
                desc: "Voir mon profil",
                icon: UserCircleIcon,
                href: "/profile"
            },
            {
                name: "Mes questionnaires",
                desc: "Voir mes questionnaires",
                icon: ListBulletIcon,
                href: "/profile/quizzes"
            },
            {
                name: "Mes groupes",
                desc: "Voir mes groupes",
                icon: UserGroupIcon,
                href: "/groups?userid=0"
            }
        ]
    }
];

function setup(topbar) {
    const mobilemenu = topbar.$refs["mobile-menu"];
    const mobilebtn = topbar.$refs["menu-btn"];
    mobilebtn.addEventListener("click", () => {
        if (mobilemenu.style.maxHeight == "0px") {
            mobilemenu.style.maxHeight = mobilemenu.firstElementChild.getBoundingClientRect().height + "px";
            setTimeout(() => {
                mobilemenu.style.maxHeight = window.innerHeight + "px";
            }, 300);
        } else {
            mobilemenu.style.maxHeight = "0px";
        }
    });

    const categs = topbar.$el.querySelectorAll(".mobile-categ");
    for (let i = 0; i < categs.length; i++) {
        const categ = categs[i];
        const btns = categ.children[1];
        const chevron = categ.children[0].children[0];
        categ.open = () => {
            categs.forEach(c => c.close());
            btns.style.maxHeight = btns.firstElementChild.getBoundingClientRect().height + "px";
            chevron.classList.remove("rotate-0");
            chevron.classList.add("rotate-90");
        };
        categ.close = () => {
            btns.style.maxHeight = "0px";
            chevron.classList.add("rotate-0");
            chevron.classList.remove("rotate-90");
        };

        categ.addEventListener("click", () => {
            if (btns.style.maxHeight == "0px")
                categ.open();
            else categ.close();
        });
    }
    categs.forEach(c => c.close());

    if (!User.CurrentUser) return;

    /** @type {HTMLElement} */
    const profilebtn = topbar.$el.querySelector(".profile-btn");
    const profilemenu = topbar.$el.querySelector(".profile-menu");
    const menucontent = profilemenu.firstElementChild;
        menucontent.style.maxHeight = "0px";
        menucontent.classList.add("overflow-hidden");

    profilebtn.addEventListener("mouseenter", () => {
        profilemenu.style.opacity = "1";
        profilemenu.style.transform = "translateY(0px)";
        menucontent.style.maxHeight = menucontent.firstElementChild.getBoundingClientRect().height + 50 + "px";
    });
    profilebtn.addEventListener("mouseleave", () => {
        profilemenu.style.opacity = "0";
        profilemenu.style.transform = "translateY(-10px)";
        menucontent.style.maxHeight = "0px";
    });
}

function disconnect() {
    User.forget();
    window.location.href = window.location.href;
}

export default {
    name: "Topbar",
    methods: { disconnect },
    components: {
        QuidIcon,
        TopCateg,
        TopButton,
        ButtonText,
        ButtonBlock,
        ChevronDownIcon
    },
    data() { return { User, menu }; },
    setup() {},
    mounted() {
        setup(this);
    }
};
</script>

<style scoped>
.animate {
    transform: translateX(0px);
    @apply transition-all text-blue-50;
}
.animate > .upside-down {
    transform: rotate(0deg);
    @apply transition-all;
}
.animate:hover {
    transform: translateX(4px);
    @apply text-blue-200;
}
.animate:hover > .upside-down {
    transform: rotate(180deg);
}
</style>