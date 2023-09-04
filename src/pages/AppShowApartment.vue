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
  <div v-if="apartment" class="container mt-3 mb-2">
    <div class="row">
      <h1 class="my-4 textColoCustom">{{ apartment.name.toUpperCase() }}</h1>
      <div class="col-8">
        <img class="img-fluid customImgContainer" :src='"http://localhost:8000/storage/" + apartment.image'
          :alt="apartment.name">
        <p class="text-center text-white pt-3">
          <span>{{ apartment.square_meters }}mq</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.room_number }} rooms</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.bed_number }} beds</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.bathroom_number }} bathrooms</span>
        </p>
      </div>
      <div class="col-4">
        <Map :apartment="apartment"></Map>
        <p class="text-secondary pt-3"><i class="fa-solid fa-location-dot me-1"></i> {{ apartment.address }}</p>
      </div>

    </div>
  </div>

  <!-- Apartment Details & Contact Form -->
  <div v-if="apartment" class="container">
    <div class="row align-items-center">

      <!-- Apartment Description & Services -->
      <div class="col-7 text-start p-4 text-white">
        <h3 class="textColoCustom py-4">Apartment Description:</h3>
        <p>{{ apartment.description }}</p>
        <hr class="my-4">

        <h3 class="textColoCustom pb-3">What this place offers:</h3>
        <ul class="d-flex flex-wrap">
          <template v-for="service in this.apartment.services">
            <li class="p-2 rounded"> <i :class="service.icon" class="textColoCustom fa-lg me-2"></i> {{ service.name }}
            </li>
          </template>
        </ul>

        <hr class="my-5">
      </div>

      <!-- Apartment Contact Form -->
      <ContactForm></ContactForm>

    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.customImgContainer {
  width: 100%;
  height: 28.125rem;
  background-color: aqua;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
}

// form
.login-box {
  width: 400px;
  padding: 40px;
  /* background: rgba(0,0,0,.5); */
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.dot {
  color: $light-blue;
}

ul {
  row-gap: 4px;
  column-gap: 15px;

  &>li {
    list-style-type: none;
    width: calc(100% / 3 - 15px);
    transition: all .7s ease-in-out;

    &:hover {
      border-color: $light-blue !important;
      -webkit-box-shadow: 0px 7px 50px 16px rgba(0, 132, 156, 0.56);
      box-shadow: 0px 5px 40px 9px rgba(0, 132, 156, 0.56);
    }

    & i {
      transition: all .8s ease-in-out;
    }

    &:hover i {
      color: $light-blue;
    }
  }
}
</style>