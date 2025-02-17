<template>
  <Layout>
    <article class="flex flex-wrap">
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
            <div v-for="type in types" :key="type" class="hover:bg-zinc-600 transition-colors duration-200">
              <label class="flex items-center px-4 py-2 text-white cursor-pointer w-full">
                <input type="checkbox" :id="`${type}_check`" class="w-4 h-4 mr-2">
                {{ type }}
              </label>
            </div>
          </div>
        </div>
      </section>
    </article>
    <div class="grid justify-items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
      <RecipeCard v-for="r in this.exampleRecipes" :key="i" :recipe="r" />
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import RecipeCard from '../components/RecipeCard.vue'

export default {
  components: {
    Layout,
    RecipeCard
  },

  data() {
    return {
      isDropdownOpen: false,
      types: ["előétel", "főétel", "desszert", "egyéb"],
      exampleRecipes: [
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      {
        display_name: "Almás pite",
        raw_name: "almas_pite",
        type: "desszert",
        cost: 2,
        difficulty: 3,
        description: "lorem ipsum",
        prepare_time: 30,
        cooking_time: 30,
        time: 60,
        default_serving: 12
      },
      ]
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
  }
}
</script>