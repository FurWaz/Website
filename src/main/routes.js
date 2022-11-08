export default [
    { path: '/', name: 'Home', component: () => import("./views/Home.vue") },
    { path: '/login', name: 'Login', component: () => import("./views/Login.vue") },
    { path: '/register', name: 'Register', component: () => import("./views/Register.vue") },
    { path: '/profile', name: 'Profile', component: () => import("./views/Profile.vue") },
    { path: '/apps', name: 'Apps', component: () => import("./views/Apps.vue") },
    { path: '/projects', name: 'Projects', component: () => import("./views/Projects.vue") }
];