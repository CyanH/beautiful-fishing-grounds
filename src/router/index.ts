import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/industrialPark.vue'), //产业园一张图
  },
  {
    path: '/breed',
    name: 'breed',
    component: () => import('@/views/breed.vue'), //种植一张图
  },
  {
    path: '/digital',
    name: 'digital',
    component: () => import('@/views/digital.vue'), //数字三维
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
