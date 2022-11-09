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
            <drawer></drawer>
        </div>
    </div>
</template>

<script>
import Player from '../components/Player.vue';
import Search from '../components/Search.vue';
import VbHeader from '../components/VbHeader.vue';
import Drawer from "../components/Drawer.vue";
import { goBack } from '../../main/scripts/common.js';

const API_URL = "https://vybeen.furwaz.com";
let page = null;

let maxLength = 0;

let drawerOpen = false;
function toogleDrawer() {
    if (page == null) return;
    /**@type {HTMLElement} */
    const drawer = document.getElementById("drawer");
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

/**@type {HTMLAudioElement} */
let audio = null;

function getStream(link) {
    fetch(link, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (audio == null) audio = document.getElementById("audio");

        audio.currentTime = 0;
        res.json().then(infos => {
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                return;
            }
            audio.src = infos.stream;
            audio.play();
            audio.currentTime = infos.progress / 1000;
        });
    });
}

let lyricsUpdater = -1;
let lyricsBuffer = [];

function getLyrics(link) {
    lyricsBuffer.splice(0, lyricsBuffer.length);
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
                    time: Number(line.time)
                });
                window.lyricsBuffer = lyricsBuffer;
            });

            document.getElementById("lyrics").scrollTo({
                top: 0,
                behavior: "smooth"
            });

            startMainLoop();
        });
    });
}

function startMainLoop() {
    if (audio == null) audio = document.getElementById("audio");

    if (lyricsUpdater != -1)
        clearInterval(lyricsUpdater);

    lyricsUpdater = setInterval(() => {
        update();
    }, 100);
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
            startMainLoop();
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

let progress = null;
let bar = null;
function update() {
    if (lyricsBuffer.length == 0) {
        clearInterval(lyricsUpdater);
        lyricsUpdater = -1;
        return;
    }

    const delay = audio.currentTime * 1000; // time since song start, in ms

    let index = 0;
    while (lyricsBuffer[index].time < delay) {
        index++;
        if (index >= lyricsBuffer.length) {
            clearInterval(lyricsUpdater);
            lyricsUpdater = -1;
            return;
        }
    }
    index--;

    for(let i = 0; i < lyricsBuffer.length; i++) {
        if (lyricsBuffer[i].el != null) {
            if (i == index) {
                lyricsBuffer[i].el.classList.add("selected");
                const container = document.getElementById("lyrics");
                const containerHeight = container.getBoundingClientRect().height;
                const lyricsHeight = lyricsBuffer[i].el.getBoundingClientRect().height;
                container.scrollTo({
                    top: lyricsBuffer[index].el.offsetTop - containerHeight / 2 + lyricsHeight / 2,
                    behavior: "smooth"
                });
            } else {
                lyricsBuffer[i].el.classList.remove("selected");
            }
        }
    }

    if (progress == null) progress = document.getElementById("progress");
    if (bar == null) bar = document.getElementById("bar");
    page.player.setPlaying(!audio.paused);

    progress.innerHTML = formatTime(delay/1000);
    bar.style.width = `${(delay / 1000 / maxLength) * 100}%`;
}

export default {
    name: 'Home',
    data() {
        page = this;
        return {
            playing: false, showLyrics: false,
            player: null
        }
    },
    components: {
        Player,
        Search,
        VbHeader,
        Drawer
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
/* random translation and rotation */
@keyframes float {
    0%, 100% {
        transform: translate(0, 0) rotate(0);
    }
    25% {
        transform: translate(4px, 0) rotate(-1deg);
    }
    50% {
        transform: translate(0, 4px) rotate(1deg);
    }
    75% {
        transform: translate(2px, 3px) rotate(-2deg);
    }
}

.cover-prev {
    background-image: url("");
    background-position: center;
    background-size: cover;
}

.blur-bg {
    backdrop-filter: blur(20px);
}

.paroles {
    @apply text-slate-200/[0.3] font-semibold text-lg text-center my-2 mx-auto max-w-[80%] rounded-lg px-4 py-1 border border-transparent transition-all;
}
.selected {
    @apply text-slate-50 font-bold text-2xl bg-slate-50/[0.2] border-2 border-slate-50/[0.2];
    animation: float 4s cubic-bezier(.4,.2,.6,.8) infinite;
}
</style>