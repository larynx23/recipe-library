import { createWebHistory, createRouter } from "vue-router";

import Index from "../pages/index.vue";
import Recipe from "../pages/recipe.vue";
import AddRecipe from "../pages/add.vue";
import EditRecipe from "../pages/edit.vue";
import Auth from "../pages/auth.vue";
import Profile from "../pages/profile.vue";

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
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
