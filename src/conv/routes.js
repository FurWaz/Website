export default [
    { path: '', name: 'Home', component: () => import("./views/Home.vue") },
    { path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./views/NotFound.vue") },
];