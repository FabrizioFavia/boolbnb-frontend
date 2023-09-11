<script>
import axios from 'axios';
import AppHome from './AppHome.vue';
import { storeFilter } from '../data/storeFilter';
import { store } from '../data/store';
import AppSpinner from '../components/AppSpinner.vue';
import MainApartmentCard from '../components/MainApartmentCard.vue';

export default {
    name: 'AdvancedSearch',
    components: {
        AppHome,
        AppSpinner,
        MainApartmentCard
    },
    props: {
        search: String
    },
    data() {
        return {
            range: 20,
            apartments: [],
            sponsored: [],
            apartTotalPages: 0,
            apartCurrentPage: 0,
            clicked: false,
            animation: false,
            services: [],
            servicesIds: [],
            searchHistory: '',
            bedNumber: undefined,
            roomNumber: undefined,
            sponsored: true,
            storeFilter,
            store,
            screenWidth: window.innerWidth,
        }
    },
    methods: {
        // Show/Hide Services Filter
        isClicked() {
            this.clicked = !this.clicked;
            this.animation = !this.animation;
        },
        // Get Services List via API Call
        getService() {
            axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_SERVICES_API_PATH)
                .then((response) => this.services = response.data.results)
        },
        // Save Filter values inside storeFilter
        saveValues() {
            let params = {
                bedNumber: this.bedNumber,
                roomNumber: this.roomNumber,
                range: this.range,
                services: this.servicesIds
            };
            this.storeFilter.searchParams = params,
                this.servicesIds = []
        },
        // Reset Filter values
        resetFilters() {
            this.bedNumber = undefined,
                this.roomNumber = undefined,
                this.range = 20,
                this.servicesIds = [],
                this.storeFilter.searchParams = null
        },
        // Returns Sponsored Apartments Data via API Call
        getSponsored() {
            this.store.loading = true
            axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_SPONSORED_API_PATH,).then((response) => {
                this.store.loading = false;
                this.sponsored = response.data.results,
                    console.log("SPONSORIZZATI==>", this.sponsored);
            }).catch(err => {
                this.store.loading = false;
                this.loadingError = "Cannot load apartments data. " + err;
                this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
            })
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    },
    watch: {
        // Update Search Input Data
        '$route.params.search'() {
            this.searchHistory = this.$route.params.search;
        }
    },
    mounted() {
        this.getService(),
        this.searchHistory = this.$route.params.search,
        window.addEventListener('resize', this.updateScreenWidth);
        this.getSponsored()
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
}
</script>

