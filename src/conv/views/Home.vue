<template>
    <div class="flex grow justify-evenly mt-10">
        <div class="md:flex hidden justify-center px-4">
            <div class="flex flex-col grow justify-evenly">
                <side-ad class="w-[12vw] h-[30vh]"></side-ad>
                <side-ad class="w-[12vw] h-[30vh]"></side-ad>
            </div>
        </div>
        <div class="flex flex-col grow w-full">
            <top-ad class="flex h-[10vh] min-h-[80px] md:mx-20 mx-4 mb-4"></top-ad>
            <div class="flex grow flex-col w-max max-w-full mx-auto justify-center px-2">
                <div class="flex flex-col mx-auto">
                    <conv-card></conv-card>
                    <p style="animation-delay: 1s;" class="show-down md:text-2xl text-xl text-center text-teal-500 font-bold italic mt-2"> Convert YouTube videos to any audio/video file !</p>
                </div>
                <div ref="input-zone" style="animation-delay: 1.2s;" class="h-0 flex w-full transition-all duration-500 overflow-hidden px-1">
                    <div style="animation-delay: 1.8s;" class="show-down flex w-full h-fit pt-8 space-x-2">
                        <conv-input class="w-full"></conv-input>
                        <div ref="search-btn" class="flex flex-col justify-center px-1.5 cursor-pointer dark:text-teal-50/[0.5] text-slate-200
                                    hover:text-teal-500 border-2 dark:border-teal-50/[0.5] border-slate-200 hover:border-teal-500 rounded-lg transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div ref="log-zone" class="flex w-full mx-auto transition-all duration-500" style="max-height: 0px">
                    <div class="flex justify-center text-teal-500 w-full text-lg h-fit font-semibold space-x-4">

                    </div>
                </div>
                <div ref="video-view" class="overflow-hidden transition-all duration-500 mt-4" style="height: 0px;">
                    <div class="flex flex-col border-2 dark:border-teal-50/[0.5] border-slate-200 rounded-md md:space-x-2 space-y-2">
                        <div class="flex flex-col md:flex-row py-1 px-2 md:space-x-2 md:space-y-0 space-y-2 mx-auto">
                            <div class="flex flex-col w-min min-w-[200px] space-y-2 p-2 max-w-[300px] mx-auto">
                                <p id="video-title" class="text-xl text-teal-500 font-bold text-center whitespace-nowrap overflow-hidden max-w-full text-ellipsis"> Video title </p>
                                <img id="video-thumbnail" src="https://i.ytimg.com/vi/iaETHB54-jw/maxresdefault.jpg" class="max-w-[50vw] w-full rounded-md border-2 border-teal-50 mx-auto">
                                <div class="flex flex-col w-full text-base font-semibold">
                                    <div class="flex w-full justify-between space-x-4">
                                        <p class="dark:text-teal-50 text-slate-600"> Author: </p>
                                        <p id="video-author" class="text-teal-500"> Author name </p>
                                    </div>
                                    <div class="flex w-full justify-between space-x-4">
                                        <p class="dark:text-teal-50 text-slate-600"> Length: </p>
                                        <p id="video-length" class="text-teal-500"> 00:00 </p>
                                    </div>
                                </div>
                            </div>
                            <span class="flex md:hidden grow-0 h-[2px] bg-teal-50/[0.2] rounded"></span>
                            <span class="md:flex hidden grow-0 w-[2px] bg-teal-50/[0.2] rounded"></span>
                            <div class="flex flex-col grow p-2 mx-auto">
                                <p class="text-xl text-teal-500 font-bold text-center"> Download options </p>
                                <div ref="default-format" class="h-fit transition-all overflow-hidden" style="max-height: 30px;">
                                    <div class="flex space-x-4">
                                        <p class="text-lg dark:text-teal-50 text-slate-600 font-bold text-center"> Format:  </p>
                                        <p class="text-lg text-teal-500 font-bold text-center"> Default (WEBM Audio) </p>
                                    </div>
                                </div>
                                <div class="flex flex-col mt-2 w-full text-base font-semibold rounded-lg overflow-hidden border-2 dark:border-slate-600 border-slate-300">
                                    <div v-on:click="toogleOptions" ref="options-header" class="flex dark:bg-slate-600 bg-slate-200 dark:text-teal-50 text-slate-600 cursor-pointer select-none">
                                        <div class="flex flex-col justify-center pl-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transition-all">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                        <div class="flex flex-col justify-center">
                                            <p class="px-2 text-lg font-semibold text-left"> More options </p>
                                        </div>
                                    </div>
                                    <div ref="options-panel" class="h-fit transition-all overflow-hidden" style="height: 0px">
                                        <div class="flex flex-col p-1">
                                            <p class="text-md dark:text-teal-50 text-slate-600 font-semibold text-left"> Audio formats: </p>
                                            <selector :data="audioFormats" :onchange="onaudiochange" :onload="setAudioSelector" ></selector>
                                            <p class="text-md dark:text-teal-50 text-slate-600 font-semibold text-left mt-2"> Video formats: </p>
                                            <selector :data="videoFormats" :onchange="onvideochange" :onload="setVideoSelector" ></selector>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex grow justify-end w-full mt-2">
                                    <div class="flex flex-col justify-end">
                                        <button-block ref="convert-btn" class="h-fit w-fit" :onclick="convert"> Convert </button-block>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref="download-view" class="overflow-hidden transition-all duration-500" style="height: 0px;">
                    <div class="flex flex-col h-fit py-4 px-2 border-2 dark:border-teal-50/[0.5] border-slate-200 rounded-md space-y-2">
                        <p ref="conv-label" class="text-xl text-teal-500 font-bold text-center"> Convertion complete ! </p>
                        
                        <div class="flex flex-col grow h-fit space-y-2">
                            <div class="flex grow h-fit bg-slate-900 rounded-xl overflow-hidden transition-all duration-500" style="max-height: 0px;">
                                <span ref="download-bar" class="h-2 bg-teal-500 rounded" style="width: 0%;">

                                </span>
                            </div>
                            <div ref="download-label" class="flex flex-col overflow-hidden transition-all duration-500">
                                <div class="flex w-full justify-center space-x-2 h-fit">
                                    <p class="text-lg dark:text-teal-50 text-slate-600 font-semibold text-center whitespace-nowrap"> File name: </p>
                                    <p id="filename-text" class="text-lg text-teal-500 font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden"> filename.format </p>
                                </div>
                            </div>
                            <div ref="restart-label" class="flex justify-center space-x-2 overflow-hidden transition-all duration-500" style="height: 0px">
                                <p class="h-fit w-fit text-lg text-teal-50 font-semibold text-center whitespace-nowrap"> Want to convert an other video ? </p>
                            </div>
                            <div class="flex justify-center">
                                <button-block ref="restart-btn" class="h-fit w-fit hidden" :onclick="restart"> Restart </button-block>
                                <button-block ref="download-btn" class="h-fit w-fit" :onclick="download"> Download </button-block>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:flex hidden justify-center px-4">
            <div class="flex flex-col grow justify-evenly">
                <side-ad class="w-[12vw] h-[30vh]"></side-ad>
                <side-ad class="w-[12vw] h-[30vh]"></side-ad>
            </div>
        </div>
    </div>
