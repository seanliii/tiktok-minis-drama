import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/drama/:id',
    component: () => import('@/views/DramaDetail.vue'),
  },
  {
    path: '/player/:dramaId/:epId',
    component: () => import('@/views/Player.vue'),
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
