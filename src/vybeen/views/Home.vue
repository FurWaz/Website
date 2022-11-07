<template>
    <div class="absolute top-0 right-0 w-screen h-screen bg-black">
        <div id="background" class="absolute top-0 right-0 w-screen h-screen bg-cover bg-center blur-3xl"></div>
        <div class="absolute top-0 right-0 w-screen h-screen flex grow bg-slate-900/[0.6]"></div>
    </div>
    <div class="flex grow flex-col z-50">
        <audio id="audio" src="" class="hidden"></audio>
        <vb-header></vb-header>
        <div class="flex grow">
            <div class="flex grow flex-col justify-center"> <!-- CONTENT -->
                <div class="flex flex-col mx-auto p-1">
                    <!-- SEARCH BAR -->
                    <search></search>
                    <!-- VIEW -->
                    <player :init="obj => { player = obj; }"></player>
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
import Player from '../components/Player.vue';
import Search from '../components/Search.vue';
import VbHeader from '../components/VbHeader.vue';
import User from '../../main/scripts/User.js';
import { goBack } from '../../main/scripts/common.js';

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

function setMaxTime(time) {
    document.getElementById("time")
    .innerHTML = formatTime(time);
    maxLength = time;
}

function setPreview(url) {
    document.getElementById("preview")
    .style.backgroundImage = "url("+url+")";
    document.getElementById("background")
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
        });
    });
}

let lyricsUpdater = -1;
let lyricsBuffer = [];
let lastBufferElement = null;

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
                if (line.text != "") {
                    p.classList.add("paroles")
                    p.innerHTML = line.text;
                    lyricsContainer.appendChild(p);
                }
                lyricsBuffer.push({
                    el: line.text == "" ? null: p,
                    time: line.time
                });
            });

            document.getElementById("lyrics").scrollTo({
                top: 0,
                behavior: "smooth"
            });

            lyricsUpdater = setInterval(() => {
                if (lyricsBuffer.length == 0) {
                    clearInterval(lyricsUpdater);
                    lyricsUpdater = -1;
                    lastBufferElement = null;
                    return;
                }

                /**@type {HTMLAudioElement} */
                const audio = document.getElementById("audio");
                const delay = audio.currentTime;

                if (lyricsBuffer[0].time <= delay) {
                    if (lyricsBuffer[0].el != null)
                        lyricsBuffer[0].el.classList.add("selected");
                    if (lastBufferElement != null) {
                        lastBufferElement.classList.remove("selected");
                        document.getElementById("lyrics").scrollTo({
                            top: lastBufferElement.offsetTop,
                            behavior: "smooth"
                        });
                    }
                    lastBufferElement = lyricsBuffer.shift().el;

                    const updateTime = () => {
                        document.getElementById("progress").innerHTML = formatTime(delay);
                        document.getElementById("bar").style.width = `${(delay / maxLength) * 100}%`;
                    }
                    updateTime();

                    page.player.setPlaying(!audio.paused);
                }
            }, 100);
        });
    });
}

function setup() {
    document.getElementById("show-lyrics-btn").addEventListener("click", ev => {
        setShowLyrics(!page.showLyrics);
        if (page.player != null) page.player.setShowLyrics(page.showLyrics);
    });

    document.getElementById("btn-back").addEventListener("click", ev => {
        goBack();
    });

    document.getElementById("btn-toggle-drawer").addEventListener("click", ev => {
        toogleDrawer();
    });

    document.getElementById("btn-play").addEventListener("click", ev => {
        /**@type {HTMLAudioElement} */
        const audio = document.getElementById("audio");
        if (audio.paused) {
            audio.play();
            setPlaying(true);
        } else {
            audio.pause();
            setPlaying(false);
        }
    });

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
            playing: false, showLyrics: false, User: User,
            player: null
        }
    },
    components: {
        Player,
        Search,
        VbHeader
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
    @apply text-slate-50 font-bold text-xl bg-slate-50/[0.2] border-2 border-slate-50/[0.2];
}
</style>