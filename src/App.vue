<script>
import AppHeader from './components/AppHeader.vue';
// import SubscriptionList from './components/SubscriptionList.vue';
import { storeFilter } from './data/storeFilter';
import axios from 'axios';
import AppFooter from './components/AppFooter.vue';
/* import Jumbotron from './components/Jumbotron.vue'; */

export default {
  components: {
    AppHeader,
    AppFooter,
    /*  Jumbotron */
    // SubscriptionList,
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
  <header :class="{ 'd-flex align-items-center' : this.$route.name != 'home'}">
    <AppHeader />
  </header>

  <main :class="this.$route.name === 'error' ? 'bg-gray-900 totalvh' : 'h-100'">
    <div :class="{ 'h-100': this.$route.name === 'error', 'container h-100': this.$route.name === 'show-apartments' }">
      <router-view></router-view>
    </div>
  </main>
  <footer>
    <AppFooter />
  </footer>
  <!-- <SubscriptionList /> -->
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.bottomNavWrapper {

  background-color: $light-orange;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .bottomNavbar {

    height: 40px;
  }
}

.container::-webkit-scrollbar {
  display: none;
}

header {
  height: 96px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

main {
  max-height: calc(100vh - 96px);
  overflow-y: scroll;
}

.totalvh {
  height: calc(100vh - 96px);
}

</style>
