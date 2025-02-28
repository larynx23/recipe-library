<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2'>
      <RecipeForm v-if="recipe.name"
        :initial-data="recipe"
        @submit="editRecipe"/>
    </main>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue';
import RecipeForm from '../components/RecipeForm.vue';
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
        image: null,
        imagePreview: null,
        ingredients: [],
        steps: [],
        user_id: 1
      },
      isSubmitting: false
    };
  },
  methods: {
    ...mapActions(useRecipeStore, ['updateRecipe', 'getRecipe']),
    async fetchRecipe() {
      try {
        const recipeId = this.$route.params.id;
        const recipeData = (await this.getRecipe(recipeId)).data;
        
        if (recipeData.image) {
          const imagePath = recipeData.image.replace(/^\//, '');
          recipeData.imagePreview = `http://127.0.0.1:8080/storage/${imagePath}`;
        }
        
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
    async editRecipe(recipeData) {
      if (this.isSubmitting) {
        return;
      }
      
      this.isSubmitting = true;

      try {
        const recipeId = this.$route.params.id;
        const formData = new FormData();
        
        if (recipeData.image instanceof File) {
          formData.append('image', recipeData.image);
        }
        
        const recipeDataToSend = { ...recipeData };
        delete recipeDataToSend.image;
        delete recipeDataToSend.imagePreview;
        
        formData.append('recipe', JSON.stringify(recipeDataToSend));
        await this.updateRecipe({ id: recipeId, formData: formData });
        this.$router.push(`/recipe/${recipeId}`);
      } catch (error) {
        console.error('Error updating recipe:', error);
        alert('Hiba történt a recept mentésekor');
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  async created() {
    await this.fetchRecipe();
  },
  components: {
    Layout,
    RecipeForm
  }
};
</script>