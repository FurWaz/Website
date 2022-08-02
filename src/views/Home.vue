<template>
    <div class="flex flex-col w-screen min-h-screen background">
        <header class="flex justify-center h-[40vh]">
            <div class="flex flex-row m-auto">
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 100ms;">F</h1>
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 200ms;">U</h1>
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 300ms;">R</h1>
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 400ms;">W</h1>
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 500ms;">A</h1>
                <h1 class="title text-9xl font-extrabold text-white" style="animation-delay: 600ms;">Z</h1>
            </div>
        </header>
        <div class="flex grow mx-4 flex-row justify-evenly">
            <card>
                <card-title>Mon nouveau jeu - Nexus</card-title>
                <card-description>
                    Créez, partagez, et donnez vie à votre propre univers en réalité virtuelle avec Nexus.
                </card-description>
                <card-description>
                    Disponible gratuitement sur PC VR et Meta Quest.
                </card-description>
                <redirect-button :href="'https://google.com/'">Voir</redirect-button>
            </card>
        </div>
        <footer class="flex justify-center text-white font-bold text-lg m-2">FurWaz - 2022</footer>
    </div>
</template>

<script>
//import * as Home from '../script/Home';
import Card from "../components/card/Card.vue";
import CardTitle from "../components/card/CardTitle.vue";
import CardDescription from "../components/card/CardDescription.vue";
import RedirectButton from "../components/buttons/RedirectButton.vue";

import { redirectTo } from "../script/common.js";

export default {
    name: "Home",
    components: {
        Card, CardTitle, CardDescription, RedirectButton
    },
    data() {
        return {};
    },
    setup() {
        
    },
    mounted() {
        
    },
    methods: {
        redirectTo
    }
};
</script>


<style>
.background {
    background: rgb(60,70,58);
    background: linear-gradient(170deg, #34495e, #2c3e50);
}

@keyframes floating {
    0% {
        transform: translateY(-5px);
    }
    50% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(-5px);
    }
}

.title {
    font-family: "Roboto bold";
    text-shadow: -2px 2px 0 #2c3e50, 
               -3px 3px 0 #bdc3c7,
               -4px 4px 0 #95a5a6,
               -5px 5px 0 #7f8c8d,
               0 6px 1px rgba(0,0,0,.1),
               0 0 5px rgba(0,0,0,.1),
               0 1px 3px rgba(0,0,0,.3),
               0 3px 5px rgba(0,0,0,.2),
               0 5px 10px rgba(0,0,0,.25),
               0 10px 10px rgba(0,0,0,.2),
               0 20px 20px rgba(0,0,0,.15);
    text-transform: uppercase;
    animation: floating 2s ease-in-out infinite;
    transform: translateY(-5px);
}
</style>