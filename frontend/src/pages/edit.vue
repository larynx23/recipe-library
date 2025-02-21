<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2'>
      <form class="max-w-2xl mx-auto" @submit.prevent="editRecipe">
        <div class="space-y-6">
          <div>
            <label class="block text-lg text-black font-bold dark:text-white mb-1">Név</label>
            <input v-model="recipe.name" type="text" class="w-full p-2 border rounded" required>
          </div>

          <div class="mt-6">
            <input 
              type="file" 
              @change="imageUpload" 
              accept="image/*" 
              class="w-full dark:text-white text-black">
            <div v-if="recipe.imagePreview || recipe.image" class="mt-2">
              <img :src="recipe.imagePreview || recipe.image" alt="Recept kép" class="w-32 h-32 object-cover">
            </div>
          </div>

          <div>
            <select 
              v-model.number="recipe.type" 
              class="w-full p-2 border rounded"
              required>
              <option :value="1">Előétel</option>
              <option :value="2">Főétel</option>
              <option :value="3">Desszert</option>
              <option :value="3">Egyéb</option>
            </select>
          </div>

          <div>
            <label class="block text-md text-black dark:text-white mb-1">Leírás</label>
            <textarea 
              v-model="recipe.description" 
              class="w-full p-2 border rounded"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-md text-black dark:text-white mb-1">Előkészítés idő (percben)</label>
              <input 
                v-model.number="recipe.prepare_time" 
                type="number" 
                class="w-full p-2 border rounded"
                min="0"
                required
              >
            </div>
            <div>
              <label class="block text-md text-black dark:text-white mb-1">Sütés idő (percben)</label>
              <input 
                v-model.number="recipe.cooking_time" 
                type="number" 
                class="w-full p-2 border rounded"
                min="0"
                required
              >
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-md text-black dark:text-white mb-1">Ár</label>
              <select 
                v-model.number="recipe.cost" 
                class="w-full p-2 border rounded"
                required
              >
                <option :value="1">Olcsó</option>
                <option :value="2">Átlagos</option>
                <option :value="3">Drága</option>
              </select>
            </div>
            <div>
              <label class="block text-md text-black dark:text-white">Nehézség</label>
              <select 
                v-model.number="recipe.difficulty" 
                class="w-full p-2 border rounded"
                required
              >
                <option :value="1">Könnyű</option>
                <option :value="2">Közepes</option>
                <option :value="3">Nehéz</option>
              </select>
            </div>
            <div>
              <label class="block text-md text-black dark:text-white mb-1">Adagok</label>
              <input 
                v-model.number="recipe.default_serving" 
                type="number" 
                class="w-full p-2 border rounded"
                min="1"
                required>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-bold text-black dark:text-white mb-2">Hozzávalók</h3>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="`ingredient-${index}`" class="flex gap-2 mb-2">
              <input 
                v-model.number="ingredient.count" 
                type="number" 
                placeholder="Adag"
                class="w-24 p-2 border rounded"
                min="0"
                step="0.1"
                required>
              <input 
                v-model="ingredient.unit" 
                type="text" 
                placeholder="Mértékegység és megnevezés"
                class="flex-1 p-2 border rounded"
                required>
              <button type="button" @click="removeIngredient(index)" class="px-3 py-2 bg-red-500 text-white rounded">
                Törlés
              </button>
            </div>
            <button 
              type="button" 
              @click="addIngredient"
              class="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Új hozzávaló
            </button>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-bold text-black dark:text-white mb-2">Lépések</h3>
            <div v-for="(step, index) in recipe.steps" :key="`step-${index}`" class="flex gap-2 mb-2">
              <span class="flex items-center px-3 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white rounded">{{ index + 1 }}</span>
              <textarea 
                v-model="step.description" 
                placeholder="Step description"
                class="flex-1 p-2 border rounded"
                rows="2"
                required></textarea>
              <button 
                type="button" 
                @click="removeStep(index)"
                class="px-3 py-2 bg-red-500 text-white rounded">
                Törlés
              </button>
            </div>
            <button 
              type="button" 
              @click="addStep"
              class="mt-2 px-4 py-2 bg-green-500 text-white rounded">
              Új lépés
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="mt-6 w-full px-4 py-2 dark:bg-zinc-900 text-white rounded dark:hover:bg-zinc-700 bg-zinc-400 hover:bg-zinc-600"
        >
          Recept mentése
        </button>
      </form>
    </main>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue';
import { useRecipeStore } from '@stores/RecipeStore';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      recipe: {
        name: '',
        type: 2,
        cost: 2,
        difficulty: 2,
        description: '',
        prepare_time: 0,
        cooking_time: 0,
        default_serving: 1,
        image: '',
        ingredients: [],
        steps: [],
        user_id: 1
      }
    };
  },
  methods: {
    ...mapActions(useRecipeStore, ['updateRecipe', 'getRecipe']),
    addIngredient() {
      this.recipe.ingredients.push({
        count: 0,
        unit: ''
      });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addStep() {
      this.recipe.steps.push({
        index: this.recipe.steps.length,
        description: ''
      });
    },
    removeStep(index) {
      this.recipe.steps.splice(index, 1);
      this.recipe.steps.forEach((step, i) => {
        step.index = i;
      });
    },
    async fetchRecipe() {
      try {
        const recipeId = this.$route.params.id;
        const recipeData = await this.getRecipe(recipeId);
        this.recipe = {
          ...recipeData,
          steps: recipeData.steps || [],
          ingredients: recipeData.ingredients || []
        };
      } catch (error) {
        console.error('Error fetching recipe:', error);
        alert('Hiba történt a recept betöltésekor');
      }
    },
    async editRecipe() {
      try {
        const recipeId = this.$route.params.id;
        await this.updateRecipe({ id: recipeId, recipe: this.recipe });
        this.$router.push(`/recipe/${recipeId}`);
      } catch (error) {
        console.error('Error updating recipe:', error);
        alert('Hiba történt a recept mentésekor');
      }
    }
  },
  async created() {
    await this.fetchRecipe();
  },
  components: {
    Layout
  }
};
</script>