<template>
    <div class="relative flex grow overflow-x-hidden">
        <div class="absolute top-0 left-0 w-0 h-0">
            <div ref="particles" class="relative flex justify-center h-[90vh] w-screen">

            </div>
        </div>
        <div class="flex flex-col grow w-full" style="z-index: 1;">
            <div class="flex grow justify-center my-40">
                <div ref="title" class="flex flex-col justify-center">
                    <div class="show-down noscroll flex dark:bg-slate-800 bg-slate-300 md:border-4 border-2 dark:border-slate-600 border-slate-400 md:rounded-3xl rounded-xl md:px-20 px-6 h-fit shadow-xl">
                        <h1 style="animation-delay: 200ms"
                            class="show-down noscroll md:text-[8em] text-[3em] font-extrabold drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 m-0"> FurWaz </h1>
                    </div>
                </div>
            </div>
            <div class="show-up flex flex-col grow-0 h-fit">
                
                <img v-if="isDarkMode" src="../../assets/UI/waves-dark.svg" alt="" class="w-full scale-[1.01]">
                <img v-if="!isDarkMode" src="../../assets/UI/waves.svg" alt="" class="w-full scale-[1.01]">
                <div class="flex md:flex-row flex-col grow bg-orange-500 min-h-[60vh] h-fit w-full py-8 md:space-y-0 space-y-8">
                    <div class="flex flex-col justify-center grow md:w-[50%] md:px-10 px-4">
                        <h1 class="show-up md:text-6xl text-4xl text-slate-700 font-bold text-center mx-auto mb-8"> {{ Lang.CurrentLang.Applications }} </h1>
                        <p class="show-up md:text-2xl text-xl text-slate-700 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ApplicationsDesc1 }} </p>
                        <p class="show-up md:text-2xl text-xl text-slate-700 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ApplicationsDesc2 }} </p>
                    </div>
                    <div class="flex flex-col justify-evenly grow md:w-[50%] md:px-10 px-4">
                        <div class="flex flex-wrap justify-center space-x-8">
                            <div v-for="el in appsIcons" :key="el" class="show-down" :style="'animation-delay: '+(appsIcons.indexOf(el) * 100 + 100)+'ms'">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                    v-html="el.icon" class="text-slate-700 md:w-24 w-16" :style="'transform: rotate('+el.rot+'deg);'">
                                </svg>
                            </div>
                        </div>
                        <div class="show-up flex justify-center" style="animation-delay: 500ms">
                            <button-block href="/apps" color="black"> {{ Lang.CurrentLang.SeeApps }} </button-block>
                        </div>
                    </div>
                </div>
                <img v-if="isDarkMode" src="../../assets/UI/waves-dark.svg" alt="" class="w-full -scale-[1.01]">
                <img v-if="!isDarkMode" src="../../assets/UI/waves.svg" alt="" class="w-full -scale-[1.01]">

                <div class="flex md:flex-row flex-col grow bg-transparent h-[60vh] w-full">
                    <div class="md:hidden flex flex-col justify-center grow md:w-[50%] md:px-10 px-4">
                        <h1 class="show-up md:text-6xl text-4xl text-slate-400 font-bold text-center mx-auto mb-8"> {{ Lang.CurrentLang.Projects }} </h1>
                        <p class="show-up md:text-2xl text-xl text-slate-400 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ProjectsDesc1 }} </p>
                        <p class="show-up md:text-2xl text-xl text-slate-400 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ProjectsDesc2 }} </p>
                    </div>
                    <div class="flex flex-col justify-evenly grow md:w-[50%] md:px-10 px-4">
                        <div class="flex flex-wrap justify-center space-x-8">
                            <div v-for="el in projectsIcons" :key="el" class="show-down" :style="'animation-delay: '+(appsIcons.indexOf(el) * 100 + 100)+'ms'">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                    v-html="el.icon" class="text-slate-400 md:w-24 w-16" :style="'transform: rotate('+el.rot+'deg);'">
                                </svg>
                            </div>
                        </div>
                        <div class="show-up flex justify-center" style="animation-delay: 500ms">
                            <button-block href="/projects"> {{ Lang.CurrentLang.SeeProjects }} </button-block>
                        </div>
                    </div>
                    <div class="md:flex hidden flex-col justify-center grow md:w-[50%] md:px-10 px-4">
                        <h1 class="show-up md:text-6xl text-4xl text-slate-400 font-bold text-center mx-auto mb-8"> {{ Lang.CurrentLang.Projects }} </h1>
                        <p class="show-up md:text-2xl text-xl text-slate-400 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ProjectsDesc1 }} </p>
                        <p class="show-up md:text-2xl text-xl text-slate-400 font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.ProjectsDesc2 }} </p>
                    </div>
                </div>

                <div class="flex md:flex-row flex-col grow h-fit w-full">
                    <div class="md:hidden flex flex-col grow">
                        <img src="../../assets/UI/wave.svg" alt="" class="w-full">
                    </div>
                    <div class="flex flex-col justify-center grow md:w-[50%] md:px-10 px-4 pb-10 pt-14 md:bg-transparent bg-orange-500 md:text-slate-400 text-slate-700">
                        <h1 class="show-up md:text-6xl text-4xl font-bold text-center mx-auto mb-8"> {{ Lang.CurrentLang.About }} </h1>
                        <p class="show-up md:text-2xl text-xl font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.AboutDesc1 }} </p>
                        <p class="show-up md:text-2xl text-xl font-bold text-center mx-auto" style="animation-delay: 200ms"> {{ Lang.CurrentLang.AboutDesc2 }} </p>
                        <div class="show-up flex justify-center" style="animation-delay: 500ms">
                            <button-block href="/about" class="md:flex hidden w-fit mx-auto mt-8"> {{ Lang.CurrentLang.SeeAbout }} </button-block>
                            <button-block href="/about" color="black" class="md:hidden flex w-fit mx-auto mt-8"> {{ Lang.CurrentLang.SeeAbout }} </button-block>
                        </div>
                    </div>
                    <div class="md:flex hidden flex-col grow w-[50%]">
                        <div v-if="!isDarkMode" class="show-right ml-auto">
                            <img src="../../assets/UI/blob.svg" alt="" class="h-80 -rotate-90">
                            <img src="../../assets/UI/blob.svg" alt="" class="h-80 rotate-180">
                        </div>
                        <div v-if="isDarkMode" class="show-right ml-auto">
                            <img src="../../assets/UI/blob-dark.svg" alt="" class="h-80 -rotate-90">
                            <img src="../../assets/UI/blob-dark.svg" alt="" class="h-80 rotate-180">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../components/buttons/ButtonBlock.vue';
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';

