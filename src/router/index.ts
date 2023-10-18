import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginAndRegister from "../views/LoginAndRegister.vue";
import DisplayDataView from "../views/DisplayDataView.vue";

const baseUrl = import.meta.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/loginregister",
      name: "loginregister",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginAndRegister
      //component: () => import('../views/LoginAndRegister.vue')
    },
    {
      path: "/displaydata",
      name: "displaydata",
      component: DisplayDataView
      //component: () => import('../views/LoginAndRegister.vue')
    }
  ]
});

export default router;
