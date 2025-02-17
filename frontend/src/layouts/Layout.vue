<template>
    <div class="min-h-screen transition-colors duration-300 bg-zinc-100 dark:bg-zinc-800">
        <Header />
        <main class="container mx-auto lg:max-w-6xl">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>