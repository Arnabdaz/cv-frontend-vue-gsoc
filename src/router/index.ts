import { createRouter, createWebHistory } from 'vue-router'
import index from '../pages/index.vue'
import simulator from '../pages/simulator.vue'

const routes = [
    {
        path: '/',
        // name: 'index',
        // component: index,
        redirect: '/simulator',
    },
    {
        path: '/simulator',
        name: 'simulator',
        component: simulator,
        // props: true,
        children: [
            {
                path: 'edit/:projectId',
                name: 'simulator-edit',
                component: simulator,
                props: true,
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        component: index,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
