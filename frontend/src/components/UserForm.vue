<template>
  <div class="min-h-[calc(100vh-128px)]">
    <article class="flex flex-wrap justify-center pt-40">
      <section class="w-full max-w-md bg-zinc-400 dark:bg-zinc-900 p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-black dark:text-white mb-6">
          {{ isLogin ? 'Bejelentkezés' : 'Regisztráció' }}
        </h1>

        <div v-if="error" class="dark:text-red-500 text-red-700 mt-1 text-center font-bold">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block mb-2 text-black dark:text-white">Név</label>
            <input type="text" id="name" v-model="formData.name"
              class="w-full px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white" required>
          </div>

          <div class="mb-4">
            <label for="password" class="block mb-2 text-black dark:text-white">Jelszó</label>
            <input type="password" id="password" v-model="formData.password"
              class="w-full px-4 py-2 rounded-md bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white" required
              @input="validatePassword">
            <p v-if="passwordError" class="dark:text-red-500 text-red-700 mt-1 text-sm">
              {{ passwordError }}
            </p>
          </div>

          <button type="submit"
            class="w-full px-4 py-2 rounded-md bg-zinc-500 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-colors duration-200">
            {{ isLogin ? 'Bejelentkezés' : 'Regisztráció' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-black dark:text-white">
            {{ isLogin ? 'Még nincs fiókod?' : 'Már van fiókod?' }}
            <RouterLink :to="isLogin ? '/register' : '/login'"
              class="text-black dark:text-white hover:underline font-bold">
              {{ isLogin ? 'Regisztrálj' : 'Jelentkezz be' }}
            </RouterLink>
          </p>
        </div>
      </section>

    </article>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import Layout from '../layouts/Layout.vue'

export default {
  components: {
    Layout
  },
  props: {
    isLogin: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        password: ''
      },
      error: null,
      passwordError: null
    }
  },
  watch: {
    '$route'(to) {
      window.location.reload()
    }
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';
      return 'Hiba történt, kérjük próbálja újra';
    }
  },
  methods: {
    validatePassword() {
      if (this.formData.password.length < 8 && !this.isLogin) {
        this.passwordError = 'A jelszónak legalább 8 karakter hosszúnak kell lennie';
        return false;
      }
      this.passwordError = null;
      return true;
    },
    async handleSubmit() {
      this.error = null;

      if (!this.validatePassword()) {
        return;
      }

      const auth = useAuthStore();

      try {
        if (this.isLogin) {
          await auth.login(this.formData);
          await this.$router.push({ name: 'index' });
        } else {
          await auth.register(this.formData);
          await this.$router.push({ name: 'login' });
        }
      } catch (err) {
        this.error = err;
      }
    }
  }
}
</script>