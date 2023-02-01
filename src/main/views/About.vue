<template>
    <div class="flex flex-col grow py-10 min-w-0">
        <page-title> {{ Lang.CurrentLang.About }} </page-title>
        <div class="flex flex-col">
            <div class="show-up flex grow h-fit md:space-x-4 md:mx-10 justify-center mt-20">
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
                <p class="flex mx-auto text-4xl dark:text-slate-400 text-slate-400 font-bold"> {{ Lang.CurrentLang.AboutMe }} </p>
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
            </div>
            <div class="flex flex-col grow h-fit my-4"> <!-- ABOUT ME -->
                <div class="flex md:flex-row flex-col justify-evenly">
                    <div class="flex flex-col justify-center">
                        <div class="show flex flex-col mx-4 justify-start rounded-lg dark:bg-slate-900 bg-slate-200 p-4 text-xl font-semibold font-mono
                                    dark:text-slate-400 text-slate-500 border-2 dark:border-slate-700 border-slate-300 relative">
                            <p class="absolute cursor"> _ </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoHeader }} </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoFirstname }} </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoLastname }} </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoAge }} </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoGenre }} </p>
                            <p class="summon-code w-fit"> {{ Lang.CurrentLang.PersoHobbies }} </p>
                        </div>
                    </div>
                    <div class="md:flex hidden show-left flex flex-col justify-center">
                        <img class="w-80" :class="isDarkMode? 'shadow-effect-dark' : 'shadow-effect'" src="../../assets/img/Paul.png" alt="">
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="show-down flex grow h-fit w-fit mx-auto px-4 py-2 dark:bg-slate-700 bg-slate-200 border-2 dark:border-slate-600 border-slate-300 shadow-lg rounded-lg mt-8">
                        <p class="text-xl font-bold dark:text-slate-200 text-slate-600 mx-6"> {{ Lang.CurrentLang.Skills }} </p>
                    </div>
                    <div class="flex flex-wrap justify-evenly my-8 md:w-[50%] mx-auto">
                        <div v-for="item in skills" class="show-up flex m-4" :style="'animation-delay: ' + skills.indexOf(item) * 100 + 'ms'">
                            <a
                                class="flex py-1 px-2 w-fit h-fit border-4 dark:border-slate-600 border-slate-300 hover:border-orange-500 hover:dark:border-orange-500 -skew-x-12 dark:bg-slate-700 bg-slate-200 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                                :href="item.link"
                                target="_blank"
                            >
                                <div class="flex skew-x-12 space-x-2 mx-1">
                                    <div class="flex flex-col justify-center">
                                        <img :src="item.icon" alt="" class="h-6">
                                    </div>
                                    <p class="text-lg dark:text-slate-50 text-slate-600 font-semibold"> {{ item.label }} </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="show-up flex grow h-fit md:space-x-4 md:mx-10 justify-center mt-20">
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
                <p class="flex mx-auto text-4xl dark:text-slate-400 text-slate-400 font-bold"> {{ Lang.CurrentLang.AboutFurwaz }} </p>
                <div class="md:flex hidden flex-col grow justify-center"> <span class="flex h-1 dark:bg-slate-700 bg-slate-300"></span> </div>
            </div>
            <div class="flex flex-col grow h-fit my-4"> <!-- ABOUT FURWAZ -->
                <p class="show-down text-xl text-slate-600 font-semibold text-center"> Sorry, no information has been provided yet. </p>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/labels/PageTitle.vue';
import Lang from '../scripts/Lang';

function showCursor() {
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = 1;
    cursor.style.animation = 'none';
    setTimeout(() => {
        cursor.style.animation = 'blink 1s ease forwards'
    }, 5);;
}

function hideCursor() {
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = 0;
    cursor.style.animation = 'none';
}

function setCursorPos(pos) {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = pos.x + 'px';
    cursor.style.top = pos.y + 'px';
    showCursor();
}

function glitchElement(el) {
    el.style.animation = 'glitch 0.2s ease forwards';
    setTimeout(() => { el.style.animation = 'none'; }, 500);
}

function summonCode() {
    const lines = document.querySelectorAll('.summon-code');
    const container = lines.item(0).parentElement;
    let contrect = container.getBoundingClientRect();
    container.style.width = contrect.width + 'px';
    container.style.height = contrect.height + 'px';

    lines.forEach(line => {
        line.text = line.innerText;
        line.innerText = '';
    });
    const glitchLines = () => {
        setTimeout(() => {
            glitchElement( lines.item(Math.floor( Math.random() * lines.length )));
            glitchLines();
        }, Math.random() * 4000);
    };
    glitchLines();
    
    let lineindex = 0;
    const printLines = () => {
        const line = lines.item(lineindex++);
        const text = line.text;
        line.innerText = '';

        let charindex = 0;
        const printChars = () => {
            const char = text.charAt(charindex++);
            if (char == " ") {
                line.innerText += char + text.charAt(charindex++);
            } else line.innerText += char;

            const rect = line.getBoundingClientRect();
            contrect = container.getBoundingClientRect();
            setCursorPos({
                x: rect.right - contrect.left + 2,
                y: rect.top - contrect.top
            });

            if (line.innerText.length < text.length) {
                setTimeout(printChars, Math.random() * 150 + 50);
            } else {
                if (lineindex < lines.length) {
                    setTimeout(printLines, Math.random() * 700 + 300);
                } else {
                    setTimeout(hideCursor, 1000);
                }
            }
        }
        printChars();
    }
    setTimeout(printLines, 500);
    showCursor();
}

