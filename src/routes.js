import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';


const routes = [
    { path: '/', component: AppHome, name: 'home' },
    { path: '/apartments/:id', component: AppShowApartment, name: 'show-apartments' },
     
  ]

const router = createRouter({
    history:createWebHistory(),routes
})

export {router}