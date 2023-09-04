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
            apartTotalPages: 0,
            apartCurrentPage: 0,
            clicked: false,
            animation: false,
            services: [],
            servicesIds: [],
            searchHistory: '',
            bedNumber: undefined,
            roomNumber: undefined,
            storeFilter,
            store
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
        // Returns Apartments Data via API Call
        getApartmentsData(pageNumber) {
            this.store.loading = true
            axios.get(
                import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_APARTMENTS_API_PATH,
                { params: { page: pageNumber } }).then((response) => {
                    this.store.loading = false,
                        this.apartments = response.data.results.data,
                        this.apartCurrentPage = response.data.results.current_page,
                        this.apartTotalPages = response.data.results.last_page
                }).catch(err => {
                    this.store.loading = false;
                    this.loadingError = "Cannot load apartments data. " + err;
                    this.$router.push({ name: 'error', params: { code: err.response.status ?? '404' }, query: { message: err.response.data.error ?? err.message } })
                })
        }
    },
    watch: {
        // Update Search Input Data
        '$route.params.search'() {
            this.searchHistory = this.$route.params.search;
        }
    },
    mounted() {
        this.getService(),
            this.getApartmentsData(1),
            this.searchHistory = this.$route.params.search
    }
}
</script>

<template>

    <!-- Search Filters -->
    <form class="filterSection" @submit.prevent="onSubmit">
        <div class="topNav">
            <div class="filterNav mt-3 w-100 py-2 px-2 d-flex align-items-center justify-content-evenly">
                <div>
                    <label class="me-2 text-white" for="rooms">Rooms</label>
                    <input min="1" name="rooms" type="number" v-model="roomNumber" class="w-25 ps-2">
                </div>
                <div>
                    <label class="me-2 text-white" for="beds">Beds</label>
                    <input min="1" name="beds" type="number" v-model="bedNumber" class="w-25 ps-2">
                </div>
                <div class="d-flex">
                    <label class="me-2 text-white" for="radius">Radius</label>
                    <input v-model="range" min="20" step="10" max="2000" name="radius" type="range" class="w-100 ps-2">
                    <span class="text-white ms-2">{{ range }}</span> <span class="ms-1 text-white">km</span>
                </div>

                <div class="d-flex align-items-center ms-5">
                    <button @click="isClicked()"
                        class="btn serviceBtn btn-warning d-flex align-items-center justify-content-center"><span
                            v-show="!clicked">+</span><span v-show="clicked">-</span></button>
                    <span class="ms-2 text-white">Services</span>
                </div>
                <div class="btnContainer">
                    <button @click="saveValues()" class="btn btn-warning px-1" type="submit">Apply</button>
                    <button @click="resetFilters()" class="btn btn-danger ms-2 px-1">Reset</button>
                </div>

            </div>
        </div>
        <div class="bottomNav mb-2" :class="{ 'dropDown': animation }">
            <div v-show="clicked" class="serviceMenu ps-5 text-start py-3 w-100" :class="{ 'd-flex flex-wrap': clicked }">
                <div class="row flex-wrap justify-content-start">


                    <div v-for="(service, i) in services " class="d-block col-2 ms-1">
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
        role="alert" ref="alert">Your search for "{{ searchHistory }}" returned no results! You are viewing all apartments
    </div>

    <!-- Apartment Filter Cards -->
    <section id="apartmentsSec" class="d-flex flex-column justify-content-center container mx-auto">

        <!-- Filtered Apartment Cards -->
        <section v-if="storeFilter.apartFiltered.length > 0"
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
            <template v-for="apartment in storeFilter.apartFiltered">
                <MainApartmentCard :apartment="apartment" />
            </template>
        </section>

        <!-- All Apartments Cards -->
        <section v-else-if="apartments.length > 0"
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-stretch justify-content-center justify-content-xl-start flex-wrap p-4">
            <template v-for="apartment in apartments">
                <MainApartmentCard :apartment="apartment" />
            </template>
        </section>

        <!-- Page Navigation Buttons  -->
        <section v-if="apartments.length > 0 && storeFilter.apartFiltered.length === 0">
            <nav class="text-center" aria-label="Page navigation">
                <ul class="pagination d-inline-flex">
                    <li class="py-3 mx-3">
                        <button @click="apartCurrentPage > 1 ? getApartmentsData(apartCurrentPage - 1) : null"
                            class="page-link d-block rounded arrow" aria-label="Previous"
                            :class="apartCurrentPage > 1 ? null : 'disabled'"><i class="fa-solid fa-chevron-left"></i>
                        </button>
                    </li>
                    <template v-for="pageNumber in apartTotalPages">
                        <li class="py-3 mx-3">
                            <button @click="getApartmentsData(pageNumber)"
                                :class="apartCurrentPage === pageNumber ? 'active' : null"
                                class="page-link d-block rounded">{{ pageNumber }}
                            </button>
                        </li>
                    </template>
                    <li class="py-3 mx-3">
                        <button @click="apartCurrentPage < apartTotalPages ? getApartmentsData(apartCurrentPage + 1) : null"
                            class="page-link d-block rounded arrow" aria-label="Next"
                            :class="apartCurrentPage < apartTotalPages ? null : 'disabled'"><i
                                class="fa-solid fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </section>

    </section>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.filterSection {

    .topNav {
        filter: saturate(0.9);
        border-radius: 15px;
        background-color: $light-orange;
        /* background-color: #e4873e; */
        /* background-color: #373737; */
        /*  background-color: #dc8b49; */
        /*  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
        box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
    }

    .bottomNav {
        width: 97%;
        margin: 0 auto;
        transition: background-color 1.5s ease;
        filter: saturate(0.9);
        border-radius: 0 0 15px 15px;
        /* background-color: $light-orange; */
        background-color: rgba(0, 0, 0, 0.3);
        height: 0;
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

#apartmentsSec {


    &>section:first-child {
        gap: 2.5rem;
    }

    & .pagination {
        // font-family: 'Itim', cursive;
        border-radius: 8px 8px 0 0;
        border-top: 4px solid $primary-orange;

        & .page-link {
            color: $primary-orange;
            background: transparent;
            line-height: 1rem;
            height: 2rem;
            width: 2.625rem;
            border: 1px solid $primary-orange;
            transition: all 0.3s ease 0s;
        }

        & .page-link:hover,
        & .page-link.active,
        & .page-link:focus:not(.arrow) {
            color: white;
            background: $primary-orange;
            line-height: 2.375rem;
            height: 2.5625rem;
            margin: -5px 0 -3px;
            border: 1px solid $primary-orange;
        }

        & .page-link.active:hover {
            background: $light-orange;
        }

        & .page-link.disabled {
            color: lightgrey;
            border: 1px solid lightgrey;
        }
    }
}
</style>