// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Doors from '../views/Doors.vue';
import Favorites from '../components/Favorites.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/doors', component: Doors },
  { path: '/favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
