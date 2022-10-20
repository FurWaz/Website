<template>
    <div class="flex grow flex-col">
        <audio id="audio" src="" class="hidden"></audio>

        <div class="flex grow-0 p-2 w-full h-fit"> <!-- HEADER -->
            <div class="flex justify-between w-full rounded-lg bg-slate-600">
                <div class="flex flex-col justify-center p-2">
                    <div
                        v-on:click="goBack"
                        class="text-slate-200 p-2 rounded-lg border-2 border-slate-700 hover:text-slate-50 hover:bg-slate-500 cursor-pointer transition-all">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col justify-center">
                    <h1 class="text-slate-50 font-bold text-2xl"> VyBeen </h1>
                </div>
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
            </div>
        </div>
        <div class="flex grow">
            <div class="flex grow flex-col justify-center"> <!-- CONTENT -->
                <div class="flex flex-col mx-auto p-1">
                    <!-- SEARCH BAR -->
                    <div class="flex rounded-lg bg-slate-600 p-1">
                        <input
                            id="search"
                            type="text"
                            name="search"
                            class="w-full bg-transparent rounded-lg border-2 border-slate-500 outline-none text-slate-50 focus:border-slate-300 px-2 py-1 transition-all"
                        >
                        <div id="btn-search" class="flex flex-col justify-center px-2 cursor-pointer text-slate-400 hover:text-slate-300 transition-all">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                    <!-- VIEW -->
                    <div class="flex flex-col bg-slate-600 rounded-lg p-2 mt-2 w-[30vw]">
                        <div id="preview" class="flow grow-0 cover-prev rounded-lg bg-slate-700 h-[15vw] m-2 border-2 border-slate-500 overflow-hidden">
                            <div class="flex w-full h-full max-h-[100%] overflow-hidden">
                                <div :class="showLyrics? 'bg-black/[0.4] blur-bg': 'bg-black/[0]'" class="flex grow flex-col justify-center transition-all">
                                    <div id="lyrics" :class="showLyrics? 'opacity-1 pointer-events-all' : 'opacity-0 pointer-events-none'" class=" flex flex-col mx-auto overflow-x-hidden transition-all py-[10%]">
                                        <p class="paroles">Loading ...</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end w-full h-0">
                                <div class="fixed w-0 h-0">
                                    <div
                                        class="absolute bottom-1 right-1 w-fit h-fit border-2 border-slate-500 rounded p-1 bg-slate-600 text-slate-400 hover:text-slate-50 hover:border-slate-400 cursor-pointer transition-all"
                                        v-on:click="() => { setShowLyrics(!showLyrics); }"
                                    >
                                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                                            <circle cx="17" cy="7" r="5"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex grow-0 mt-8 mx-2 justify-center min-w-0">
                            <h1 id="title" class="text-slate-200 font-bold text-xl text-ellipsis max-w-full overflow-hidden whitespace-nowrap"> - - - - - </h1>
                        </div>
                        <div class="flex grow-0 mt-4 text-slate-400 font-semibold mx-2">
                            <div id="progress" class="flex flex-col justify-center"> <!-- TIMER LEFT -->
                                00 : 00
                            </div>
                            <div class="flex grow flex-col justify-center mx-2">
                                <div class="flex h-1 bg-slate-500 rounded-lg">
                                    <div id="bar" class="flex bg-slate-200 rounded-lg transition-all" style="width: 0%"></div>
                                </div>
                            </div>
                            <div id="time" class="flex flex-col justify-center"> <!-- TIMER RIGHT -->
                                00 : 00
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
            <div ref="drawer" class="flex grow-0 flex-row w-0 overflow-hidden transition-all"> <!-- DRAWER -->
                <span class="flex grow-0 w-1 bg-slate-600 rounded-lg"></span>
                <div class="flex grow flex-col mx-2">
                    <div class="flex justify-center bg-slate-600 rounded-lg py-1 w-full">
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
                                <p class="text-xl font-semibold text-slate-50 whitespace-nowrap">
                                    {{ (User.CurrentUser == null) ? "Anonyme": User.CurrentUser.username }}
                                    <span class="text-slate-500">(You)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../../scripts/User.js';
