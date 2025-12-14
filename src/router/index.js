
import { createRouter , createWebHistory } from "vue-router"

import devis from "../component/views/devis.vue"

import home from "../component/views/home.vue"
import Dashboard from "../component/views/dashboard.vue"

const routes = [
    {
        path:'/',
        name:"home",
        component:home
    },
    {
        path:"/devis",
        name:"devis",
        component:devis
    },
    {
        path:"/d",
        name:"d",
        component:Dashboard
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router 
