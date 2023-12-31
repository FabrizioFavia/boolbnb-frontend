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
      sponsoredApartments: [],
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
        this.sponsoredApartments = response.data.results
      }).catch(err => {
        this.store.loading = false;
        this.loadingError = "Cannot load apartments data. " + err;
        this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
      })
    },
    scrollToSectionTitle() {
      const sectionTitle = document.getElementById('allApartTitle');
      sectionTitle.scrollIntoView({ behavior: 'smooth' });
    }

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

  <!-- SPONSORED SECTION ---------------------->

  <!-- Section title -->

  <div class="container d-flex justify-content-start mx-auto mb-3">
    <h4 class="text-start ms-4 mt-5 sectionTitle">Best Choice</h4>
  </div>
  <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">

    <!-- Sponsored apartments -->
    <section v-if="sponsoredApartments.length > 0"
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
      <template v-for="apartment in sponsoredApartments">
        <MainApartmentCard :apartment="apartment" :sponsored="sponsored" />
      </template>
    </section>

  </section>

  <!-- ALL APART SECTION ----------------------->

  <!-- Section title -->

  <div class="container justify-content-between align-items-center mx-auto my-3">
    <div>
      <h4 id="allApartTitle" class="ms-4 me-5 mt-5 sectionTitle">All apartments</h4>
    </div>

    <!-- Page number -->

    <div class="sectionContainer me-5 pe-2 mt-3">
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
                <button @click="getApartmentsData(pageNumber), scrollToSectionTitle()"
                  :class="apartCurrentPage === pageNumber ? 'active' : null" class="page-link d-block rounded">{{
                    pageNumber }}</button>
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
    </div>

  </div>

  <!-- All apartments -->
  <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">

    <section v-if="apartments.length > 0"
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
      <template v-for="apartment in apartments">
        <MainApartmentCard :apartment="apartment" />
      </template>
    </section>

    <!-- Page number -->
    <div class="sectionContainer me-5 pe-2">
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
                <button @click="getApartmentsData(pageNumber), scrollToSectionTitle()"
                  :class="apartCurrentPage === pageNumber ? 'active' : null" class="page-link d-block rounded">{{
                    pageNumber }}</button>
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
    </div>

    <!-- ADVERTISEMENT SECTION ---------------------->
    <section>
      <Advertisement />
    </section>

  </section>

  <!-- FOOTER SECTION ------------------------>
  <section>
    <AppFooter />
  </section>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;


.pagination {
  border-radius: 8px 8px 0 0;


  .page-link {
    color: $primary-orange;
    background: transparent;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    border-radius: 100% !important;
    border: 1px solid $primary-orange;

  }

  .page-link:hover,
  .page-link.active,
  .page-link:focus:not(.arrow) {
    color: white;
    background: $primary-orange;
    border: 1px solid $primary-orange;
  }

  .page-link.active:hover {
    background: $light-orange;
  }

  .page-link.disabled {
    color: lightgrey;
    border: 1px solid lightgrey;
  }
}


#apartmentsSec {


  &>section:first-child {
    gap: 2.5rem;
  }

}

.sectionTitle {
  width: fit-content;
  border: 3px solid $light-orange;
  padding: 2px 10px;
  background-color: $light-orange;
  border-radius: 15px;
  color: white;
  scroll-margin-top: 40px;
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
