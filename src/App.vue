<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  }
}

</script>

<template>
  <header class="container">
    <AppHeader />
    <!-- Jumbotron Component: Carousel -->
  </header>
  <main class="bg-dark">
    <div class="container h-100">
      <router-view></router-view>
    </div>
  </main>
  <footer class="container"></footer>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

header {
  height: 6.625rem;
}

main {
  height: calc(100vh - 6.625rem);

  & > div {
    overflow-y: scroll;
  }
}
</style>
