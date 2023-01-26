<template>
    <div class="flex grow">
        <div class="flex flex-col grow pt-10 min-w-0">
            <div class="show-down flex w-full h-fit justify-center">
                <div class="flex border-2 border-slate-600 rounded-lg px-4 py-1">
                    <h1 class="text-slate-200 text-4xl font-bold mb-1"> Projects </h1>
                </div>
            </div>
            <div class="flex flex-wrap grow my-10 justify-center py-10">
                <big-card v-for="project in projects" :data="project"></big-card>
            </div>
        </div>
    </div>
</template>

<script>
import BigCard from '../components/Cards/BigCard.vue';

const projects = [
    {
        title: "VyBeen",
        description: "Listen music and sing with your friends !",
        link: "Try VyBeen",
        href: "/projects/vybeen",
        icon: `<path d="M9 18V5l12-2v13"></path>
               <circle cx="6" cy="18" r="3"></circle>
               <circle cx="18" cy="16" r="3"></circle>`
    },
    {
        title: "Robot",
        description: "Create your own humanoïd robot, with a 3D printer, an Arduino, and some motors !",
        link: "See project",
        href: "/projects/robot",
        icon: `<rect x="3" y="11" width="18" height="10" rx="2"></rect>
               <circle cx="12" cy="5" r="2"></circle>
               <path d="M12 7v4"></path>
               <line x1="8" y1="16" x2="8" y2="16"></line>
               <line x1="16" y1="16" x2="16" y2="16"></line>`
    }
]

export default {
    name: "Projects",
    components: {
        BigCard
    },
    methods: {},
    data() { return { projects }; },
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