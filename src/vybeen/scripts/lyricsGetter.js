import { startMainLoop } from "./main";
import { lyricsScroll } from "./uiManager";

let lyricsBuffer = [];
function getLyricsBuffer() {
    return lyricsBuffer;
}

function fetchLyrics(link) {
    lyricsBuffer.splice(0, lyricsBuffer.length);
    fetch(link, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        res.json().then(infos => {
            let lyrics = infos.lyrics;
            if (typeof(infos) == "string" && infos.startsWith("Error")) {
                lyrics = {text: "Error : Can't find lyrics for this song"};
            }
            
            const lyricsContainer = document.getElementById("lyrics");
            while (lyricsContainer.firstChild) lyricsContainer.firstChild.remove();

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

            lyricsScroll(0);
            startMainLoop();
        });
    });
}

export { fetchLyrics, getLyricsBuffer };