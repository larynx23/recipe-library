<template>
  <header>
    <nav class='fixed top-0 left-0 right-0 py-3 z-50 transition duration-300 dark:bg-zinc-900 bg-zinc-100'>
      <div class="container mx-auto px-4 flex justify-between items-center">
        <RouterLink to="/" class='dark:text-white text-black font-bold uppercase text-xl'>{{ title }} </RouterLink>

        <div class="flex gap-3">

        <RouterLink v-if="isAuthenticated" to="/add"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
            <svg class="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </RouterLink>

        <button @click="toggleTheme"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
          <svg v-if="this.isDark" class="w-5 h-5 text-white" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025q.337.025.662.075q-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613q1.15-.612 1.875-1.637q.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z" />
          </svg>
          <svg v-else class="w-5 h-5 text-black" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287q.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7q.013-.425.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7q0 .4-.275.7q-.275.3-.687.287q-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712q0-.413.275-.688q.275-.3.688-.287q.412.012.712.287L19.425 18q.3.275.288.7q-.013.425-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688q.012-.412.287-.712L18 4.575q.275-.3.7-.288q.425.013.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275q-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275q.412 0 .687.275q.3.275.288.688q-.013.412-.288.712L6 19.425q-.275.3-.7.287q-.425-.012-.725-.287Z" />
          </svg>
        </button>

        <button v-if="isAuthenticated" @click="handleLogout"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
          <svg class="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
          </button>

          <RouterLink v-if="!isAuthenticated" to="/login"
          class='w-9 h-9 rounded-full flex items-center justify-center transition duration-300 dark:bg-zinc-600 bg-zinc-400'>
          <svg class="w-5 h-5 dark:fill-white fill-black" viewBox="0 0 512 512">
            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
          </RouterLink>
      </div>
      </div>
    </nav>

    <template v-if="isHomePage">
      <section class="w-full">
        <div class="h-[60vh] bg-center bg-fixed brightness-50 bg-[url('/images/cookies.jpg')]"></div>
      </section>

      <h1
        class="absolute top-1/4 w-full text-center text-white font-bold text-7xl drop-shadow-[2px_2px_7px_black]">
        {{ heading }}
      </h1>
    </template>
  </header>
</template>

<script>
import { useAuthStore } from '@stores/auth';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      isDark: this.initializeTheme(),
      title: 'Oregano',
      heading: 'Kedvenc ételeink'
    }
  },

  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    
    isHomePage() {
      return this.$route.path === '/'
    }
  },

  methods: {
    async handleLogout() {
      const auth = useAuthStore();
      try {
        await auth.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Kijelentkezés sikertelen');
      }
    },

    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme')
      document.documentElement.classList = savedTheme;
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },
  }
}
</script>
