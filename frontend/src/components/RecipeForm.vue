<template>
  <form class="max-w-2xl mx-auto" @submit.prevent.once="onSubmit">
    <h1 class="text-5xl dark:text-white mb-10 text-center">{{ title }}</h1>
    <div class="space-y-6">
      <div>
        <label class="block text-lg text-black font-bold dark:text-white mb-1">Név</label>
        <input v-model="recipeData.name" type="text" class="w-full p-2 border rounded" required>
      </div>

      <div class="mt-6">
        <input 
          type="file" 
          @change="imageUpload" 
          accept="image/*" 
          class="w-full dark:text-white text-black">
        <div v-if="recipeData.imagePreview || recipeData.image" class="mt-2">
          <img :src="recipeData.imagePreview || recipeData.image" alt="Recept kép" class="w-32 h-32 object-cover">
        </div>
      </div>

      <div>
          <select 
            v-model.number="recipeData.type" 
            class="w-full p-2 border rounded"
            required>
            <option :value="1">Előétel</option>
            <option :value="2">Főétel</option>
            <option :value="3">Desszert</option>
            <option :value="4">Egyéb</option>
          </select>
        </div>

      <div>
        <label class="block text-md text-black dark:text-white mb-1">Leírás</label>
        <textarea 
          v-model="recipeData.description" 
          class="w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-md text-black dark:text-white mb-1">Előkészítés idő (percben)</label>
          <input 
            v-model.number="recipeData.prepare_time" 
            type="number" 
            class="w-full p-2 border rounded"
            min="0"
            required
          >
        </div>
        <div>
          <label class="block text-md text-black dark:text-white mb-1">Sütés idő (percben)</label>
          <input 
            v-model.number="recipeData.cooking_time" 
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
            v-model.number="recipeData.cost" 
            class="w-full p-2 border rounded"
            required
          >
            <option :value="1">Olcsó</option>
            <option :value="2">Átlagos</option>
            <option :value="3">Drága</option>
          </select>
        </div>
        <div>
          <label class="block text-md text-black dark:text-white mb-1">Nehézség</label>
          <select 
            v-model.number="recipeData.difficulty" 
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
            v-model.number="recipeData.default_serving" 
            type="number" 
            class="w-full p-2 border rounded"
            min="1"
            required>
        </div>
      </div>


      <div class="mt-6">
        <h3 class="text-lg font-bold text-black dark:text-white mb-2">Hozzávalók</h3>
        <div v-for="(ingredient, index) in recipeData.ingredients" :key="`ingredient-${index}`" class="flex gap-2 mb-2">
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
          <button type="button" @click="removeIngredient(index)" class="px-3 py-2 border-red-500 border-2 text-red-500 bg-red-600/10 hover:bg-red-600/25 rounded">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="w-6 h-6"><g><path d="M10 12V17M14 12V17M4 7H20M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
          </button>
        </div>
        <button 
          type="button" 
          @click="addIngredient"
          class="mt-2 px-4 py-2 border-green-500 border-2 text-green-500 bg-green-600/10 hover:bg-green-600/25 rounded w-1/4 flex items-center justify-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="w-6 h-6"><path d="M6 12H18M12 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Új hozzávaló
        </button>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-bold text-black dark:text-white mb-2">Lépések</h3>
        <div v-for="(step, index) in recipeData.steps" :key="`step-${index}`" class="flex gap-2 mb-2">
          <span class="flex items-center px-3 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white rounded">{{ index + 1 }}</span>
          <textarea 
            v-model="step.description" 
            placeholder="Lépés"
            class="flex-1 p-2 border rounded min-h-14"
            rows="2"
            required></textarea>
          <button 
            type="button" 
            @click="removeStep(index)"
            class="px-3 py-2 border-red-500 border-2 text-red-500 bg-red-600/10 hover:bg-red-600/25 rounded h-14 self-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="w-6 h-6"><g><path d="M10 12V17M14 12V17M4 7H20M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
          </button>
        </div>
        <button 
          type="button" 
          @click="addStep"
          class="mt-2 px-4 py-2 border-green-500 border-2 text-green-500 bg-green-600/10 hover:bg-green-600/25 rounded w-1/4 flex items-center justify-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="w-6 h-6"><path d="M6 12H18M12 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Új lépés
        </button>
      </div>
    </div>
      
      <button 
        type="submit" 
        class="mt-6 w-full px-4 py-2 dark:bg-zinc-900 text-white rounded dark:hover:bg-zinc-700 bg-zinc-400 hover:bg-zinc-600"
      >
        Mentés
      </button>

  </form>
</template>

<script>
export default {
  props: {
    initialData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      recipeData: { ...this.initialData },
      title: this.$route.path === "/add" ? "Új recept hozzáadása" : "Szerkesztés"
    };
  },
  methods: {
    addIngredient() {
      this.recipeData.ingredients.push({
        count: 0,
        unit: ''
      });
    },
    removeIngredient(index) {
      this.recipeData.ingredients.splice(index, 1);
    },
    addStep() {
      this.recipeData.steps.push({
        index: this.recipeData.steps.length,
        description: ''
      });
    },
    removeStep(index) {
      this.recipeData.steps.splice(index, 1);
      this.recipeData.steps.forEach((step, i) => {
        step.index = i;
      });
    },
    imageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert('A kép túl nagy! Kérjük, válassz 2MB-nál kisebb képet.');
          event.target.value = '';
          this.recipeData.image = null;
          this.recipeData.imagePreview = null;
          return;
        }
        
        this.recipeData.image = file;
        this.recipeData.imagePreview = URL.createObjectURL(file);
      }
    },
    onSubmit() {
      this.$emit('submit', this.recipeData);
    }
  }
};
</script>