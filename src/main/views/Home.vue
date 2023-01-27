<template>
    <div class="relative flex grow overflow-x-hidden">
        <div class="absolute top-0 left-0 w-0 h-0">
            <div ref="particles" class="relative flex justify-center h-[80vh] w-screen">

            </div>
        </div>
        <div class="flex flex-col grow" style="z-index: 1;">
            <div class="flex grow justify-center my-40">
                <div class="flex flex-col justify-center">
                    <div class="show-up duration-1000 flex bg-slate-800 md:border-4 border-2 border-slate-600 md:rounded-3xl rounded-xl md:px-20 px-6 h-fit shadow-xl">
                        <h1 class="md:text-[8em] text-[3em] font-extrabold drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500 m-0"> FurWaz </h1>
                    </div>
                </div>
            </div>
            <div class="flex grow-0 h-fit">
                <img src="../../assets/UI/waves-orange.svg" alt="" class="w-full">
            </div>
            <div class="flex grow bg-orange-500">

            </div>
        </div>
    </div>
</template>

<script>

function spawnSVG(dom, size, pos, rot, color) {
    const svgContent = `
        <path d="M0 -145L113.4 -90.4L141.4 32.3L62.9 130.6L-62.9 130.6L-141.4 32.3L-113.4 -90.4Z" fill="none" stroke="currentColor" stroke-width="20"></path>
    `;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const div = document.createElement("div");
    const randrot = Math.random() * 20;

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

    for(let i = 0; i < 20; i++) {
        const size = Math.random() * 5 + 3;
        const pos = {x: Math.random() * 100, y: Math.random() * 90};
        const rot = Math.random() * 360;
        const colorIndex = (size-3) * colors.length / 5;
        const color = "#" + colors[Math.floor(colorIndex)];
        spawnSVG(div, size, pos, rot, color);
    }
}

export default {
    name: "Home",
    components: {
        
    },
    methods: {},
    data() { return {}; },
    setup() {},
    mounted() {
        spawnParticles(this);
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