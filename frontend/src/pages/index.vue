<template>
<Layout>
  <main>

      <div class="mb-4">
        <p class="pt-5 text-center">
          A jól kiválasztott recept bizony nem elég a sütemények készítéséhez. Legtöbbször felületesek a leírások, és
          alapvető lépéseket nem tartalmaznak.
          Minden esetben olvasd végig a receptet és számold meg a hozzávalók mennyiségét. Ha olyan sütit készítesz,
          amelyet nyújtani kell, akkor számolj még pluszban liszttel a süti nyújtásához, illetve nagy valósínűséggel
          szükséged lesz még plusz tojásra a tészta kenéséhez. Sok esetben ez nem derül ki a receptből.
        </p>

        <div class="relative inline-block">
          <button type="button" @click="dropDown" class="inline-flex rounded-md text-black border border-black p-3 bg-gray-400 text-sm hover:border-gray-500">
          <img src="../../public/images/filter.svg" class="w-5 h-5 mr-2" alt="Filter" />Szűrő</button>

          <div v-if="isOpen" class="absolute z-10 origin-top-right left-0 mt-2 rounded shadow-lg bg-gray-200 border border-black">
            <div class="py-1">
              <div
                v-for="type in types" :key="type" class="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <label class="flex items-center text-black">
                  <input type="checkbox" @change="filtered(type)" class="mr-2" />
                  {{ type }}
                </label>
              </div>
            </div>
        </div>
    </div>

      </div>

    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
    <RecipeCard v-for="i in 5" />
    </div>
  </main>
</Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue';
import RecipeCard from '../components/RecipeCard.vue';

export default {
  data() {
    return {
      isOpen: false,
      types: ['eloetel', 'desszert', 'foetel'],
    };
  },
  methods: {
    dropDown() {
      this.isOpen = !this.isOpen;
    },
    filtered(key){
      console.log(key)
    }
  },
  components: {
    Layout,
    RecipeCard
  }
};
</script>