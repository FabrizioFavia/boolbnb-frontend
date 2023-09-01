<script>
import { store } from '../data/store';
import axios from 'axios';
import MainApartmentCard from '../components/MainApartmentCard.vue';
import { storeFilter } from '../data/storeFilter';
import tt from '@tomtom-international/web-sdk-maps';

export default {
  name: 'AppShowApartment',
  components: {
    MainApartmentCard
  },
  props: {
    apartment: Object
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
    async getApartment(id) {
      this.store.loading = true;
        try {
          const response= await axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH + '/' + id);
          console.log("arrivato", response.data),
            this.store.loading = false,
            this.apartment = response.data.results
            console.log(this.apartment)
        } catch (error) {
            this.store.loading = false,
            this.loadingError = "Cannot load apartment data. " + error
            // this.$router.push({ name: 'error', params: { code: 404 } })
        }
    }
  },
  mounted() {
    this.getApartment(this.$route.params.id),
    this.storeFilter.apartFiltered = [],
    this.map = tt.map({
        key: import.meta.env.VITE_API_KEY,
        container: 'map',
    });
    this.marker = new tt.Marker()
        console.log(this.apartment.latitude, this.apartment.longitude)
        .setLngLat([Number(this.apartment.latitude), Number(this.apartment.longitude)])
        .addTo(this.map);
  }
}
</script>

<template>
  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

  <!-- <MainApartmentCard :apartment="apartment" /> -->

  <div class="container my-5">
    <div class="row">
      <h1 class="my-4 textColoCastom">{{ this.apartment.name }}</h1>
      <div class="col-8">
        <img class="img-fluid castomImgContainer" :src='"http://localhost:8000/storage/" + apartment.image' :alt="apartment.name" alt="">
      </div>
      <div class="col-4">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24735.62533777304!2d-106.85732416031654!3d39.19851289432479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8740397cf7413c7d%3A0xc12b42dc782cf672!2sAspen%2C%20Colorado%2081611%2C%20Stati%20Uniti!5e0!3m2!1sit!2sit!4v1693488740173!5m2!1sit!2sit" width="432" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-6 text-start p-4 text-white">
        <h3 class="textColoCastom pb-3">Apartment Description:</h3>
        <P>{{ this.apartment.description }}</P>
        <hr class="my-4">

        <h3 class="textColoCastom pb-3">Services:</h3>
        <ul>
          <template v-for="service in this.apartment.services" >
            <li class="pb-2"> <i :class="service.icon" class="textColoCastom"></i> {{ service.name }}</li>
          </template>
        </ul>

        <hr class="mt-4">
      </div>
      <div class="col-6 d-flex justify-content-center align-content-center py-4">
              <div class="login-box">
                <h2>Contact Me</h2>
                <form>
                  <div class="user-box">
                    <input type="email" name="email" required="">
                    <label>Email</label>
                  </div>
                  <div class="user-box">
                    <textarea class="formCastom" name="" id="" cols="30" rows="5" placeholder="Write your message"></textarea>
                  </div>
                  <a class="" href="#">
                    Submit
                  </a>
                </form>
              </div>
      </div>
    </div>
  </div>

  <div id="map">

  </div>

</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.castomImgContainer{
  width: 100%;
  height: 25rem;
  background-color: aqua;
  object-fit: cover;
}


// form
.login-box {
  width: 400px;
  padding: 40px;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: rgba(223, 133, 107, 1)4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(223, 133, 107, 1),
              0 0 25px rgba(223, 133, 107, 1),
              0 0 50px rgba(223, 133, 107, 1),
              0 0 100px rgba(223, 133, 107, 1);
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

.formCastom{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

li{
  list-style-type: none;
}

.textColoCastom{
  color: $primary-orange;
}

</style>