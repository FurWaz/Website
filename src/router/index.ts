import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import User from "../scripts/User";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/',                name: 'Home',           component: HomeView,                                        beforeEnter: () => true },
        { path: '/privacy',         name: 'Privacy',        component: () => import("../views/LegalDocView.vue"),       beforeEnter: () => true },
        { path: '/terms',           name: 'Terms',          component: () => import("../views/LegalDocView.vue"),       beforeEnter: () => true },
        { path: '/register',        name: 'Register',       component: () => import("../views/Register.vue"),           beforeEnter: () => true },
        { path: '/login',           name: 'Login',          component: () => import("../views/Login.vue"),              beforeEnter: () => true },
        { path: '/about',           name: 'About',          component: () => import("../views/About.vue"),              beforeEnter: () => true },
        { path: '/projects',        name: 'Projects',       component: () => import("../views/Projects.vue"),           beforeEnter: () => true },
        { path: '/portal',          name: 'Portal',         component: () => import("../views/Portal.vue"),             beforeEnter: () => true },
        { path: '/verify/email',    name: 'VerifyEmail',    component: () => import("../views/VerifyEmail.vue"),        beforeEnter: () => true },
        { path: '/reset/password',  name: 'ResetPassword',  component: () => import("../views/ResetPassword.vue"),      beforeEnter: () => true },
        // { path: '/buy',             name: 'Buy',            component: () => import("../views/Buy.vue"),                beforeEnter: () => User.CurrentUser !== null },
        // { path: '/checkout',        name: 'Checkout',       component: () => import("../views/Checkout.vue"),           beforeEnter: () => User.CurrentUser !== null },
        // { path: '/checkout/status', name: 'CheckoutStatus', component: () => import("../views/CheckoutStatus.vue"),     beforeEnter: () => User.CurrentUser !== null },
        { path: '/my',              name: 'Account',        component: () => import("../views/Account.vue"),            beforeEnter: () => User.CurrentUser !== null },
        { path: '/my/profile',      name: 'Profile',        component: () => import("../views/Account/Profile.vue"),    beforeEnter: () => User.CurrentUser !== null },
        { path: '/my/apps',         name: 'MyApps',         component: () => import("../views/Account/Apps.vue"),       beforeEnter: () => User.CurrentUser !== null },
        { path: '/my/security',     name: 'Security',       component: () => import("../views/Account/Security.vue"),   beforeEnter: () => User.CurrentUser !== null },

        // 404 redirect
        { path: "/:catchAll(.*)", name: 'NotFound', component: () => import("../views/NotFound.vue") }
    ]
});

// User access control
router.beforeEach((to) => {
    const route = router.getRoutes().find(route => route.name === to.name);
    if (route === undefined) return { name: "NotFound" };

    if (route.beforeEnter === undefined) return true;
    return (route.beforeEnter as any)() ? true : { name: "Home" };
});

export default router;
