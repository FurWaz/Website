import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';
import Home from './views/Home.vue';

import "./index.css";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home }
    ]
});

createApp(App).use(router).mount('#app');