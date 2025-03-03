import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from '@stores/auth';

import Index from "../pages/index.vue";
import Recipe from "../pages/recipe.vue";
import AddRecipe from "../pages/add.vue";
import EditRecipe from "../pages/edit.vue";
import Auth from "../pages/auth.vue";

const routes = [
  {
    name: "index",
    path: "/",
    component: Index,
  },
  {
    name: "recipe",
    path: "/recipe/:id",
    component: Recipe,
  },
  {
    name: "add",
    path: "/add",
    component: AddRecipe,
  },
  {
    name: "edit",
    path: "/recipe/edit/:id",
    component: EditRecipe,
  },
  {
    name: "register",
    path: "/register",
    component: Auth,
  },
  {
    name: "login",
    path: "/login",
    component: Auth,
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicRoutes = ['/login', '/register'];

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (publicRoutes.includes(to.path)) {
    next();
    return;
  }

  if (!auth.isAuthenticated) {
    next('/login');
    return;
  }

  next();
});
