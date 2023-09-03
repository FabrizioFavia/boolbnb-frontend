<script>
import { store } from '../data/store';
import axios from 'axios';
import MainApartmentCard from '../components/MainApartmentCard.vue';
import { storeFilter } from '../data/storeFilter';
import Map from '../components/Map.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
  name: 'AppShowApartment',
  components: {
    MainApartmentCard,
    Map,
    ContactForm
  },
  data() {
    return {
      store,
      storeFilter,
      apartment: "",
      loadingError: false,
    }
  },
  methods: {
    // Returns Apartment Data via API Call
    getApartment(id) {
      this.store.loading = true,
        axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH + '/' + id).then((response) => {
            this.store.loading = false,
            this.apartment = response.data.results
        }).catch(err => {
          this.store.loading = false,
          this.loadingError = "Cannot load apartment data. " + err,
          this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
        })
    }
  },
  mounted() {
    this.getApartment(this.$route.params.id);
    this.storeFilter.apartFiltered = [];
  }
}
</script>

<template>

  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

  <!-- Apartment Image & Map -->
  <div v-if="apartment" class="container my-5">
    <div class="row">
      <h1 class="my-4 textColoCustom">{{ apartment.name }}</h1>
      <div class="col-8">
        <img class="img-fluid customImgContainer" :src='"http://localhost:8000/storage/" + apartment.image' :alt="apartment.name">
      </div>
      <div class="col-4">
        <Map :apartment="apartment"></Map>
      </div>
    </div>
  </div>

  <!-- Apartment Details & Contact Form -->
  <div v-if="apartment" class="container">
    <div class="row">

      <!-- Apartment Description & Services -->
      <div class="col-6 text-start p-4 text-white">
        <h3 class="textColoCustom pb-3">Apartment Description:</h3>
        <p>{{ this.apartment.description }}</p>
        <hr class="my-4">

        <h3 class="textColoCustom pb-3">Services:</h3>
        <ul>
          <template v-for="service in this.apartment.services" >
            <li class="pb-2"> <i :class="service.icon" class="textColoCustom"></i> {{ service.name }}</li>
          </template>
        </ul>

        <hr class="mt-4">
      </div>

      <!-- Apartment Contact Form -->
      <ContactForm></ContactForm>

    </div>
  </div>

</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.customImgContainer{
  width: 100%;
  height: 25rem;
  background-color: aqua;
  object-fit: cover;
}

.textColoCustom{
  color: $primary-orange;
}

li{
  list-style-type: none;
}

</style>