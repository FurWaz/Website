let drawerOpen = false;
let drawer = null;
function toogleDrawer() {
    /**@type {HTMLElement} */
    if (drawer == null) drawer = document.getElementById("drawer");
    if (drawerOpen) {
        drawer.classList.remove("min-w-fit");
        drawer.classList.remove("w-[20em]");
        drawer.classList.add("min-w-0");
        drawer.classList.add("w-0");
    } else {
        drawer.classList.remove("w-0");
        drawer.classList.add("w-[20em]");
        drawer.classList.add("min-w-fit");
        drawer.classList.remove("min-w-0");
    }
    drawerOpen = !drawerOpen;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
}

let maxLength = -1;
function setMaxTime(time) {
    maxLength = time;
    document.getElementById("time")
    .innerHTML = formatTime(time / 1000);
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

/** @type {HTMLDivElement} */
let lyricsContainer = null;
function lyricsScroll(amount) {
    if (lyricsContainer == null) lyricsContainer = document.getElementById("lyrics");
    
    if (typeof(amount) != "number") {
        const containerHeight = lyricsContainer.getBoundingClientRect().height;
        const lyricsHeight = amount.getBoundingClientRect().height;
        amount = amount.offsetTop - containerHeight / 2 + lyricsHeight / 2
    }

    lyricsContainer.scrollTo({
        top: amount,
        behavior: "smooth"
    });
}

function lyricsSelect(el) {
    if (el == null) return;
    if (lyricsContainer == null) lyricsContainer = document.getElementById("lyrics");
    
    for (let i = 0; i < lyricsContainer.childElementCount; i++) {
        lyricsContainer.children.item(i).classList.remove("selected");
    }
    el.classList.add("selected");
}

let progress = null;
let bar = null;
function setProgress(time) {
    if (progress == null) progress = document.getElementById("progress");
    if (bar == null) bar = document.getElementById("bar");

    progress.innerHTML = formatTime(time/1000);
    bar.style.width = `${(time / maxLength) * 100}%`;
}

let showingLyrics = false;
let divLyrics = null;
let lyrics = null;

function showLyrics(state) {
    showingLyrics = state;
    if (divLyrics == null) divLyrics = document.getElementById("div-lyrics");
    if (lyrics == null) lyrics = document.getElementById("lyrics");

    if (showingLyrics) {
        divLyrics.classList.add("bg-black/[0.4]", "blur-bg");
        lyrics.classList.add("opacity-1", "pointer-events-all");
        divLyrics.classList.remove("bg-black/[0]");
        lyrics.classList.remove("opacity-0", "pointer-events-none");
    } else {
        divLyrics.classList.add("bg-black/[0]");
        lyrics.classList.add("opacity-0", "pointer-events-none");
        divLyrics.classList.remove("bg-black/[0.4]", "blur-bg");
        lyrics.classList.remove("opacity-1", "pointer-events-all");
    }
}

function doesShowLyrics() {
    return showingLyrics;
}

let playBtn = null;
function setPlayingIcon(state) {
    if (playBtn == null) playBtn = document.getElementById("btn-play");
    const pauseIcon = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    const playIcon = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;

    playBtn.firstElementChild.innerHTML = state ? pauseIcon : playIcon;
}

export {
    setMaxTime,
    setPreview,
    setTitle,
    lyricsScroll,
    setProgress,
    lyricsSelect,
    toogleDrawer,
    showLyrics,
    doesShowLyrics,
    setPlayingIcon
};