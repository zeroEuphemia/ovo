import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'lssampling',
        component: () => import('../views/LSsampling.vue')
    },
]

// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
