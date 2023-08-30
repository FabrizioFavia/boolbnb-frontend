<script>
import { store } from '../data/store';
import axios from 'axios';
import MainApartmentCard from '../components/MainApartmentCard.vue';
import { storeFilter } from '../data/storeFilter';

export default {
  name: 'AppShowApartment',
  components: {
    MainApartmentCard
  },
  data() {
    return {
      store,
      storeFilter,
      apartment: '',
      loadingError: false,
    }
  },
  methods: {
    // Returns Apartment Data via API Call
    getApartment(id) {
      this.store.loading = true,
        axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH + '/' + id).then((response) => {
          console.log(response.data),
            this.store.loading = false,
            this.apartment = response.data.results
        }).catch(err => {
          this.store.loading = false,
            this.loadingError = "Cannot load apartment data. " + err,
            this.$router.push({ name: 'error', params: { code: 404 } })
        })
    }
  },
  mounted() {
    this.getApartment(this.$route.params.id),
    this.storeFilter.apartFiltered = []
  }
}
</script>

<template>
  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

  <MainApartmentCard :apartment="apartment" />
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;
</style>