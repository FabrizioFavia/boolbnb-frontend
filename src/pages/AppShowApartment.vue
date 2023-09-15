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
      startDate: null,
      endDate: null
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
    },
    // Get User IP via API Call
    getUserIP() {
      axios.defaults.withCredentials = false;
      axios.get('https://api.ipify.org/?format=json').then((response) => {
        let userIP = response.data.ip;
        // this.postUserIP(userIP);
      }).catch(error => console.error('⚠️ Error during Ipinfo API Call:', error));
    },
    // Send User IP View to DB via API Call
    // postUserIP(userIP) {
    //   axios.post(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_VIEWS_API_PATH, userIP).then((response) => console.log('response for sending data to DB about views: ', response)).catch( error => console.error('⚠️ Error sending data to DB about views, via API call:', error))
    // }
  },
  mounted() {
    this.getApartment(this.$route.params.id);
    this.storeFilter.apartFiltered = [];
    this.getUserIP();
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
    <div class="row justify-content-center">
      <h1 class="my-4 textColoCustom">{{ apartment.name.toUpperCase() }}</h1>
      <div class="col-12 col-lg-8">
        <img class="img-fluid customImgContainer" :src='"http://localhost:8000/storage/" + apartment.image'
          :alt="apartment.name">
        <p class="text-center text-secondary fs-5 pt-3">
          <span>{{ apartment.square_meters }}mq</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.room_number }} rooms</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.bed_number }} beds</span>
          <strong class="dot px-2">&#126;</strong>
          <span>{{ apartment.bathroom_number }} bathrooms</span>
        </p>
      </div>
      <div class="col-12 col-lg-4">
        <Map :apartment="apartment"></Map>
        <p class="text-secondary pt-3"><i class="fa-solid fa-location-dot me-1"></i> {{ apartment.address }}</p>
      </div>
<!-- START DATE -->
      <div class="d-flex justify-content-between text-body-secondary dateContainer">
        <label for="spons_date">Choose the <strong>start date</strong> of your
          sponsorship:</label>
        <input type="date" name="spons_date" id="spons_date" required min="{{ date('Y-m-d') }}"
          max="{{ date('Y-m-d', strtotime('+2 months')) }}" class="w-40" v-model="startDate">
      </div>

      <!-- END DATE -->
      <div class="d-flex justify-content-between text-body-secondary dateContainer">
        <label for="spons_date">Choose the <strong>end date</strong> of your
          sponsorship:</label>
        <input type="date" name="spons_date" id="spons_date" required min="{{ date('Y-m-d') }}"
          max="{{ date('Y-m-d', strtotime('+2 months')) }}" class="w-40" v-model="endDate">
      </div>

    </div>
  </div>

  <!-- Apartment Details & Contact Form -->
  <div v-if="apartment" class="container">
    <div class="row align-items-center">

      <!-- Apartment Description & Services -->
      <div class="col-12 col-lg-7 text-start p-4 text-dark">
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
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.textColoCustom {
  color: $primary-orange;
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
      border-color: rgba(21, 21, 21, 0.193) !important;
      -webkit-box-shadow: 0px 3px 20px 8px rgba(21, 21, 21, 0.193);
      box-shadow: 0px 5px 40px 9px rgba(21, 21, 21, 0.193);
    }

    & i {
      transition: all .8s ease-in-out;
    }

    &:hover i {
      color: $light-blue;
    }
  }
}

@media (max-width: 576px) {
  ul {
    row-gap: 2px;
    column-gap: 5px;

    &>li {
      width: calc(100% / 2 - 5px);
    }
  }


}
</style>