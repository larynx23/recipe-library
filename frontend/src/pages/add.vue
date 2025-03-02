<template>
  <Layout>
    <main class='min-h-screen max-w-5xl mx-auto px-2 py-4 pt-24 grid gap-2'>
      <RecipeForm 
        :initial-data="recipe"
        @submit="submitRecipe"/>
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
    ...mapActions(useRecipeStore, ['postRecipe']),
    async submitRecipe(recipeData) {
      if (this.isSubmitting) {
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        const formData = new FormData();
        
        if (recipeData.image instanceof File) {
          formData.append('image', recipeData.image);
        }
        
        const recipeDataToSend = { ...recipeData };
        delete recipeDataToSend.image;
        delete recipeDataToSend.imagePreview;
        
        formData.append('recipe', JSON.stringify(recipeDataToSend));
        
        const newRecipe = (await this.postRecipe(formData)).data;
        this.$router.push(`/recipe/${newRecipe.id}`);
      } catch (error) {
        console.error('Error creating recipe:', error);
        alert("Hiba történt, próbálja újra");
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  components: {
    Layout,
    RecipeForm
  }
};
</script>