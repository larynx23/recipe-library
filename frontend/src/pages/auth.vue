<template>
  <Layout>
    <UserForm :isLogin="this.isLogin" />
  </Layout>
</template>

<script>
import UserForm from '../components/UserForm.vue';
import Layout from '../layouts/Layout.vue'

export default {
  data() {
    return {
      isLogin: Boolean
    }
  },
  
  mounted() {
    this.isLogin = this.$route.path === '/login'
  },

  components: {
    Layout,
    UserForm
  }
}
</script>