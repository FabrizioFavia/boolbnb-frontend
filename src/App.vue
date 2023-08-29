<script>
import AppHeader from './components/AppHeader.vue';

export default{
  components:{
    AppHeader,
  }
}

</script>

<template>

  <header>
    <AppHeader />
    <!-- Jumbotron Component: Carousel -->
  </header>
  <main class="border border-danger container">
    <router-view></router-view>
  </main>
  <footer></footer>

</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

header {
  height: 6.625rem;
}
main {
  height: calc(100vh - 6.625rem);
  overflow-y: scroll;
}

</style>