import { goBack } from '../../scripts/common.js';

const API_URL = "https://vybeen.furwaz.com";
let page = null;

let maxLength = 0;
let time = 0;

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

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
}

let updateInterval = -1;
function setTime(time) {
    if (time == 0) {
        clearInterval(updateInterval);
        updateInterval = -1;
    }
    time = Math.min(time, maxLength);
    
    const updateTime = () => {
        document.getElementById("progress").innerHTML = formatTime(time);
        document.getElementById("bar").style.width = `${(time / maxLength) * 100}%`;
        setPlaying(true);
    }
    updateTime();

    if (updateInterval != -1) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        time += 1;
        if (time >= maxLength) {
            clearInterval(updateInterval);
            updateInterval = -1;
            setPlaying(false);
            return;
        }
        updateTime();
    }, 1000);
}

function setMaxTime(time) {
    document.getElementById("time")
    .innerHTML = formatTime(time);
    maxLength = time;
}

function setPreview(url) {
    document.getElementById("preview")
    .style.backgroundImage = "url("+url+")";
}

function setTitle(title) {
    document.getElementById("title")
    .innerHTML = title;
}

function setInfos(infos) {
    setPreview(infos.thumbnail);
    setTitle(infos.author + " - " + infos.title);
    setMaxTime(infos.length);
    setTime(0);
    getStream(API_URL+infos.stream);
    getLyrics(API_URL+infos.lyrics);
}

function requestSearch(search) {
    fetch(API_URL+"/search?q="+search, {
        method: "GET",
        headers: { "Content-Type": "application/json"}
    }).then(res => {
        res.json().then(infos => {
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                return;
            }
            setInfos(infos);
        });
    });
}

function getStream(link) {
    fetch(link, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        res.json().then(infos => {
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                return;
            }
            /**@type {HTMLAudioElement} */
            const audio = document.getElementById("audio");
            audio.src = infos.stream;
            audio.play();
            audio.currentTime = infos.progress / 1000;
            setTime(infos.progress / 1000);
        });
    });
}

function getLyrics(link) {
    fetch(link, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        res.json().then(infos => {
            let lyrics = infos.lyrics;
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                lyrics = ["Error : Can't find lyrics for this song"];
            }
            
            const lyricsContainer = document.getElementById("lyrics");
            lyricsContainer.innerHTML = "";
            lyrics.forEach(line => {
                const p = document.createElement("p");
                p.classList.add("paroles")
                p.innerHTML = line;
                lyricsContainer.appendChild(p);
            });
        });
    });
}

function setup() {
    document.getElementById("btn-search").addEventListener("click", ev => {
        requestSearch(document.getElementById("search").value);
    });
    document.getElementById("search").addEventListener("keyup", ev => {
        if (ev.key == "Enter") {
            requestSearch(document.getElementById("search").value);
        }
    });

    fetch(API_URL+"/infos", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        res.json().then(infos => {
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                return;
            }
            setInfos(infos);
        });
    });
}

export default {
    name: 'Home',
    data() {
        page = this;
        return {
            playing: false, showLyrics: false, User: User
        }
    },
    components: {
        
    },
    methods: {
        toogleDrawer,
        setPlaying,
        setShowLyrics,
        goBack
    },
    mounted() {
        setup();
    }
}
</script>

<style>
.cover-prev {
    background-image: url("");
    background-position: center;
    background-size: cover;
}

.blur-bg {
    backdrop-filter: blur(20px);
}

.paroles {
    @apply text-slate-50 font-bold text-lg text-center bg-slate-50/[0.1] my-4 mx-auto max-w-[80%] rounded-lg px-4 py-1 transition-all;
    /* @apply text-slate-50/[0.5] font-semibold text-lg text-center my-2 mx-auto max-w-[80%] rounded-lg px-4 py-1 transition-all; */
}
.selected {
    @apply text-slate-50 font-bold text-xl bg-slate-50/[0.2];
}
</style>