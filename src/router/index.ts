import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginAndRegister from '../views/LoginAndRegister.vue';
import EditView from '../views/EditView.vue';
import DeleteView from '../views/DeleteView.vue';
import DisplayDataView from '../views/DisplayDataView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/loginregister',
      name: 'loginregister',
      component: LoginAndRegister
      //component: () => import('../views/LoginAndRegister.vue')
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditView
      //component: () => import('../views/LoginAndRegister.vue')
    },
    {
      path: '/delete',
      name: 'delete',
      component: DeleteView
      //component: () => import('../views/LoginAndRegister.vue')
    },
    {
      path: '/displaydata',
      name: 'displaydata',
      component: DisplayDataView
      //component: () => import('../views/LoginAndRegister.vue')
    }
  ]
})

export default router
