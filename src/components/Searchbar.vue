<script>
import axios from 'axios';
import { store } from '../data/store';
import { storeFilter } from '../data/storeFilter';
// import * as geolib from 'geolib';

export default {
    name: 'SearchBar',
    data() {
        return {
            search: '',
            lat1: '',
            lon1: '',
            animation: false,
            store,
            storeFilter
        }
    },
    watch: {
        'storeFilter.searchParams'() {
            this.getLocation()
        }
    },
    methods: {
        // Get Longitude and Latitude from input search, via API Call
        async getLocation() {
            this.search = this.search.trim();
            if (!this.search) return this.animationInput(); // If empty search -> call 'animationInput()' and stop this function
            this.storeFilter.apartFiltered = [],
                this.storeFilter.loading = true;
            if (window.navigator.platform.toLowerCase().includes('win')) {
                console.log('windows.navigator: ', window.navigator);
                axios.defaults.withCredentials = false;
                try {
                    const response = await axios.get(import.meta.env.VITE_API_PATH + this.search + '.json?key=' + import.meta.env.VITE_API_KEY);
                    this.lat1 = response['results']['0']['position']['lat'];
                    this.lon1 = response['results']['0']['position']['lon'];
                    this.searchApartments()
                } catch (error) {
                    this.storeFilter.loading = false;
                    this.animationInput();
                    console.error('⚠️ Error during Server Proxy -> TomTom API Call while trying to get location from search input:', error);
                }
            } else {
                try {
                    const response = await axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_API_TOMTOM_GEO_PATH + this.search);
                    this.lat1 = response.data.lat;
                    this.lon1 = response.data.lon;
                    this.searchApartments()
                } catch (error) {
                    this.storeFilter.loading = false;
                    this.animationInput();
                    console.error('⚠️ Error during Server Proxy -> TomTom API Call while trying to get location from search input:', error);
                }
            }

        },
        // Get Distance between two places in km
        getDistance(lat1, lon1, lat2, lon2) {
            // Haversine Formula
            const R = 6371000;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // meters
            const distanceKm = (distance / 1000).toFixed(2); // km, rounded
            return distanceKm;
        },
        // Manages the search Filtering the results
        searchApartments() {
            this.storeFilter.apartmentsall.forEach(element => {
                element.distance = this.getDistance(this.lat1, this.lon1, element.latitude, element.longitude);
                if (this.storeFilter.searchParams) {
                    this.checkFilter(element) // Check if advanced filters are set
                } else {
                    element.distance <= 20 && this.storeFilter.apartFiltered.push(element) // Basic Search: show only apartments with 20km distance
                }
            });
            this.storeFilter.apartFiltered.sort((a, b) => a.distance - b.distance), // sort apartments by distance
                this.storeFilter.loading = false;
            // this.storeFilter.apartFiltered.length === 0 && this.animationInput();
            this.$router.push({ name: 'advancedSearch', params: { search: this.search } });
        },
        // Check Advanced Filter On Search Input
        checkFilter(element) {
            // Room Number Filter
            if (Number(element.room_number) === Number(this.storeFilter.searchParams.roomNumber) || this.storeFilter.searchParams.roomNumber === undefined) {
                // Bed Number Filter
                if (Number(element.bed_number) === Number(this.storeFilter.searchParams.bedNumber) || this.storeFilter.searchParams.bedNumber === undefined) {
                    // Services Filter
                    if (this.storeFilter.searchParams.services.every((el) => element.services.some((item) => item.id === el))) {
                        // Range Filter
                        element.distance <= Number(this.storeFilter.searchParams.range) && this.storeFilter.apartFiltered.push(element)
                    }
                }
            }
        },
        // Add/Remove Animation on searchbar with wrong input
        animationInput() {
            this.animation = true,
                setTimeout(() => this.animation = false, 600)
        }

        // Use Geolib Library to get distance between two places
        // searchApartments() {
        // this.store.apartments.forEach(element => {
        //     let latitude = element.latitude;
        //     let longitude = element.longitude;
        //     let distance = geolib.getPreciseDistance(
        //         { latitude: this.lat1, longitude: this.lon1 },
        //         { latitude: latitude, longitude: longitude }
        //     );
        //     console.log('LAT1:', this.lat1, 'LON1:', this.lon1, 'LAT2:', latitude, 'LON2:', longitude);
        //     console.log('Distance:', distance, 'meters');
        // });
    }
}

</script>

<template>
    <div class="searchContainer d-flex justify-content-center w-100">
        <form class="d-flex flex-column w-75" @submit.prevent="onSubmit">
            <input @keyup.enter="getLocation()" v-model="search" class="form-control me-2" type="search"
                placeholder="Search city or address" aria-label="Search" :class="{ 'inputError': animation }">
        </form>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.inputError {
    animation: shake .2s;
    animation-iteration-count: 2;
}

@keyframes shake {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(2deg);
    }

    50% {
        transform: rotate(0deg);
    }

    75% {
        transform: rotate(-2deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

@media (max-width: 576px) {
    .searchContainer {
        margin-top: 20px;
    }
}</style>