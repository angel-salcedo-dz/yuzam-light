import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import About from "@/views/About.vue";
import Faq from "@/views/Faq.vue";
import ContactUs from "@/views/ContactUs.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                transition: 'fade',
                title: 'Yuzam Lighting | Iluminación para Bodas y Eventos'
            },
        },
        {
            path: '/quienes-somos',
            name: 'about',
            component: About,
            meta: {
                transition: 'fade',
                title: 'Yuzam Lighting | Quiénes somos'
            },
        },
        {
            path: '/preguntas-frecuentes',
            name: 'faq',
            component: Faq,
            meta: {
                transition: 'fade',
                title: 'Yuzam Lighting | Preguntas frecuentes'
            },
        },
        {
            path: '/contactanos',
            name: 'contact-us',
            component: ContactUs,
            meta: {
                transition: 'fade',
                title: 'Yuzam Lighting | Contáctanos'
            },
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

router.beforeEach((to) => {
    const { title, description } = to.meta;
    const defaultTitle = 'Default Title';

    document.title = title || defaultTitle

})

export default router
