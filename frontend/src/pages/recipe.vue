<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2' @click="selectStep(null)">
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
            <span>{{ ingredient.count * servings }}</span> {{ ingredient.unit }}
          </li>
        </ul>
      </section>

      <section class="py-2">
        <div class="border-t border-zinc-600 dark:border-white py-2">
          <h2 class="font-bold mb-0 dark:text-white">Elkészítés</h2>
        </div>
        <ol class="pl-2 list-none">
          <li v-for="(step, i) in recipe.steps" :key="i"
            class="p-2 text-lg mb-2 transition-all duration-200 cursor-pointer bg-zinc-200 dark:bg-zinc-900 dark:text-white hover:translate-x-2.5 hover:bg-zinc-400 dark:hover:bg-zinc-700"
            :class="{ 'translate-x-2.5 bg-zinc-400 dark:bg-zinc-700': selectedStep === i }"
            @click.stop="selectStep(i)">
            <span class="text-zinc-500 dark:text-zinc-400">{{ i + 1 }}. </span>
            {{ step }}
          </li>
        </ol>
      </section>
    </main>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue'

export default {
  components: {
    Layout
  },

  data() {
    return {
      selectedStep: null,
      recipe: {
        name: 'Recipe Name',
        image: 'example.jpg',
        default_serving: 8,
        difficulty: 3,
        cost: 2,
        prepare_time: 30,
        cooking_time: 45,
        time: 75,
        ingredients: [
          { count: 2, unit: 'db tojás' },
          { count: 200, unit: 'g liszt' }
        ],
        steps: [
          'First step instruction',
          'Second step instruction',
          'Third step instruction'
        ]
      },
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
    }
  },

  mounted() {
    this.servings = this.recipe.default_serving;
  }
}
</script>