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

  <header>
      <AppHeader />
  </header>

  <main :class="this.$route.name === 'error' ? 'bg-gray-900' : ''">
    <div :class="this.$route.name === 'error' ? 'h-100' : ''">
      <router-view></router-view>
    </div>
  </main>
  <footer class="container"></footer>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

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

</style>
