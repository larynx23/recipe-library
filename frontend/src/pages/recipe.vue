<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2' @click="selectStep(null)">
      <div class="flex justify-between">
        <RouterLink :to='`edit/${this.$route.params.id}`'
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

        <img :src="imageUrl" :alt="recipe.name" 
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
            <td class="py-1 px-4">{{ formatTime(getTotalTime) }}</td>
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
      const difficulties = ['Könnyű', 'Közepes', 'Nehéz']
      return difficulties[this.recipe.difficulty - 1] || 'Ismeretlen'
    },

    getCost() {
      const costs = ['Olcsó', 'Átlagos', 'Drága']
      return costs[this.recipe.cost - 1] || 'Ismeretlen'
    },

    getTotalTime() {
      return this.recipe.cooking_time + this.recipe.prepare_time
    },

    imageUrl() {
      if (this.recipe?.image) {
        const imagePath = this.recipe.image.replace(/^\//, '');
        return `http://127.0.0.1:8080/storage/${imagePath}`;
      }
      
      switch(this.recipe?.type) {
        case 1:
          return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M439.2 1.2c11.2-3.2 23.2-.1 31.4 8.1L518 56.7l-26.5 7.9c-58 16.6-98.1 39.6-129.6 67.4c-31.2 27.5-53.2 59.1-75.1 90.9l-2.3 3.3C241.6 288.7 195 356.6 72.8 417.7L37.9 435.2 9.4 406.6c-7.3-7.3-10.6-17.6-9-27.8s8.1-18.9 17.3-23.5C136.1 296.2 180.9 231 223.3 169.3l2.3-3.4c21.8-31.8 44.9-64.9 77.7-93.9c33.4-29.5 75.8-53.6 135.9-70.8zM61.8 459l25.4-12.7c129.5-64.7 179.9-138.1 223.8-202l2.2-3.3c22.1-32.1 42.1-60.5 69.9-85.1c27.5-24.3 63.4-45.2 117.3-60.6c0 0 0 0 0 0l.2-.1 43.1-12.9 23 23c8 8 11.2 19.7 8.3 30.7s-11.3 19.6-22.2 22.7c-51.9 14.8-85.6 34.7-111.1 57.2c-26.1 23-45.1 49.9-67.3 82.1l-2.2 3.2C327.8 365.9 275.5 442 142.3 508.6c-12.3 6.2-27.2 3.7-36.9-6L61.8 459z"/></svg>');
        case 2:
          return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M176 56c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24zm24 48l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256l457.1 0c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28l-231.5 0c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24zm-24-96l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24zm-24-96l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32l16 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-16 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>');
        case 3:
          return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M247.2 17c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9l-14.6-82.8c-3.9-22.1-14.6-42.3-30.7-57.9L388.9 57.5c-16.1-15.6-36.6-25.6-58.7-28.7L247.2 17zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>');
        case 4:
          return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 64c0-17.7 14.3-32 32-32l320 0 64 0c70.7 0 128 57.3 128 128s-57.3 128-128 128l-32 0c0 53-43 96-96 96l-192 0c-53 0-96-43-96-96L96 64zM480 224l32 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0 0 128zM32 416l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>');
      }
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