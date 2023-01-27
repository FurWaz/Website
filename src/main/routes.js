export default [
    { path: '/', name: 'Home', component: () => import("./views/Home.vue") },
    { path: '/login', name: 'Login', component: () => import("./views/Login.vue") },
    { path: '/register', name: 'Register', component: () => import("./views/Register.vue") },
    { path: '/account', name: 'Account', component: () => import("./views/Account.vue") },
    { path: '/apps', name: 'Apps', component: () => import("./views/Apps.vue") },
    { path: '/projects', name: 'Projects', component: () => import("./views/Projects.vue") },
    { path: '/about', name: 'About', component: () => import("./views/About.vue") }
];