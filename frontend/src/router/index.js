import { createWebHistory, createRouter } from "vue-router";

import Index from "../pages/index.vue";
import Recipe from "../pages/recipe.vue";

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
