<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'prova',
    }
  },
  methods: {
    prova() {
      console.log('ciao');
    }
  },
  mounted() {
    this.prova();
  }
}
</script>

<template>
  <router-link class="m-3" to="/homeProva">
    Home
  </router-link>
</template>