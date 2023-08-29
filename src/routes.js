import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue'


const routes = [
    { path: '/homeProva', component: AppHome, name: 'home' },
     
  ]

const router = createRouter({
    history:createWebHistory(),routes
})

export {router}