/**@type {HTMLAudioElement} */
let audio = null;

function fetchStream(link) {
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

export { fetchStream };