<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2' @click="selectStep(null)">
      <div class="flex justify-between">
        <RouterLink to="/add"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
            <svg class="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
        </RouterLink>
        <button @click="deleteRecipe"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
            <svg class="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
      </div>
      <section class="flex flex-col items-center gap-4" >
        <h1 class="text-4xl font-bold dark:text-white">{{ recipe.name }}</h1>

        <div class="flex items-center justify-center gap-4">
          <div class="grid justify-items-center gap-1.5">
            <img src="/images/levels.svg" alt="difficulty" class="w-8">
            <p class="text-sm mb-0 dark:text-white">{{ getDifficulty }}</p>
          </div>
          <div class="grid justify-items-center gap-1.5">
            <img src="/images/wallet.svg" alt="cost" class="w-8">
            <p class="text-sm mb-0 dark:text-white">{{ getCost }}</p>
          </div>
        </div>

        <img :src="`/images/recipes/${recipe.image}`" :alt="recipe.name" 
          class="max-w-[650px] max-h-[350px] w-full rounded md:w-auto shadow-md">

        <table class="w-full max-w-xl bg-zinc-400 dark:bg-zinc-600 table-fixed dark:text-white">
          <tr>
            <th class="bg-zinc-500 dark:bg-zinc-700 border-b border-zinc-400 dark:border-zinc-600 py-1 px-4">
              Előkészítés
            </th>
            <th class="bg-zinc-500 dark:bg-zinc-700 border-b border-zinc-400 dark:border-zinc-600 py-1 px-4">
              Elkészítés
            </th>
            <th class="bg-zinc-500 dark:bg-zinc-700 border-b border-zinc-400 dark:border-zinc-600 py-1 px-4">
              Összesen
            </th>
          </tr>
          <tr class="text-center">
            <td class="py-1 px-4">{{ formatTime(recipe.prepare_time) }}</td>
            <td class="py-1 px-4">{{ formatTime(recipe.cooking_time) }}</td>
            <td class="py-1 px-4">{{ formatTime(recipe.time) }}</td>
          </tr>
        </table>
      </section>

      <section class="grid grid-cols-1 text-lg">
        <div class="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 border-t border-zinc-600 dark:border-white py-2">
          <h2 class="font-bold mb-0 dark:text-white">Hozzávalók</h2>
          <button @click="decreaseServings" 
            class="w-9 h-9 flex items-center justify-center disabled:opacity-50"
            :disabled="servings <= 1">
            <div class="w-5 h-1 bg-black dark:bg-white rounded-full"></div>
          </button>
            <input type="number" v-model="servings" min="1" max="99"
            class="w-7 p-1 border border-black text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
          <p class="mb-0 font-bold dark:text-white">adag</p>
          <button @click="increaseServings"
            class="w-9 h-9 flex items-center justify-center"
            :disabled="servings >= 99">
            <div class="relative">
              <div class="w-5 h-1 bg-black dark:bg-white rounded-full"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-5 bg-black dark:bg-white rounded-full"></div>
            </div>
          </button>
        </div>
        <ul class="dark:text-white">
          <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
            <span>{{ (((parseFloat(ingredient.count) || 0) * servings) / recipe.default_serving).toFixed(1) }}</span> {{ ingredient.unit }}
          </li>
        </ul>
      </section>

      <section class="py-2">
        <div class="border-t border-zinc-600 dark:border-white py-2">
          <h2 class="font-bold mb-0 dark:text-white">Elkészítés</h2>
        </div>
        <ol class="pl-2 list-none">
          <li v-for="(step, i) in recipe.steps" :key="i"
            class="p-2 text-lg mb-2 transition-all duration-200 cursor-pointer bg-zinc-300 dark:bg-zinc-900 dark:text-white hover:translate-x-2.5 hover:bg-zinc-400 dark:hover:bg-zinc-700"
            :class="{ 'translate-x-2.5 bg-zinc-400 dark:bg-zinc-700': selectedStep === i }"
            @click.stop="selectStep(i)">
            <span class="text-zinc-500 dark:text-zinc-400">{{ i + 1 }}. </span>
            {{ step.description }}
          </li>
        </ol>
      </section>
    </main>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import { mapActions } from 'pinia';
import { useRecipeStore } from '@stores/RecipeStore';

export default {
  components: {
    Layout
  },
  data() {
    return {
      selectedStep: null,
      recipe: {},
      servings: 1
    }
  },

  computed: {
    getDifficulty() {
      const difficulties = ['Nagyon könnyű', 'Könnyű', 'Közepes', 'Nehéz', 'Nagyon nehéz']
      return difficulties[this.recipe.difficulty - 1] || 'Ismeretlen'
    },

    getCost() {
      const costs = ['Olcsó', 'Átlagos', 'Drága']
      return costs[this.recipe.cost - 1] || 'Ismeretlen'
    }
  },

  methods: {
    ...mapActions(useRecipeStore, ['getRecipe']),
    ...mapActions(useRecipeStore, ['removeRecipe']),
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return hours ? `${hours}ó ${mins}p` : `${mins}p`
    },

    increaseServings() {
      if (this.servings < 99) this.servings++
    },

    decreaseServings() {
      if (this.servings > 1) this.servings--
    },

    selectStep(index) {
      this.selectedStep = index
    },
    async deleteRecipe() {
      try {
        if (confirm("Biztosan törölni szeretné a receptet?")){
          await this.removeRecipe(this.$route.params.id)
          this.$router.push({ path: '/' })
        }
        
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert("Hiba történt, próbálja újra")
      }
    }
  },

  async mounted() {
    this.recipe = await this.getRecipe(this.$route.params.id)
    this.servings = this.recipe.default_serving;
  }
}
</script>