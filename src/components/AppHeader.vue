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
    <nav class="navbar navbar-expand-lg justify-content-between">
        <div class="container">
            <div class="logoContainer" @click="storeFilter.apartFiltered = []">
                <router-link class="" to="/">
                    <img class="navLogo" src="../assets/logo3.png" alt="">
                </router-link>
                <router-link class="" to="/">
                    <img class="smallLogo" src="../assets/logo.jpeg" alt="">
                </router-link>
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
                            <a class="nav-link text-white" aria-current="page" href="http://localhost:8000/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="http://localhost:8000/register">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>


</style>





<style scoped lang="scss">
@use 'src/style.scss' as *;

.navLogo {
    height: 80px;
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
</style>

