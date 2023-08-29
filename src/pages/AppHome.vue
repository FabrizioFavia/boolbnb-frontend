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
        import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH,
        { validateStatus: (status) => { return status < 500 } },
        { params: { page: pageNumber } }).then((response) => {
            this.store.loading = false,
            this.apartments = response.data.results.data,
            console.log(this.apartments),
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
    this.getApartmentsData(1)
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
  <section id="apartmentsSec" class="d-flex flex-column justify-content-center">

    <!-- Apartment Cards -->
    <section v-if="apartments.length > 0"
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-between flex-wrap py-4">
      <template v-for="apartment in apartments">
        <MainApartmentCard :apartment="apartment" />
      </template>
    </section>

    <!-- Change Page Buttons  -->
    <section class="d-flex justify-content-center py-3">
      <div class="d-flex justify-content-center gap-7 border rounded px-3 py-1">
        <button v-show="apartCurrentPage > 1" @click="getApartmentsData(apartCurrentPage - 1)"
          class="px-2 border-e hover:text-primary-blu"><i
            class="fa-solid fa-chevron-left fa-xs align-middle text-gray-500"></i> Preview</button>
        <div class="px-3">
          <template v-for="pageNumber in apartTotalPages">
            <button @click="getApartmentsData(pageNumber)"
              :class="apartCurrentPage === pageNumber ? 'font-bold border text-primary-blu' : null"
              class="px-3 py-1 hover:bg-gray-200">{{ pageNumber }}</button>
          </template>
        </div>
        <button v-show="apartCurrentPage < apartTotalPages" @click="getApartmentsData(apartCurrentPage + 1)"
          class="px-2 border-s hover:text-primary-blu">Next <i
            class="fa-solid fa-chevron-right fa-xs align-middle text-gray-500"></i></button>
      </div>
    </section>

  </section>
</template>

<style scoped lang="scss">@use 'src/style.scss' as *;

#apartmentsSec {
  overflow-y: scroll;

  & > section:first-child {
    // background-color: rgba(0, 0, 0, 0.222);
    gap: 2rem;
  }
}

</style>