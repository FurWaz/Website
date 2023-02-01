import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import "./index.css";
import fullBowodyRoutes from "./fullbowody/routes.js";
import piuzleRoutes from "./piuzle/routes.js";
import vybeenRoutes from "./vybeen/routes.js";
import convRoutes from "./conv/routes.js";
import mainRoutes from "./main/routes.js";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const routes = [];

for (let i = 0; i < mainRoutes.length; i++) {
    routes.push({
        path: mainRoutes[i].path,
        name: mainRoutes[i].name,
        component: mainRoutes[i].component
    });
}
for (let i = 0; i < fullBowodyRoutes.length; i++) {
    routes.push({
        path: "/apps/fullbowody" + fullBowodyRoutes[i].path,
        name: "FB" + fullBowodyRoutes[i].name,
        component: fullBowodyRoutes[i].component
    });
}
for (let i = 0; i < vybeenRoutes.length; i++) {
    routes.push({
        path: "/projects/vybeen" + vybeenRoutes[i].path,
        name: "VB" + vybeenRoutes[i].name,
        component: vybeenRoutes[i].component
    });
}
for (let i = 0; i < convRoutes.length; i++) {
    routes.push({
        path: "/apps/conv" + convRoutes[i].path,
        name: "CV" + convRoutes[i].name,
        component: convRoutes[i].component
    });
}
for (let i = 0; i < piuzleRoutes.length; i++) {
    routes.push({
        path: "/apps/piuzle" + piuzleRoutes[i].path,
        name: "PZ" + piuzleRoutes[i].name,
        component: piuzleRoutes[i].component
    });
}

// 404 redirection
routes.push({ path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./main/views/NotFound.vue") });

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: routes
});

createApp(App).use(router).mount('#app');