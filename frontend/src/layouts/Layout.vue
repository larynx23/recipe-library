<template>
    <div class="bg-gray-300 min-h-screen">
    <Header />
    <main class="p-24">
        <slot/>
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