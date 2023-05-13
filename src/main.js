import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import "./index.css";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const routes = [
    { path: '/', name: 'Home', component: () => import("./views/Home.vue") },
    { path: '/register', name: 'Register', component: () => import("./views/Register.vue") },
    { path: '/login', name: 'Login', component: () => import("./views/Login.vue") },
    { path: '/about', name: 'About', component: () => import("./views/About.vue") },
    { path: '/profile', name: 'Profile', component: () => import("./views/Profile.vue") },
    { path: '/projects', name: 'Projects', component: () => import("./views/Projects.vue") },
    { path: '/apps', name: 'Apps', component: () => import("./views/Apps.vue") }
];

// 404 redirection
routes.push({ path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./views/NotFound.vue") });

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: routes
});

createApp(App).use(router).mount('#app');