</template>

<script>
import ConvCard from '../components/cards/ConvCard.vue';
import ButtonBlock from '../components/buttons/ButtonBlock.vue'
import ConvInput from '../components/form/ConvInput.vue';
import Selector from '../components/form/Selector.vue';
import API from '../scripts/API.js';
import { stringTime } from '../scripts/common';
import SideAd from '../components/ads/SideAd.vue';
import TopAd from '../components/ads/TopAd.vue';

let page = null;
function update_log_size(shift=0) {
    const logZone = page.$refs["log-zone"];
    if (!logZone) return;
    const child = logZone.firstElementChild;

    logZone.style.maxHeight = child.getBoundingClientRect().height + shift + "px";
}

function addLog(text, animate=true) {
    const logZone = page.$refs["log-zone"];
    const log = document.createElement("p");
    log.innerText = text;
    log.classList.add("w-fit", "whitespace-nowrap");
    if (animate) log.classList.add("transition-all", "duration-500", "show-right");
    logZone.firstElementChild.insertBefore(log, logZone.firstElementChild.firstElementChild);
    log.style.maxWidth = log.getBoundingClientRect().width + "px";
    update_log_size();
    const dismiss = () => {
        if (logZone.firstElementChild.children.length == 1) {
            update_log_size(-log.getBoundingClientRect().height);
        }
        log.classList.remove("show-right");
        log.classList.add("hide-right");
        log.style.maxWidth = "0px";
        setTimeout(() => {
            log.remove();
            update_log_size(0);
        }, 250);
    };
    return { dismiss };
}

