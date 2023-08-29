<script>
import axios from 'axios';
import MainApartmentCard from '../components/MainApartmentCard.vue';
import AppSpinner from '../components/AppSpinner.vue';
import { store } from '../data/store';

export default {
  name: 'AppHome',
  components: {
    MainApartmentCard,
    AppSpinner
  },
  data() {
    return {
      store,
      apartments: [],
      loadingError: false,
      apartTotalPages: 0,
      apartCurrentPage: 0,
      statusCode: null,
    }
  },
  methods: {
    // Returns Apartments Data via API Call
    getApartmentsData(pageNumber) {
      this.store.loading = true
      axios.get(
        import.meta.env.VITE_BASE_API_URL + VITE_APARTMENTS_API_PATH,
        { validateStatus: (status) => { return status < 500 } },
        { params: { page: pageNumber } }).then((response) => {
          this.store.loading = false,
            this.apartments = response.data.results.data,
            this.apartCurrentPage = response.data.results.current_page,
            this.apartTotalPages = response.data.results.last_page
        }).catch(err => {
          this.store.loading = false;
          this.loadingError = "Cannot load apartments data. " + err;
          this.statusCode = 404;
          if (err.response && err.response.status > 0 && err.response.status < 599) {
            this.statusCode = err.response.status
          }
          this.$router.push({ name: 'error', params: { code: this.statusCode }, state: { message: err.message } })
        })
    }
  },
  mounted() {
    this.getApartmentsData(1);
  }
}
</script>

<template>
  <!-- Spinner Loader -->
  <AppSpinner></AppSpinner>

  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

  <!-- APARTMENTS SECTION -->
  <section class="row">
    <section>

    </section>
    <section>

    </section>
  </section>

  <h1>prova</h1>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.btn-loading {
  background-color: $light-orange;
  border-color: $light-orange;
}
</style>