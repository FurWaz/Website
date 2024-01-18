import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import User from "./scripts/User.js";

import "./index.css";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const routes = [
    { path: '/',                name: 'Home',           component: () => import("./views/Home.vue"),               condition: () => true },
    { path: '/privacy',         name: 'Privacy',        component: () => import("./views/Legal.vue"),              condition: () => true },
    { path: '/terms',           name: 'Terms',          component: () => import("./views/Legal.vue"),              condition: () => true },
    { path: '/register',        name: 'Register',       component: () => import("./views/Register.vue"),           condition: () => true },
    { path: '/login',           name: 'Login',          component: () => import("./views/Login.vue"),              condition: () => true },
    { path: '/about',           name: 'About',          component: () => import("./views/About.vue"),              condition: () => true },
    { path: '/projects',        name: 'Projects',       component: () => import("./views/Projects.vue"),           condition: () => true },
    { path: '/portal',          name: 'Portal',         component: () => import("./views/Portal.vue"),             condition: () => true },
    { path: '/verify/email',    name: 'VerifyEmail',    component: () => import("./views/VerifyEmail.vue"),        condition: () => true },
    { path: '/reset/password',  name: 'ResetPassword',  component: () => import("./views/ResetPassword.vue"),      condition: () => true },
    { path: '/buy',             name: 'Buy',            component: () => import("./views/Buy.vue"),                condition: () => User.CurrentUser !== null },
    { path: '/checkout',        name: 'Checkout',       component: () => import("./views/Checkout.vue"),           condition: () => User.CurrentUser !== null },
    { path: '/checkout/status', name: 'CheckoutStatus', component: () => import("./views/CheckoutStatus.vue"),     condition: () => User.CurrentUser !== null },
    { path: '/my',              name: 'Account',        component: () => import("./views/Account.vue"),            condition: () => User.CurrentUser !== null },
    { path: '/my/profile',      name: 'Profile',        component: () => import("./views/Account/Profile.vue"),    condition: () => User.CurrentUser !== null },
    { path: '/my/apps',         name: 'MyApps',         component: () => import("./views/Account/Apps.vue"),       condition: () => User.CurrentUser !== null },
    { path: '/my/sessions',     name: 'Sessions',       component: () => import("./views/Account/Sessions.vue"),   condition: () => User.CurrentUser !== null },
    { path: '/my/security',     name: 'Security',       component: () => import("./views/Account/Security.vue"),   condition: () => User.CurrentUser !== null },
    { path: '/my/settings',     name: 'Settings',       component: () => import("./views/Account/Settings.vue"),   condition: () => User.CurrentUser !== null }
];

// 404 redirection
routes.push({ path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./views/NotFound.vue") });

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from) => {
    const route = routes.find(r => r.name === to.name);
    if (route.condition === undefined) return true;

    return route.condition() ? true : { name: "Home" };
});

createApp(App).use(router).mount('#app');
