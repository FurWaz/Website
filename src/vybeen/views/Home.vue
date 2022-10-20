<template>
    <div class="flex grow flex-col">
        <div class="flex grow-0 p-2 w-full h-fit"> <!-- HEADER -->
            <div class="flex justify-between w-full rounded-lg bg-slate-600">
                <div class="flex flex-col justify-center p-2">
                    <div
                        v-on:click="toogleDrawer"
                        class="text-slate-200 p-2 rounded-lg border-2 border-slate-700 hover:text-slate-50 hover:bg-slate-500 cursor-pointer transition-all">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col justify-center">
                    <h1 class="text-slate-50 font-bold text-2xl"> VyBeen </h1>
                </div>
                <div></div> <!-- Just to center the title -->
            </div>
        </div>
        <div class="flex grow">
            <div ref="drawer" class="flex grow-0 flex-row w-0 overflow-hidden transition-all"> <!-- DRAWER -->
                <div class="flex grow flex-col mx-2">
                    <div class="flex justify-center bg-slate-600 rounded-lg py-1">
                        <p class="text-xl font-semibold text-slate-50"> Listeners </p>
                    </div>
                    <div class="flex flex-col space-y-2 mt-2 mx-2">
                        <div class="flex rounded-lg shadow border-2 border-slate-600 p-2">
                            <div class="flex flex-col justify-center text-slate-50 mr-2 ml-1">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="flex flex-col justify-center">
                                <p class="text-xl font-semibold text-slate-50 whitespace-nowrap"> FurWaz <span class="text-slate-500">(You)</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="flex grow-0 w-1 bg-slate-600 rounded-lg"></span>
            </div>
            <div class="flex grow flex-col justify-center"> <!-- CONTENT -->
                <div class="flex flex-col mx-auto p-1">
                    <!-- SEARCH BAR -->
                    <div class="flex rounded-lg bg-slate-600 p-1">
                        <input
                            type="text"
                            name="search"
                            class="w-full bg-transparent rounded-lg border-2 border-slate-500 outline-none text-slate-50 focus:border-slate-300 px-2 py-1 transition-all"
                        >
                        <div class="flex flex-col justify-center px-2 cursor-pointer text-slate-400 hover:text-slate-300 transition-all">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <!-- VIEW -->
                    <div class="flex flex-col bg-slate-600 rounded-lg p-2 mt-2">
                        <div class="cover-prev rounded-lg bg-slate-700 w-[30vw] h-[15vw] m-2 border-2 border-slate-500 overflow-hidden">
                            <div class="flex w-full h-full max-h-[100%] overflow-hidden">
                                <div :class="showLyrics? 'bg-black/[0.2] blur-bg': 'bg-black/[0]'" class="flex grow flex-col justify-center transition-all">
                                    <div :class="showLyrics? 'opacity-1 pointer-events-all' : 'opacity-0 pointer-events-none'" class=" flex flex-col mx-auto overflow-hidden transition-all">
                                        <p class="paroles">Paroles 1</p>
                                        <p class="paroles">Paroles 2</p>
                                        <p class="paroles selected">Paroles 3</p>
                                        <p class="paroles">Paroles 4</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end w-full h-0">
                                <div class="fixed w-0 h-0">
                                    <div
                                        class="absolute bottom-1 right-1 w-fit h-fit border-2 border-slate-500 rounded p-1 bg-slate-600 text-slate-400 hover:text-slate-50 hover:border-slate-400 cursor-pointer transition-all"
                                        v-on:click="() => { setShowLyrics(!showLyrics); }"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex grow-0 mt-8 mx-2 justify-center">
                            <h1 class="text-slate-200 font-bold text-xl"> Title - Artist </h1>
                        </div>
                        <div class="flex grow-0 mt-4 text-slate-400 font-semibold mx-2">
                            <div class="flex flex-col justify-center"> <!-- TIMER LEFT -->
                                00 : 24
                            </div>
                            <div class="flex grow flex-col justify-center mx-2">
                                <div class="flex h-1 bg-slate-500 rounded-lg">
                                    <div class="flex bg-slate-200 rounded-lg w-[20%]"></div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center"> <!-- TIMER RIGHT -->
                                01 : 30
                            </div>
                        </div>
                        <div class="flex grow-0 justify-center mt-8 font-semibold mx-2">
                            <div
                                class="flex rounded-lg border-2 border-slate-500 bg-slate-600 text-slate-400 hover:bg-slate-500 hover:text-slate-200 hover:border-slate-400 p-2 m-2 transition-all cursor-pointer"
                                v-on:click="() => {}"
                            >
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                                    <line x1="5" y1="19" x2="5" y2="5"></line>
                                </svg>
                            </div>
                            <div
                                class="flex rounded-lg border-2 border-slate-500 bg-slate-600 text-slate-400 hover:bg-slate-500 hover:text-slate-200 hover:border-slate-400 p-2 m-2 transition-all cursor-pointer"
                                v-on:click="() => { setPlaying(!playing); }"
                            >
                                <svg v-if="!playing" class="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <svg v-if="playing" class="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="6" y="4" width="4" height="16"></rect>
                                    <rect x="14" y="4" width="4" height="16"></rect>
                                </svg>
                            </div>
                            <div
                                class="flex rounded-lg border-2 border-slate-500 bg-slate-600 text-slate-400 hover:bg-slate-500 hover:text-slate-200 hover:border-slate-400 p-2 m-2 transition-all cursor-pointer"
                                v-on:click="() => {}"
                            >
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                                    <line x1="19" y1="5" x2="19" y2="19"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let page = null;

let drawerOpen = false;
function toogleDrawer() {
    if (page == null) return;
    /**@type {HTMLElement} */
    const drawer = page.$refs["drawer"];
    if (drawerOpen) {
        drawer.classList.remove("w-[20%]");
        drawer.classList.add("w-0");
    } else {
        drawer.classList.remove("w-0");
        drawer.classList.add("w-[20%]");
    }
    drawerOpen = !drawerOpen;
}

function setPlaying(state) {
    page.playing = state;
}

function setShowLyrics(state) {
    page.showLyrics = state;
}

export default {
    name: 'Home',
    data() {
        page = this;
        return {
            playing: false, showLyrics: false
        }
    },
    methods: {
        toogleDrawer,
        setPlaying,
        setShowLyrics
    }
}
</script>

<style scoped>
.cover-prev {
    background-image: url("https://thumbs.gfycat.com/MilkyElementaryHagfish-max-1mb.gif");
    background-position: center;
    background-size: cover;
}

.blur-bg {
    backdrop-filter: blur(20px);
}

.paroles {
    @apply text-slate-50/[0.5] font-semibold text-lg my-1 mx-auto rounded-lg px-4 py-1;
}
.selected {
    @apply text-slate-50 font-bold text-xl bg-slate-50/[0.2];
}
</style>