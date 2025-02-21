import { createWebHistory, createRouter } from "vue-router";

import Index from "../pages/index.vue";
import Recipe from "../pages/recipe.vue";
import AddRecipe from "../pages/add.vue";

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
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
