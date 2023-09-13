<script>
import AppHeader from './components/AppHeader.vue';
import { store } from './data/store';
import { storeFilter } from './data/storeFilter';
import axios from 'axios';


export default {
  components: {
    AppHeader,

  },
  data() {
    return {
      storeFilter,
      store
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
    },
    getAuth() {
      axios.defaults.withCredentials = true;
      axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_AUTH_EMAIL_API_PATH)
        .then(response => {
          this.store.user_email = response.data.email;
          this.store.user_name = response.data.name;
          axios.defaults.withCredentials = false;
        })
        .catch(err => {
            axios.defaults.withCredentials = false;
        });
    }
  },
  mounted() {
    this.getApartmentsData(),
    this.getAuth()
  }
}

</script>

<template>
  <header :class="{ 'd-flex align-items-center': this.$route.name != 'home' }">
    <AppHeader />
  </header>

  <main :class="this.$route.name === 'error' ? 'bg-gray-900 totalvh' : 'h-100'">
    <div :class="{ 'h-100': this.$route.name === 'error', 'container h-100': this.$route.name === 'show-apartments' }">
      <router-view></router-view>
    </div>
  </main>
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
