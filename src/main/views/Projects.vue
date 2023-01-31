<template>
    <div class="flex flex-col grow pt-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.Projects }} </page-title>
        <div class="flex flex-wrap my-10 justify-center py-10 h-min">
            <div v-for="project in projects" class="flex show-up" :style="'animation-delay: ' + projects.indexOf(project) * 100 + 'ms;'">
                <big-card :data="project"></big-card>
            </div>
        </div>
    </div>
</template>

<script>
import BigCard from '../components/Cards/BigCard.vue';
import PageTitle from '../components/labels/PageTitle.vue';
import Lang from '../scripts/Lang';

const projects = [
    {
        title: "VyBeen",
        description: Lang.CurrentLang.VybeenDescription,
        link: Lang.CurrentLang.VybeenLink,
        href: "/projects/vybeen",
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
    mounted() {}
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