function setLog(text) {
    delLog();
    return addLog(text, false);
}

function delLog(text) {
    const logZone = page.$refs["log-zone"].firstElementChild;
    while (logZone.firstElementChild) logZone.firstElementChild.remove();
}

function animatePage() {
    const inputZone = page.$refs["input-zone"];
    const height = inputZone.firstElementChild.getBoundingClientRect().height;
    setTimeout(() => {
        inputZone.style.height = `${height}px`;
    }, 1500);
}

function showResultsView() {
    const resultView = page.$refs["video-view"];
    const height = resultView.firstElementChild.getBoundingClientRect().height;

    resultView.classList.add("mt-4");
    resultView.style.height = `${height}px`;
    setTimeout(() => {
        resultView.style.height = `fit-content`;
    }, 500);
    audioSelector.select(null);
    videoSelector.select(null);
    selectedFormat = "default";
}

function hideResultsView() {
    const resultView = page.$refs["video-view"];
    if (!resultView) return;

    const height = resultView.firstElementChild.getBoundingClientRect().height;
    resultView.classList.remove("mt-4");
    resultView.style.height = `${height}px`;
    setTimeout(() => {
        resultView.style.height = "0px";
    }, 10);
}

function showDownloadView() {
    const downloadView = page.$refs["download-view"];
    const height = downloadView.firstElementChild.getBoundingClientRect().height + 20;
    downloadView.classList.add("mt-4");
    downloadView.style.height = `${height}px`;

    const convLabel = page.$refs["conv-label"];
    convLabel.innerText = "Convertion finished !";
    const filename = document.getElementById("video-title").innerText + "." + (selectedFormat=="default"? "webm" : selectedFormat);
    document.getElementById("filename-text").innerText = filename;
}

function hideDownloadView() {
    const downloadView = page.$refs["download-view"];
    if (!downloadView) return;
    downloadView.classList.remove("mt-4");
    downloadView.style.height = "0px";
}

let selectedFormat = null;
function setSelectedFormat(format) {
    selectedFormat = format;
    const defaultFormat = page.$refs["default-format"];
    if (format == null) {
        defaultFormat.style.maxHeight = defaultFormat.firstElementChild.getBoundingClientRect().height + "px";
    } else {
        defaultFormat.style.maxHeight = "0px";
    }
}

let audioSelector = null;
function setAudioSelector(as) { audioSelector = as; }
const audioFormats = [
    {id: "mp3", value: "MP3"},
    {id: "wav", value: "WAV"},
    {id: "ogg", value: "OGG"},
    {id: "aac", value: "AAC"},
    {id: "m4a", value: "M4A"}
];
function onaudiochange(id) {
    setSelectedFormat(id);
    videoSelector.select(null);
}

let videoSelector = null;
function setVideoSelector(vs) { videoSelector = vs; }
const videoFormats = [
    {id: "mp4", value: "MP4"},
    {id: "webm", value: "WEBM"},
    {id: "flv", value: "FLV"},
    {id: "avi", value: "AVI"},
    {id: "mov", value: "MOV"}
];
function onvideochange(id) {
    setSelectedFormat(id);
    audioSelector.select(null);
}