function spawnSVG(dom, size, pos, rot, color) {
    const svgContent = `
        <path d="M0 -145L113.4 -90.4L141.4 32.3L62.9 130.6L-62.9 130.6L-141.4 32.3L-113.4 -90.4Z" fill="none" stroke="currentColor" stroke-width="20"></path>
    `;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const div = document.createElement("div");
    const randrot = Math.random() * 200 - 100;

    svg.setAttribute("viewBox", "-155 -160 310 310");
    div.style.position = "absolute";
    div.style.top = "100%";
    div.style.left = pos.x + "%";
    svg.style.width = size + "vh";
    svg.style.height = size + "vh";
    svg.style.color = color;
    svg.style.transform = "translateX(-50%) translateY(-50%) rotate(" + (rot - randrot) + "deg)";
    svg.style.opacity = "0";
    svg.innerHTML = svgContent;
    div.classList.add("transition-all", "duration-1000", "ease-out");
    svg.classList.add("drop-shadow-xl", "transition-all", "duration-1000", "ease-out");
    div.appendChild(svg);
    dom.appendChild(div);

    setTimeout(() => {
        div.style.top = pos.y + "%";
        svg.style.transform = "translateX(-50%) translateY(-50%) rotate(" + rot + "deg)";
        svg.style.opacity = "1";
    }, 20);
}

function spawnParticles(obj) {
    const div = obj.$refs["particles"];
    const colors = ["4e3967", "1e293b", "2a304d", "543a69", "6f3c72", "8c3c75", "c23b6a", "a83a72", "d8405d", "ea4b4c", "f55d37", "f97316"];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const size = Math.random() * 5 + 3;
            const pos = {x: Math.random() * 100, y: Math.random() * 90};
            const rot = Math.random() * 360;
            const colorIndex = (size-3) * colors.length / 5;
            const color = "#" + colors[Math.floor(colorIndex)];
            spawnSVG(div, size, pos, rot, color);
        }, 100 * i);
    }
}

function setupAnimation(page) {
    const particles = page.$refs["particles"];
    const title = page.$refs["title"];

    page.$el.addEventListener("scroll", ev => {
        const scroll = page.$el.scrollTop;
        if (scroll > window.innerHeight) return;

        title.style.transform = "translateY(" + (scroll * 0.6) + "px)";
        particles.style.transform = "translateY(" + (scroll * 0.4) + "px)";
    });
}

const appsIcons = [
    {rot: Math.random() * 40 - 20, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />`},
    {rot: Math.random() * 40 - 20, icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />`},
    {rot: Math.random() * 40 - 20, icon: `<line x1="6" y1="12" x2="10" y2="12"></line>
        <line x1="8" y1="10" x2="8" y2="14"></line>
        <line x1="15" y1="13" x2="15.01" y2="13"></line>
        <line x1="18" y1="11" x2="18.01" y2="11"></line>
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>`},
];

const projectsIcons = [
    {rot: Math.random() * 40 - 20, icon: `<path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>`},
    {rot: Math.random() * 40 - 20, icon: `<rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>`},
    {rot: Math.random() * 40 - 20, icon: `<path d="m3 9 7-7v4h11v6H10v4z"></path>
        <path d="m21 15-7-7v4H3v6h11v4z"></path>`},
];

export default {
    name: "Home",
    components: {
        ButtonBlock
    },
    methods: {},
    data() {
        let theme = localStorage.getItem("theme");
        if (theme == null) {
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return { isDarkMode: theme === "dark", appsIcons, projectsIcons, Lang };
    },
    setup() {},
    mounted() {
        spawnParticles(this);
        setupAnimation(this);
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