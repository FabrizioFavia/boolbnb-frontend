<script>
import AppHeader from './components/AppHeader.vue';
import { storeFilter } from './data/storeFilter';
import axios from 'axios';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      storeFilter
    }
  },
  methods: {
    // Returns Apartments Data via API Call
    getApartmentsData() {
      axios.get(
        import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTSALL_API_PATH).then((response) => {
          response.data.results.forEach(element => {
            this.storeFilter.apartmentsall.push(element)
          });
      })
    }
  },
  mounted() {
    this.getApartmentsData()
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

  &>div {
    overflow-y: scroll;
  }
}
</style>
