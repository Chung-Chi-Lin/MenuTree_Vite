import { createRouter, createWebHashHistory } from 'vue-router';
import SidebarMenu from '@/views/SidebarMenu.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SidebarMenu',
      component: SidebarMenu
    },
  ]
})

export default router

