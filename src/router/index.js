
import { createRouter , createWebHistory } from "vue-router"

import devis from "../component/views/devis.vue"

import home from "../component/views/home.vue"


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
        path:"/:catchAll(.*)",
        redirect:"/",
        meta: {
            title: "Page non trouvée"
        }
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router 
