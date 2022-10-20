import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import "./index.css";
import fullBowodyRoutes from "./fullbowody/routes.js";
import vybeenRoutes from "./vybeen/routes.js";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const mainRoutes = [
    { path: '/', name: 'Home', component: () => import("./views/Home.vue") },
    { path: '/login', name: 'Login', component: () => import("./views/Login.vue") },
    { path: '/register', name: 'Register', component: () => import("./views/Register.vue") },
    { path: '/profile', name: 'Profile', component: () => import("./views/Profile.vue") },
    { path: '/applications', name: 'Applications', component: () => import("./views/Applications.vue") }
];

for (let i = 0; i < fullBowodyRoutes.length; i++) {
    mainRoutes.push({
        path: "/fullbowody" + fullBowodyRoutes[i].path,
        name: "FB" + fullBowodyRoutes[i].name,
        component: fullBowodyRoutes[i].component
    });
}
for (let i = 0; i < vybeenRoutes.length; i++) {
    mainRoutes.push({
        path: "/vybeen" + vybeenRoutes[i].path,
        name: "VB" + vybeenRoutes[i].name,
        component: vybeenRoutes[i].component
    });
}

// 404 redirection
mainRoutes.push({ path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./views/NotFound.vue") });

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: mainRoutes
});

createApp(App).use(router).mount('#app');