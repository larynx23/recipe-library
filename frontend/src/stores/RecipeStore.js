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
            const r = await http.get(`recipes?user_id=${userId}`);
            return r.data;
        },
        async getRecipe(id) {
            const r = await http.get(`recipes/${id}`);
            return r.data;
        },
        async postRecipe(formData) {
            const r = await http.post(`recipes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return r.data;
        },
        async removeRecipe(id) {
            const r = await http.delete(`recipes/${id}`);
            return r.data;
        },
        async updateRecipe({id, recipe}) {
            const r = await http.put(`recipes/${id}`, recipe);
            return r.data
        }
    }
})