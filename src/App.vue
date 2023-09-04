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
  <header class="">
    <div class="container">
      <AppHeader />
    </div>
    <div class="bottomNavWrapper w-100">
        <div class="bottomNavbar container w-100">
          <h5 class="d-flex text-white justify-content-center align-items-center h-100 list-unstyled">
            See the three Top Rated Hosts!
          </h5>
        </div>
    </div>
    <!-- Jumbotron Component: Carousel -->
  </header>
  <main :class="this.$route.name === 'error' ? 'bg-gray-900' : ''">
    <div :class="this.$route.name === 'error' ? 'h-100' : 'container h-100'">
      <router-view></router-view>
    </div>
  </main>
  <footer class="container"></footer>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.bottomNavWrapper{

  background-color: $light-orange;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .bottomNavbar{

    height: 40px;
}
}

.container::-webkit-scrollbar {
  display: none;
}

header {
  /* height: 6.625rem;
  background: rgb(17, 12, 6);
  background: linear-gradient(180deg, rgba(17, 12, 6, 1) 47%, rgba(17, 12, 6, 0.8939950980392157) 92%); */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

main {
  height: calc(100vh - 6.625rem);

  &>div {
    overflow-y: scroll;
  }
}
</style>
