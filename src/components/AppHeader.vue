<script>
import Searchbar from './Searchbar.vue';
import { store } from '../data/store';
import { storeFilter } from '../data/storeFilter';

export default {
    name: 'AppHeader',
    components: {
        Searchbar,
    },
    data() {
        return {
            store,
            storeFilter,
            openMenu: false,
            screenWidth: window.innerWidth,
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateScreenWidth);

    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    methods: {
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },

        isOpen() {
            this.openMenu = !this.openMenu;
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg justify-content-between w-100">
        <div class="container d-flex">
            <div class="logoContainer d-flex align-items-center" @click="storeFilter.apartFiltered = []">
                <!-- <router-link class="" to="/"> -->
                <!-- <img class="navLogo" src="../assets/logo3.png" alt=""> -->
                <!-- </router-link> -->
                <router-link class="" to="/">
                    <img class="navLogo" src="../assets/logo4.jpeg" alt="">
                    <img class="smallLogo" src="../assets/logo4.jpeg" alt="">
                </router-link>
                <h4 class="logoText" v-if="screenWidth >= 576">BoolBnb</h4>
            </div>
            <div class="searchBar" :class="{
                'w-100': screenWidth > 992,
                'mediumSearch': screenWidth <= 992 && screenWidth > 768,
                'smallSearch': screenWidth <= 768 && screenWidth > 576,
                'customSmallSearch': screenWidth <= 576 && screenWidth > 538,
                'xsSearch': screenWidth <= 538 && screenWidth > 320,
                'xxsSearch': screenWidth <= 320,
            }">
                <Searchbar />
            </div>
            <button @click="isOpen()" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div v-show="openMenu || screenWidth >= 992" class="linkContainer">
                    <ul class="navbar-nav">
                        <li v-show="!store.user_email" class="nav-item">
                            <a class="nav-link" aria-current="page" href="http://localhost:8000/login">
                                <span>Login</span>
                            </a>
                        </li>
                        <li v-show="!store.user_email" class="nav-item">
                            <a class="nav-link" href="http://localhost:8000/register">
                                <span>Register</span>
                            </a>
                        </li>
                        <li v-show="store.user_email" class="nav-item">
                            <a class="nav-link" href="http://localhost:8000/login">
                                <span><i class="fa-solid fa-user fa-sm d-inline me-1"></i> </span>
                                <span>{{ store.user_name ?? 'User' }}</span>
                            </a> 
                        </li>
                        <li class="nav-item">
                            <button v-show="screenWidth < 992" @click="isOpen()" class="btn" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                close
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div class="bottomNavWrapper w-100" v-if="this.$route.name === 'home'">
        <div class="bottomNavbar container w-100">
            <h5 class="d-flex text-white justify-content-center align-items-center h-100 list-unstyled">
                See our Top Rated hosts!
            </h5>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.nav-link:hover, .nav-link:hover span{
    color: $secondary-blue;
}

.navLogo {
    height: 40px;
    margin-right: 10px;
}

/*** MEDIA QUERY ***/

@media (min-width: 576px) {
    .smallLogo {
        display: none;
    }

    .collapse {
        z-index: 99;
        margin-top: 28px;
        background: rgb(214, 139, 18);
        background: linear-gradient(49deg, rgba(214, 139, 18, 1) 22%, rgba(194, 33, 79, 1) 100%);
    }


    .collapse .nav-item a {
        color: white;
    }
}

@media (max-width: 576px) {
    .navLogo {
        display: none;
    }

    .smallLogo {
        display: block;
        max-height: 40px;
        margin-right: 10px;
        margin-top: 0;
    }

    .nav,
    .collapse {
        z-index: 99;
        background: rgb(214, 139, 18);
        background: linear-gradient(49deg, rgba(214, 139, 18, 1) 22%, rgba(194, 33, 79, 1) 100%);
        margin-top: 9px;
    }


    .collapse .nav-item a {
        color: white;
    }

}

@media (min-width: 992px) {
    .smallLogo {
        display: none;
    }

    .collapse {
        background-color: transparent !important;
        background: none !important;
        margin-top: 0 !important;
        padding-top: 0 !important;

        .nav-item a {
            color: #5d5d5d;
        }
    }
}

@media (max-width: 992px) {}

.navbar {
    height: 56px;
}

.bottomNavWrapper {
    background-color: $light-orange;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .bottomNavbar {
        height: 40px;
    }
}

.mediumSearch {
    width: 498px;
}

.smallSearch {
    width: 300px;

}

.customSmallSearch {
    width: 400px;
    margin-top: -17px;
}

.xsSearch {
    width: 215px;
    margin-top: -17px;
}

.xxsSearch {
    width: 200px;

}
</style>

