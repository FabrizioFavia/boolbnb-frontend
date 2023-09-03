import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';
import AppError from './pages/AppError.vue';
import AdvancedSearch from './pages/AdvancedSearch.vue'

const routes = [
    { path: '/', component: AppHome, name: 'home' },
    { path: '/advancedSearch/:search', component: AdvancedSearch, name: 'advancedSearch', props: true },
    { path: '/apartments/:id', component: AppShowApartment, name: 'show-apartments' },
    { path: '/error/:code', component: AppError, name: 'error', props: true }
  ]

const router = createRouter({
    history:createWebHistory(),routes
})

export {router}