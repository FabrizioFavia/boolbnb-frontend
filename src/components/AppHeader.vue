<script>
import Searchbar from './Searchbar.vue';
import { storeFilter } from '../data/storeFilter';

export default {
    name: 'AppHeader',
    components:{
        Searchbar,
    },
    data() {
        return {
            storeFilter
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg justify-content-between w-100">
        <div class="container">
            <div class="logoContainer d-flex align-items-center" @click="storeFilter.apartFiltered = []">
                <!-- <router-link class="" to="/"> -->
                    <!-- <img class="navLogo" src="../assets/logo3.png" alt=""> -->
                <!-- </router-link> -->
                <router-link class="" to="/">
                    <img class="navLogo" src="../assets/logo4.jpeg" alt="">
                    <img class="smallLogo" src="../assets/logo.jpeg" alt="">
                </router-link>
                <h4>BoolBnb</h4>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <Searchbar />
                <div class="linkContainer">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="http://localhost:8000/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:8000/register">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div class="bottomNavWrapper w-100" v-if="this.$route.name==='home'">
        <div class="bottomNavbar container w-100">
          <h5 class="d-flex text-white justify-content-center align-items-center h-100 list-unstyled">
            See the five Top Rated hosts!
          </h5>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

</style>





<style scoped lang="scss">
@use 'src/style.scss' as *;

.navLogo {
    height: 40px;
    margin-right: 10px;
}

/* MEDIA QUERY */

@media (min-width: 576px) {
    .smallLogo {
        display: none;
    }
}

@media (max-width: 576px) {
    .navLogo {
        display: none;
    }

    .smallLogo {
        display: block;
        max-height: 80px;
        margin-top: 0;
    }

}
.navbar{
    height: 56px;
}
.bottomNavWrapper{
background-color: $light-orange;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

.bottomNavbar{

  height: 40px;
}
}
</style>