const skills = [
    {label: "HTML", link: "https://en.wikipedia.org/wiki/Hypertext_Markup_Language", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/170px-HTML5_logo_and_wordmark.svg.png"},
    {label: "CSS", link: "https://en.wikipedia.org/wiki/CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/170px-CSS3_logo_and_wordmark.svg.png"},
    {label: "JavaScript", link: "https://en.wikipedia.org/wiki/JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Javascript-shield.svg/1200px-Javascript-shield.svg.png"},
    {label: "Vue.js", link: "https://en.wikipedia.org/wiki/Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"},
    {label: "TailwindCSS", link: "https://en.wikipedia.org/wiki/Tailwind_CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"},
    {label: "Node.js", link: "https://en.wikipedia.org/wiki/Node.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"},
    {label: "PHP", link: "https://en.wikipedia.org/wiki/PHP", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png"},
    {label: "MySQL", link: "https://en.wikipedia.org/wiki/MySQL", icon: "https://icon-library.com/images/mysql-icon/mysql-icon-3.jpg"},
    {label: "C#", link: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png"},
    {label: "Java", link: "https://en.wikipedia.org/wiki/Java_(programming_language)", icon: "https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/Java_Logo.svg/1200px-Java_Logo.svg.png"},
    {label: "Python", link: "https://en.wikipedia.org/wiki/Python_(programming_language)", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"},
    {label: "C++", link: "https://en.wikipedia.org/wiki/C%2B%2B", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"},
    {label: "C", link: "https://en.wikipedia.org/wiki/C_(programming_language)", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/The_C_Programming_Language_logo.svg/1200px-The_C_Programming_Language_logo.svg.png"},
    {label: "Unity", link: "https://en.wikipedia.org/wiki/Unity_(game_engine)", icon: "https://cdn-icons-png.flaticon.com/512/5969/5969294.png"},
    {label: "Blender", link: "https://en.wikipedia.org/wiki/Blender_(software)", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/1200px-Blender_logo_no_text.svg.png"},
];

export default {
    name: "Home",
    components: {
        PageTitle
    },
    methods: {},
    data() {
        let theme = localStorage.getItem("theme");
        if (theme == null) {
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return { isDarkMode: theme === "dark", Lang, skills };
    },
    setup() {},
    mounted() {
        summonCode();
    }
};
</script>

<style>
@keyframes blink {
    0% { opacity: 1; }
    30% { opacity: 1; }
    100% { opacity: 0; }
}

@keyframes glitch {
    0% { transform: translateX(0px) skewX(0deg); opacity: 1; }
    15% { transform: translateX(-5px) skewX(0deg); opacity: 0.8; }
    30% { transform: translateX(5px) skewX(10deg); opacity: 0.9; }
    45% { transform: translateX(5px) skewX(0deg); opacity: 0.6; }
    60% { transform: translateX(-5px) skewX(-10deg); opacity: 0.8; }
    75% { transform: translateX(0px) skewX(10deg); opacity: 0.7; }
    100% { transform: translateX(0px) skewX(0deg); opacity: 1; }
}

@keyframes shadow-effect-dark {
    0% {
        opacity: 0;
        filter: drop-shadow(0px 0px 0px #1e293b)
                drop-shadow(32px 4px 0px #f97316)
                drop-shadow(32px 4px 0px #dd4259)
                drop-shadow(32px 4px 0px #9a3b74)
                drop-shadow(32px 4px 0px #4e3967);
    }
    100% {
        opacity: 1;
        filter: drop-shadow(0px 0px 2px #1e293b)
                drop-shadow(8px 2px 0px #f97316)
                drop-shadow(8px 2px 0px #dd4259)
                drop-shadow(8px 2px 0px #9a3b74)
                drop-shadow(8px 2px 0px #4e3967);
    }
}

@keyframes shadow-effect {
    0% {
        opacity: 0;
        filter: drop-shadow(0px 0px 0px #1e293b)
                drop-shadow(32px 4px 0px #f97316)
                drop-shadow(32px 4px 0px #ff7f97)
                drop-shadow(32px 4px 0px #ffb0ea)
                drop-shadow(32px 4px 0px #e1ddff);
    }
    100% {
        opacity: 1;
        filter: drop-shadow(0px 0px 2px #1e293b)
                drop-shadow(8px 2px 0px #f97316)
                drop-shadow(8px 2px 0px #ff7f97)
                drop-shadow(8px 2px 0px #ffb0ea)
                drop-shadow(8px 2px 0px #e1ddff);
    }
}

.shadow-effect { animation: shadow-effect 1s ease forwards; }
.shadow-effect-dark { animation: shadow-effect-dark 1s ease forwards; }
</style>