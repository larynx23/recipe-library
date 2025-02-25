<template>
  <Layout>
    <UserForm :isLogin="true" />
  </Layout>
</template>

<script>
import UserForm from '../components/UserForm.vue';
import Layout from '../layouts/Layout.vue'

export default {
  components: {
    Layout,
    UserForm
  }
}
</script>