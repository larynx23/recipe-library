import { defineStore } from 'pinia';
import { http } from '@utils/http';

export const useRecipeStore = defineStore('recipes', {
    state() {
        return {
            recipes: []
        }
    },
    actions: {
        async getRecipes(userId){
            const r = await http.get(`api/recipes?user_id=${userId}`);
            return r.data;
        },
        async getRecipe(id) {
            const r = await http.get(`api/recipes/${id}`);
            return r.data;
        },
        async postRecipe(recipe) {
            const r = await http.post(`api/recipes`, recipe);
            return r.data;
        },
    }
})