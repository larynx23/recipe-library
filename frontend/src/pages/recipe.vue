<template>
  <Layout>
    <div class="relative max-w-4xl mx-auto p-8 bg-gray-400">
      <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img src="" class="w-64 h-64 bg-gray-200 object-cover"/>
        <h1 class="text-4xl">{{ example_recipe.name }}</h1>
        <div class="bg-gray-200 p-3 absolute top-8 right-8">
          <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg">Servings</h2>
          <div class="flex items-center">
            <button @click="decreaseServings" class="w-6 h-6 flex items-center justify-center bg-gray-400 hover:bg-gray-300" :disabled="servings <= 1">-</button>
            <p class="text-center ml-2 mr-2">{{ servings }}</p>
            <button @click="increaseServings" class="w-6 h-6 flex items-center justify-center bg-gray-400 hover:bg-gray-300">+</button>
      </div></div>
  </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-12">
        <div class="bg-gray-200 p-6">
          <h2 class="text-2xl mb-6">Ingredients</h2>
          <ul class="space-y-4">
            <li 
              v-for="(amount, ingredient) in example_recipe.ingridients" :key="ingredient" class="flex justify-between items-center">
              <span class="font-medium">{{ ingredient }}</span>
              <span>{{ amount }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-200 p-6 ">
          <h2 class="text-2xl mb-6">Instructions</h2>
          <ol class="space-y-4">
            <li v-for="(step, index) in example_recipe.steps" :key="index" class="flex gap-4">
              <span class="font-bold min-w-[1.5rem]">{{ index }}.</span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue';

export default {
  data() {
    return {
      id: this.$route.params.id,
      servings: 1,
      example_recipe: {
        'name': 'recipe name',
        'ingredients': {
          'eggs': '100g',
          'flour': '200g'
        },
        'steps': {
          1: 'put in',
          2: 'mix',
          3: 'done'
        }
      }
    }
  },
  methods: {
    fetchRecipe(id) {
      const r = 0;
      return r;
    },
    increaseServings() {
    this.servings++;
  },
  decreaseServings() {
    if (this.servings > 1) {
      this.servings--;
    }
  }
  },
  components: {
    Layout
  }
}
</script>