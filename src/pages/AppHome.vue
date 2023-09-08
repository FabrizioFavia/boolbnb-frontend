<script>
import axios from 'axios';
import MainApartmentCard from '../components/MainApartmentCard.vue';
import AppSpinner from '../components/AppSpinner.vue';
import SubscriptionList from '../components/SubscriptionList.vue';
import { store } from '../data/store';
import { storeFilter } from '../data/storeFilter';
import Jumbotron from '../components/Jumbotron.vue';
import Advertisement from '../components/Advertisement.vue'
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'AppHome',
  components: {
    MainApartmentCard,
    AppSpinner,
    SubscriptionList,
    Jumbotron,
    Advertisement,
    AppFooter,

  },
  data() {
    return {
      store,
      storeFilter,
      apartments: [],
      sponsored: [],
      loadingError: false,
      apartTotalPages: 0,
      apartCurrentPage: 0,
      sponsored: true
    }
  },
  methods: {
    // Returns Apartments Data via API Call
    getApartmentsData(pageNumber) {
      this.store.loading = true
      axios.get(
        import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH,
        { params: { page: pageNumber } }/*, { validateStatus: (status) => { return status < 500 } }*/).then((response) => {
          this.store.loading = false,
            this.apartments = response.data.results.data,
            this.apartCurrentPage = response.data.results.current_page,
            this.apartTotalPages = response.data.results.last_page
        }).catch(err => {
          this.store.loading = false;
          this.loadingError = "Cannot load apartments data. " + err;
          this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
        })
    },
    getSponsored() {
      this.store.loading = true
      axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_SPONSORED_API_PATH,).then((response) => {
        this.sponsored = response.data.results,
          console.log("SPONSORIZZATI==>", this.sponsored);
      }).catch(err => {
        this.store.loading = false;
        this.loadingError = "Cannot load apartments data. " + err;
        this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
      })
    },

  },
  mounted() {
    this.getApartmentsData(1);
    this.getSponsored()
  }
}
</script>

<template>
  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

  <!-- JUMBOTRON -->
  <div v-if="this.$route.name === 'home'">
    <Jumbotron />
  </div>

  <!-- Spinner Loader -->
  <AppSpinner />

  <!-- SPONSORED SECTION -->
  <!-- Section title -->

  <div class="container d-flex justify-content-start mx-auto my-3">
    <h3 class="text-start ms-4 mt-5">Best Choice</h3>
  </div>
  <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">

    <!-- Apartment Cards -->
    <!-- sponsored apartments -->
    <section v-if="sponsored.length > 0"
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
      <template v-for="apartment in sponsored">
        <MainApartmentCard :apartment="apartment" :sponsored="sponsored" />
      </template>
    </section>

  </section>

  <!-- ALL APART SECTION -->
  <!-- Section title -->
  <div class="container d-flex justify-content-start mx-auto my-3">
    <h3 class="text-start ms-4 mt-5">All apartments</h3>
  </div>

  <!-- All apartments -->
  <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">
    <section v-if="apartments.length > 0"
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
      <template v-for="apartment in apartments">
        <MainApartmentCard :apartment="apartment" />
      </template>
    </section>

    <!-- Subscription Cards -->
    <!--  <SubscriptionList /> -->

    <!-- Page Navigation Buttons  -->
    <section v-if="apartments.length > 0 && storeFilter.apartFiltered.length === 0">
      <nav class="text-center" aria-label="Page navigation">
        <ul class="pagination d-inline-flex">
          <li class="py-3 mx-3">
            <button @click="apartCurrentPage > 1 ? getApartmentsData(apartCurrentPage - 1) : null"
              class="page-link d-block rounded arrow" aria-label="Previous"
              :class="apartCurrentPage > 1 ? null : 'disabled'"><i class="fa-solid fa-chevron-left"></i></button>
          </li>
          <template v-for="pageNumber in apartTotalPages">
            <li class="py-3 mx-3">
              <button @click="getApartmentsData(pageNumber)" :class="apartCurrentPage === pageNumber ? 'active' : null"
                class="page-link d-block rounded">{{ pageNumber }}</button>
            </li>
          </template>
          <li class="py-3 mx-3">
            <button @click="apartCurrentPage < apartTotalPages ? getApartmentsData(apartCurrentPage + 1) : null"
              class="page-link d-block rounded arrow" aria-label="Next"
              :class="apartCurrentPage < apartTotalPages ? null : 'disabled'"><i
                class="fa-solid fa-chevron-right"></i></button>
          </li>
        </ul>
      </nav>
    </section>

    <!-- Advertisement section -->

    <Advertisement />

  </section>

  <section>
      <AppFooter />
  </section>
  
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;


#apartmentsSec {


  &>section:first-child {
    gap: 2.5rem;
  }

  & .pagination {
    // font-family: 'Itim', cursive;
    border-radius: 8px 8px 0 0;
    border-top: 4px solid $primary-orange;

    & .page-link {
      color: $primary-orange;
      background: transparent;
      line-height: 1rem;
      height: 2rem;
      width: 2.625rem;
      border: 1px solid $primary-orange;
      transition: all 0.3s ease 0s;
    }

    & .page-link:hover,
    & .page-link.active,
    & .page-link:focus:not(.arrow) {
      color: white;
      background: $primary-orange;
      line-height: 2.375rem;
      height: 2.5625rem;
      margin: -5px 0 -3px;
      border: 1px solid $primary-orange;
    }

    & .page-link.active:hover {
      background: $light-orange;
    }

    & .page-link.disabled {
      color: lightgrey;
      border: 1px solid lightgrey;
    }
  }
}

@media only screen and (max-width: 480px) {
  .pagination {
    font-size: 0;
    display: block;
  }

  .pagination li {
    display: inline-block;
  }
}
</style>