function getVideoID(input) {
    if ( !input ) {
        const log = addLog("Error : Please enter a video URL or ID !");
        setTimeout(() => {
            log.dismiss();
        }, 2000);
        return;
    }
    if ( input.startsWith("http") ) {
        const url = new URL(input);
        if ( url.hostname == "www.youtube.com" || url.hostname == "youtube.com" ) {
            if ( url.pathname == "/watch" ) {
                return url.searchParams.get("v");
            } else {
                const log = addLog("Error : Invalid URL !");
                setTimeout(() => {
                    log.dismiss();
                }, 2000);
                return;
            }
        } else {
            if ( url.hostname == "youtu.be" ) {
                return url.pathname.substring(1);
            } else {
                const log = addLog("Error : Invalid URL !");
                setTimeout(() => {
                    log.dismiss();
                }, 2000);
                return;
            }
        }
    } else {
        if ( input.length == 11 && input.match(/^[a-zA-Z0-9_-]+$/) ) {
            return input;
        } else {
            const log = addLog("Error : Invalid video ID !");
            setTimeout(() => {
                log.dismiss();
            }, 2000);
            return;
        }
    }
}

let converterTicket = null;
function search() {
    hideResultsView();
    hideDownloadView();

    const zone = page.$refs["input-zone"];
    if (!zone) return;
    const input = zone.querySelector("input");
    if (input == null) return;

    let videoID = getVideoID(input.value);
    if (videoID == null) return;

    const log = addLog("Retreiving video informations ...");
    
    API.execute("/retreive?id="+videoID).then(res => {
        log.dismiss();
        document.getElementById("video-title").innerText = res.title;
        document.getElementById("video-author").innerText = res.author;
        document.getElementById("video-length").innerText = stringTime(res.length);
        document.getElementById("video-thumbnail").src = res.thumbnail;
        converterTicket = res.ticketID;
        if (res.length > 900) {
            const newlog = addLog("Error : The video should be less than 15 minutes long");
            setTimeout(() => {
                newlog.dismiss();
            }, 2000);
            return;
        }
        showResultsView();
    }).catch(err => {
        log.dismiss();
        let newlog = addLog("Error: " + err);
        setTimeout(() => {
            newlog.dismiss();
        }, 2000);
    });
}

let downloadLink = null;
function convert() {
    if ( selectedFormat == null ) {
        selectedFormat = "default";
    }

    hideResultsView();
    hideDownloadView();
    const log = addLog("Converting video to " + selectedFormat.toUpperCase());

    const timeoutID = setTimeout(() => {
        log.dismiss();
        let newlog = addLog("Error: The video is taking too long to convert");
        setTimeout(() => {
            newlog.dismiss();
        }, 2000);
    }, 10000);

    const stateInterval = setInterval(() => {
        API.execute("/state?ticket="+converterTicket).then(res => {
            if (res.state == "CONVERTING") {
                setLog("Converting video to " + selectedFormat.toUpperCase() + " ... " + res.progress + "%");
            } else {
                setLog("Downloading video ... " + res.progress + "%");
            }
        }).catch(err => console.error(err));
    }, 500);
    
    API.execute("/convert?ticket="+converterTicket+"&format="+selectedFormat).then(res => {
        clearTimeout(timeoutID);
        clearInterval(stateInterval);
        delLog();
        if (!res.success) {
            log.dismiss();
            let newlog = addLog("Error: Cannot convert the video");
            setTimeout(() => {
                newlog.dismiss();
            }, 4000);
            return;
        }
        downloadLink = res.link;
        log.dismiss();
        showDownloadView();
    }).catch(err => {
        log.dismiss();
        let newlog = addLog("Error: " + err);
        setTimeout(() => {
            newlog.dismiss();
        }, 2000);
    });
}

