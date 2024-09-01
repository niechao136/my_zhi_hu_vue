import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'web',
      component: () => import('@/layout/web.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/page/web/home.vue'),
        },
        {
          path: '/ranking',
          name: 'rank',
          component: () => import('@/page/web/rank.vue'),
        },
        {
          path: '/watching',
          name: 'watch',
          component: () => import('@/page/web/watch.vue'),
        },
        {
          path: '/people/:id',
          name: 'people',
          component: () => import('@/page/web/people.vue'),
        },
        {
          path: '/question/:id',
          name: 'question',
          component: () => import('@/page/web/question.vue'),
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/page/web/search.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/web/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/page/web/register.vue'),
    },
  ]
})

export default router
