<template>
  <RouterLink
    :to="`/recipe/${recipe.id}`"
    class="bg-zinc-400 dark:bg-zinc-700 flex flex-col justify-center items-center w-64 p-5 transform transition duration-300 hover:scale-105">
    <img :src="`/images/${recipe.name}.jpg`" class="w-20 h-20" />
    <h3 class="text-2xl p-2 text-black dark:text-white">{{ recipe.name }}</h3>
    <p class="text-black dark:text-zinc-200">{{ recipe.description }}</p>
    <hr class="w-full my-2 border-black dark:border-white" />
    <div class="w-full text-black dark:text-white">
      <div class="flex justify-between">
        <p>{{ getTotalTime }}</p>
        <p>{{ getDifficulty }}</p>
      </div>
      <div class="flex justify-between">
        <p>{{ getType }}</p>
        <p>{{ getCost }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    recipe: {
      required: true
    }
  },

  computed: {
    getDifficulty() {
      const difficulties = ['könnyű', 'közepes', 'nehéz']
      return difficulties[this.recipe.difficulty - 1] || 'ismeretlen'
    },

    getCost() {
      const costs = ['olcsó', 'átlagos', 'drága']
      return costs[this.recipe.cost - 1] || 'ismeretlen'
    },

    getType() {
      const costs = ['előétel', 'főétel', 'desszert', 'egyéb']
      return costs[this.recipe.type - 1] || 'ismeretlen'
    },

    getTotalTime() {
      return this.recipe.cooking_time + this.recipe.prepare_time
    }

  }
}
</script>