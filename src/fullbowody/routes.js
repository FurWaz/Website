export default [
    { path: '', name: 'Home', component: () => import("./views/Home.vue") },
    { path: '/addons', name: 'Addons', component: () => import("./views/Addons.vue") },
    { path: '/docs', name: 'Docs', component: () => import("./views/Documentation.vue") },
];