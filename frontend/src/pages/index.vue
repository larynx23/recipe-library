<template>
  <Layout>
    <article class="flex flex-wrap">
      <section class="w-full">
        <p class="pt-5 text-center font-['Dancing_Script']">
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
            class="flex items-center px-4 py-2 border-2 border-white text-white hover:border-zinc-500 bg-black/10 transition-colors duration-200"
            @click="toggleDropdown">
            <img src="/images/filter.svg" class="w-[27px] mr-2" alt="Filter">
            Szűrő
          </button>
          <div v-show="isDropdownOpen" class="z-10 absolute mt-12 bg-zinc-800 shadow-lg rounded-md overflow-hidden">
            <div v-for="type in types" :key="type" class="hover:bg-zinc-600 transition-colors duration-200">
              <label class="flex items-center px-4 py-2 text-white cursor-pointer w-full">
                <input type="checkbox" @change="toggleFilter(type)" :id="`${type}_check`" class="w-4 h-4 mr-2">
                {{ type }}
              </label>
            </div>
          </div>
        </div>
      </section>
    </article>
    <div class="grid justify-items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
      <RecipeCard v-for="i in 5" />
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
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
  }
}
</script>