<template>
    <!-- Search Filters -->

    <!-- offCanvas -->
    <div v-if="screenWidth < 992" class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1"
        id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header my-3 d-flex justify-content-evenly">
            <img src="../assets/logo4.jpeg" class="offLogo" alt="logo">
            <h5 class="offcanvas-title py-3" id="staticBackdropLabel">Customize your apartment search</h5>
        </div>
        <div class="offcanvas-body pb-2">
            <div class="filterNav w-100 py-2 px-2 d-flex flex-column">
                <div class="d-flex my-4">
                    <div>
                        <label class="me-2 " for="rooms">Rooms number</label>
                        <input min="1" name="rooms" type="number" v-model="roomNumber" class="w-25 ps-2">
                    </div>
                    <div>
                        <label class="me-2 " for="beds">Beds number</label>
                        <input min="1" name="beds" type="number" v-model="bedNumber" class="w-25 ps-2">
                    </div>
                </div>
                <div class="d-flex px-3 my-4">
                    <label class="me-2 " for="radius">Radius</label>
                    <input v-model="range" min="20" step="10" max="2000" name="radius" type="range" class="w-100 ps-2">
                    <span class=" ms-2">{{ range }}</span> <span class="ms-1 ">km</span>
                </div>
            </div>
            <h5 class="text-start ms-4 my-3">Additional services</h5>
            <div class="serviceMenu ps-4 text-start py-3 w-100">
                <div class="row flex-wrap justify-content-start">
                    <div v-for="(service, i) in services " class="d-block col-6 serviceItem">
                        <input type="checkbox" v-model="servicesIds" :true-value="[]" class="me-2" :value="service.id">
                        <span class="serviceName">{{ service.name }}</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <button @click="saveValues()" class="btn btn-warning text-white px-2" type="submit"
                        data-bs-dismiss="offcanvas" aria-label="Close">Apply</button>
                </div>
                <div class="col-3 mb-3">
                    <button class="btn btn-danger text-white px-2" type="submit" data-bs-dismiss="offcanvas"
                        aria-label="Close">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- offCanvas end-->

    <!-- advanced searchbar -->

    <form class="filterSection w-100 mt-3" @submit.prevent="onSubmit">
        <div class="topNav">
            <div class="filterNav w-100 py-2 px-2 d-flex justify-content-evenly">
                <div class="choicesContainer">
                    <label class="me-2 text-white" for="rooms">Rooms</label>
                    <input min="1" name="rooms" type="number" v-model="roomNumber" class="w-25 ps-2">
                </div>
                <div class="choicesContainer">
                    <label class="me-2 text-white" for="beds">Beds</label>
                    <input min="1" name="beds" type="number" v-model="bedNumber" class="w-25 ps-2">
                </div>
                <div class="radiusContainer d-flex">
                    <label class="me-2 text-white" for="radius">Radius</label>
                    <input v-model="range" min="20" step="10" max="2000" name="radius" type="range" class="w-100 ps-2">
                    <span class="text-white ms-2">{{ range }}</span> <span class="ms-1 text-white">km</span>
                </div>

                <div class=" d-flex align-items-center justify-content-center">
                    <button @click="isClicked()"
                        class="btn serviceBtn btn-warning d-flex align-items-center justify-content-center"
                        data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        <span v-show="!clicked">+</span><span v-show="clicked">-</span>
                    </button>
                    <span class="ms-2 text-white">Filters</span>
                </div>
                <div class="filterBtnContainer">
                    <button @click="saveValues()" class="btn applyBtn btn-warning px-1 text-white"
                        type="submit">Apply</button>
                    <button @click="resetFilters()" class="btn btn-danger ms-2 px-1">Reset</button>
                </div>
            </div>
        </div>

        <!-- Filters Container -->
        <div v-if="screenWidth > 992" class="bottomNav mb-2" :class="{ 'dropDown': animation }">
            <div v-show="clicked" class="serviceMenu ps-5 text-start py-3 w-100" :class="{ 'd-flex flex-wrap': clicked }">
                <div class="row flex-wrap justify-content-start">
                    <div v-for="(service, i) in services " class="d-block col-2 ">
                        <input type="checkbox" v-model="servicesIds" :true-value="[]" class="me-2" :value="service.id">
                        <span class="text-white serviceName">{{ service.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <!-- Spinner Loader -->
    <AppSpinner></AppSpinner>

    <!-- Empty Search Alert Message -->
    <div v-show="storeFilter.apartFiltered.length === 0 && !storeFilter.loading" class="alert alert-danger mt-3"
        role="alert" ref="alert">Your search for "{{ searchHistory }}" returned no results! 
    </div>

    <!-- Apartment Filter Cards -->
    <div v-if="sponsored.length > 0" class="container d-flex justify-content-start mx-auto my-3">
        <h3 class="text-start ms-4 mt-5">Best Choice</h3>
    </div>
    <section id="sponsoredSec" class="d-flex flex-column justify-content-center container mx-auto">

        <!-- Sponsored Apartments -->
        <section v-if="sponsored.length > 0"
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
            <template v-for="apartment in sponsored">
                <MainApartmentCard :apartment="apartment" :sponsored="sponsored" />
            </template>
        </section>

    </section>

    <div v-if="storeFilter.apartFiltered.length > 0" class="container d-flex justify-content-start mx-auto my-3">
        <h3 class="text-start ms-4 mt-5">All apartments</h3>
    </div>
    <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">
        <!-- Filtered Apartment Cards -->
        <section v-if="storeFilter.apartFiltered.length > 0"
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
            <template v-for="apartment in storeFilter.apartFiltered">
                <MainApartmentCard :apartment="apartment" />
            </template>
        </section>

        <!-- All Apartments Cards -->
        <!-- <section v-else-if="apartments.length > 0"
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
            <template v-for="apartment in apartments">
                <MainApartmentCard :apartment="apartment" />
            </template>
        </section> -->
    </section>
    
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;


/* Offcanvas */

.offLogo {
    height: 35px;
}

.filterSection {

    // position: fixed;
    // width: 100%;
    // top: 60px;
    // z-index: 2;
    .topNav {
        filter: saturate(0.9);
        background-color: $light-orange;
    }

    .bottomNav {

        margin: 0 auto;
        transition: background-color 1.5s ease;
        filter: saturate(0.9);
        /* border-radius: 0 0 15px 15px; */
        background-color: rgb(137 158 165 / 72%);

        transition: all .5s ease;
    }

    .dropDown {
        height: 177px;
        transform: translateY(0);
    }

    .filterNav {

        .serviceBtn {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            padding-bottom: 3px;
            padding-left: 1px;
        }

        input[type=number] {
            border-radius: 7px;
            border: 0;

            &:focus-visible {
                outline: none
            }
        }
    }

    .serviceMenu {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border: 1px solid #ffffff29;
    }

}

@media screen and (-webkit-min-device-pixel-ratio:0) {

    input[type="range"] {
        accent-color: #d86a41;
        height: 4px;
        margin-top: 10px;
    }
}

#apartmentsSec, #sponsoredSec {

    &>section:first-child {
        gap: 2.5rem;
    }

}

/* Media Query */

@media (max-width: 992px) {
    .radiusContainer {
        display: none !important;
        ;
    }
}

@media (max-width: 768px) {
    .choicesContainer {
        display: none;
    }

    .serviceItem {
        margin-bottom: 15px;
    }

    .filterBtnContainer .applyBtn {
        display: none;
    }
}
</style>