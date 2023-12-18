// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Doors from '../views/Doors.vue';
import Favorites from '../components/Favorites.vue'
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/doors', component: Doors },
  { path: '/favorites', component: Favorites },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
