<script>
import Searchbar from './Searchbar.vue';

export default {
    name: 'AppHeader',
    components:{
        Searchbar
    },
    data() {
        return {
            prova: "dato",
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-white justify-content-between">
        <div class="container">
            <div class="logoContainer">
                <router-link class="" to="/">
                    <img class="navLogo" src="../assets/logo2.jpeg" alt="">
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
                            <a class="nav-link" aria-current="page" href="#">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>





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

