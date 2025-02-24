<template>
    <Layout>
      <article class="flex flex-wrap justify-center pt-40">
        <section class="w-full max-w-md bg-zinc-400 dark:bg-zinc-900 p-8 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold text-center text-black dark:text-white mb-6">Regisztráció</h1>
          
          <form >
            <div class="mb-4">
              <label for="name" class="block mb-2 text-black dark:text-white">Név</label>
              <input 
                type="text" 
                id="name" 
                class="w-full px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white"
                required>
            </div>
            
            <div class="mb-4">
              <label for="password" class="block mb-2 text-black dark:text-white">Jelszó</label>
              <input 
                type="password" 
                id="password" 
                class="w-full px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white"
                required>
            </div>
            
            <button 
              type="submit" 
              class="w-full px-4 py-2 rounded-md bg-zinc-500 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-colors duration-200" >
              Regisztráció
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-black dark:text-white">
              Már van fiókod? 
              <RouterLink 
                to="/login" 
                class="text-black dark:text-white hover:underline font-bold">
                Jelentkezz be
              </RouterLink>
            </p>
          </div>
        </section>
      </article>
    </Layout>
  </template>
  
  <script>
  import Layout from '../layouts/Layout.vue'
  
  export default {
    components: {
      Layout
    }
  }
  </script>