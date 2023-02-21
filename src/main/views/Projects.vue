<template>
    <div class="flex flex-col grow py-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.Projects }} </page-title>
        <div v-for="categ in projects" class="flex flex-col my-10 show-down" :style="'animation-delay: ' + projects.indexOf(categ) * 100 + 'ms;'">
            <div class="flex grow h-fit md:space-x-4 md:mx-10 justify-center">
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
                <p class="flex mx-auto text-4xl dark:text-slate-400 text-slate-400 font-bold"> {{ categ.label }} </p>
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
            </div>
            <div class="flex flex-wrap justify-center my-4 h-min">
                <div v-for="project in categ.content" class="flex show-up" :style="'animation-delay: ' + (categ.content.indexOf(project) * 100 + 200) + 'ms;'">
                    <big-card :data="project"></big-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BigCard from '../components/Cards/BigCard.vue';
import PageTitle from '../components/labels/PageTitle.vue';
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

const projects = [
    {
        label: Lang.CurrentLang.PersonnalProjects,
        content: [
            {
                title: "VyBeen",
                description: Lang.CurrentLang.VybeenDescription,
                link: Lang.CurrentLang.VybeenLink,
                href: "https://vybeen.projects.furwaz.fr",
                icon: `<path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>`
            },
            {
                title: "Robot",
                description: Lang.CurrentLang.RobotDescription,
                link: Lang.CurrentLang.RobotLink,
                href: "/projects/robot",
                icon: `<rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>`
            },
        ]
    },
    {
        label: Lang.CurrentLang.SchoolProjects,
        content: [
            {
                title: "XRTouch",
                description: Lang.CurrentLang.XRTouchDescription,
                link: Lang.CurrentLang.XRTouchLink,
                href: "https://github.com/XRTouch",
                icon: `<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>`
            },
            {
                title: "Cocktails",
                description: Lang.CurrentLang.CocktailsDescription,
                link: Lang.CurrentLang.CocktailsLink,
                href: "https://cocktails.projects.antoinectx.fr",
                icon: `<path d="M8 22h8"></path>
                    <path d="M12 11v11"></path>
                    <path d="m19 3-7 8-7-8Z"></path>`
            },
            {
                title: "Indico",
                description: Lang.CurrentLang.IndicoDescription,
                link: Lang.CurrentLang.IndicoLink,
                href: "https://indico.lf2l.fr",
                icon: `<path d="m3 9 7-7v4h11v6H10v4z"></path>
                    <path d="m21 15-7-7v4H3v6h11v4z"></path>`
            },
        ]
    }
];

export default {
    name: "Projects",
    components: {
        BigCard,
        PageTitle
    },
    methods: {},
    data() { return { projects, Lang }; },
    setup() {},
    mounted() {
        animateShows(this.$el);
    }
};
</script>

<style>
@keyframes jump {
    0%, 100% {
        transform: translateX(0px);
    }
    10% {
        transform: translateX(5px);
    }
}

.jump { animation: jump 8s infinite cubic-bezier(0.5, 0, 0, 0.5); }
</style>