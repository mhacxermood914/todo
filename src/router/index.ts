import { createRouter, createWebHistory } from 'vue-router'
import BoardLayout from '@/layouts/BoardLayout.vue'
import useAuthUser from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
    },
    {
      path: '/board',
      component: BoardLayout, 
      children: [
        {
          path: '', 
          name: 'board',
          meta: {
            requiresAuth: true,
          },
          component: () => import('@/views/board/Home.vue'),
        },
        {
          path: ':id', 
          meta: {
            requiresAuth: true,
          },
          name: 'board-detail',
          component: () => import('@/views/board/Overview.vue'),
        },
      ],
    },
  
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: 'login' }
  }
})

export default router