function download() {
    hideResultsView();
    const downloadBtn = page.$refs["download-btn"].$el;
    const restartBtn = page.$refs["restart-btn"].$el;
    const downloadLabel = page.$refs["download-label"];
    const restartLabel = page.$refs["restart-label"];
    downloadBtn.classList.add("hide-right");
    downloadLabel.style.height = "0px";
    restartLabel.style.height = restartLabel.firstElementChild.getBoundingClientRect().height + "px";
    setTimeout(() => {
        downloadBtn.classList.add("hidden");
        restartBtn.classList.remove("hidden");
        restartBtn.classList.add("show-right");
    }, 150);

    const convLabel = page.$refs["conv-label"];
    convLabel.innerText = "Downloading ...";
    const downloadBar = page.$refs["download-bar"];
    downloadBar.parentElement.style.maxHeight = "20px";
    downloadBar.setProgress = p => { downloadBar.style.width = p + "%"; };
    downloadBar.setProgress(0);

    const link = API.API_URL + downloadLink;
    const filename = document.getElementById("video-title").innerText + "." + (selectedFormat=="default"? "webm" : selectedFormat);
    fetch(link).then(res => {

        const reader = res.body.getReader();
        const contentLength = +res.headers.get("Content-Length") || 5000000;
        let receivedLength = 0;
        let chunks = [];

        const readChunks = (whenDone) => {
            reader.read().then(({done, value}) => {
                if (done) {
                    whenDone();
                    return;
                }

                chunks.push(value);
                receivedLength += value.length;
                downloadBar.setProgress(receivedLength / contentLength * 100);
                readChunks(whenDone);
            });
        };

        readChunks(() => {
            let chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }
            
            const blob = new Blob([chunksAll]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            convLabel.innerText = "Downloaded !";
            downloadBar.parentElement.style.maxHeight = "0px";
        });
    });
}
function restart() {
    hideResultsView();
    hideDownloadView();
    const input = page.$refs["input-zone"].querySelector("input");
    input.value = "";
    input.focus();

    setTimeout(() => {
        const downloadBtn = page.$refs["download-btn"].$el;
        const restartBtn = page.$refs["restart-btn"].$el;
        const downloadLabel = page.$refs["download-label"];
        const restartLabel = page.$refs["restart-label"];
        downloadBtn.classList.remove("hide-right");
        downloadLabel.style.height = downloadLabel.firstElementChild.getBoundingClientRect().height + "px";
        restartLabel.style.height = "0px";
        setTimeout(() => {
            downloadBtn.classList.remove("hidden");
            restartBtn.classList.add("hidden");
            restartBtn.classList.remove("show-right");
        }, 150);
    }, 500);
}

function toogleOptions(obj) {
    const header = page.$refs["options-header"];
    const icon = header.firstElementChild.firstElementChild;
    const options = page.$refs["options-panel"];

    if (!icon.classList.contains("rotate-90")) {
        icon.classList.add("rotate-90")
        options.style.height = options.firstElementChild.getBoundingClientRect().height + "px";
    }
    else {
        icon.classList.remove("rotate-90")
        options.style.height = "0px";
    }
}

export default {
    name: "Home",
    components: {
        ConvCard,
        ButtonBlock,
        ConvInput,
        Selector,
        SideAd,
        TopAd
    },
    methods: { search, convert, download, restart, onaudiochange, onvideochange, toogleOptions },
    data() { return { audioFormats, videoFormats, setAudioSelector, setVideoSelector }; },
    setup() {},
    mounted() {
        page = this;
        animatePage();

        this.$refs["search-btn"].addEventListener("click", search);
        
        const input = page.$refs["input-zone"].querySelector("input");
        input.addEventListener("keydown", ev => {
            if (ev.key == "Enter") search();
        });

        window.addEventListener("keydown", ev => {
            if (ev.key == "v" && ev.ctrlKey) {
                input.value = "";
                input.focus();
                setTimeout(search, 10);
            }
        });
    }
};
</script>