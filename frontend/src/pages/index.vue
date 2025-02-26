<template>
  <Layout>
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-500 dark:border-zinc-300"></div>
    </div>

    <article v-else class="flex flex-wrap">
      <section class="w-full">
        <p class="pt-5 dark:text-white  text-center">
          A jól kiválasztott recept bizony nem elég a sütemények készítéséhez. Legtöbbször felületesek a leírások, és
          alapvető lépéseket nem tartalmaznak.
          Minden esetben olvasd végig a receptet és számold meg a hozzávalók mennyiségét. Ha olyan sütit készítesz,
          amelyet nyújtani kell, akkor számolj még pluszban liszttel a süti nyújtásához, illetve nagy valószínűséggel
          szükséged lesz még plusz tojásra a tészta kenéséhez. Sok esetben ez nem derül ki a receptből.
        </p>
      </section>
      <section class="w-full my-5">
        <div class="dropdown flex justify-end">
          <button type="button"
            class="flex items-center px-10 py-2 rounded-md border-2 dark:border-white dark:text-white hover:border-zinc-500 dark:bg-zinc-900 border-black text-black bg-zinc-400 transition-colors duration-200"
            @click="toggleDropdown">
            <img src="/images/filter.svg" class="w-[27px] mr-2" alt="Filter">
            Szűrő
          </button>
          <div v-show="isDropdownOpen" class="z-10 absolute mt-12 bg-zinc-800 shadow-lg rounded-md overflow-hidden">
            <div v-for="(type, index) in types" :key="type" class="hover:bg-zinc-600 transition-colors duration-200">
              <label class="flex items-center px-4 py-2 text-white cursor-pointer w-full">
                <input 
                  type="checkbox" 
                  :id="`${type}_check`" 
                  class="w-4 h-4 mr-2"
                  v-model="selectedTypes[index]"
                  @change="filterRecipes"
                >
                {{ type }}
              </label>
            </div>
          </div>
        </div>
      </section>
    </article>
    <div class="grid justify-items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
      <RecipeCard v-for="r in filteredRecipes" :recipe="r" />
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { useRecipeStore } from '@stores/RecipeStore';
import { mapActions } from 'pinia';

export default {
  components: {
    Layout,
    RecipeCard
  },

  data() {
    return {
      isLoading: true,
      isDropdownOpen: false,
      types: ["előétel", "főétel", "desszert", "egyéb"],
      selectedTypes: [false, false, false, false],
      recipes: [],
      filteredRecipes: []
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    filterRecipes() {
      if (this.selectedTypes.every(type => !type)) {
        this.filteredRecipes = this.recipes;
        return;
      }

      this.filteredRecipes = this.recipes.filter(recipe => {
        const recipeTypeIndex = recipe.type - 1;
        return this.selectedTypes[recipeTypeIndex];
      });
    },
    ...mapActions(useRecipeStore, ['getRecipes']),
  },
  async mounted() {
    try {
      this.recipes = await this.getRecipes()
      this.filteredRecipes = this.recipes;
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>