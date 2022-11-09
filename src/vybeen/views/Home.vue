<template>
    <div class="absolute top-0 right-0 w-screen h-screen bg-black">
        <div id="background" class="absolute top-0 right-0 w-screen h-screen bg-cover bg-center blur-3xl"></div>
        <div class="absolute top-0 right-0 w-screen h-screen flex grow bg-slate-900/[0.6]"></div>
    </div>
    <div class="flex grow flex-col z-50">
        <audio id="audio" src="" class="hidden"></audio>
        <vb-header></vb-header>
        <div class="flex grow min-w-0 min-h-0">
            <div class="flex grow flex-col justify-center px-4 min-w-0"> <!-- CONTENT -->
                <div class="flex flex-col mx-auto p-1 min-w-0 max-w-full">
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
import Drawer from '../components/Drawer.vue'
import { goBack } from '../../main/scripts/common.js';
import { toogleDrawer, showLyrics, doesShowLyrics, setPlayingIcon } from '../scripts/uiManager.js';
import { fetchInfos, requestSearch, startMainLoop } from '../scripts/main';

function setup() {
    document.getElementById("show-lyrics-btn").addEventListener("click", ev => {
        showLyrics(!doesShowLyrics());
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
            setPlayingIcon(true);
            startMainLoop();
        } else {
            audio.pause();
            setPlayingIcon(false);
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

    fetchInfos();
    startMainLoop();
}

export default {
    name: 'Home',
    data() {
        return {}
    },
    components: {
        Player,
        Search,
        VbHeader,
        Drawer
    },
    methods: {},
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