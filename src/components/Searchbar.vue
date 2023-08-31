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
            emptySearch: false,
            lat1: '',
            lon1: '',
            store,
            storeFilter
        }
    },
    methods: {
        // Get longitude and latitude from input search, via api call
        async getLocation() {
            this.storeFilter.apartFiltered = [],
            this.store.loading = true
            try {
                const response = await axios.get(import.meta.env.VITE_API_PATH + this.search + '.json?key=' + import.meta.env.VITE_API_KEY);
                this.lat1 = response.data.results[0].position['lat'];
                this.lon1 = response.data.results[0].position['lon'];
                this.search = '';
                this.searchApartments()
            } catch (error) {
                this.store.loading = false;
                console.error('Error during asynchronous call:', error);
            }
        },
        // Get distance between two places in km
        getDistance(lat1, lon1, lat2, lon2) {
            const R = 6371000;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // meters
            const distanceKm = (distance / 1000).toFixed(2); // km, rounded
            // console.log(distance, distanceKm);
            return distanceKm;
        },
        // Iterates and retrieves location of database apartments
        searchApartments() {
            this.storeFilter.apartmentsall.forEach(element => {
                let distance = this.getDistance(this.lat1, this.lon1, element.latitude, element.longitude);
                console.log('Lat1:', this.lat1, 'Lon1:', this.lon1, 'Lat2:', element.latitude, 'Lon2:', element.longitude, 'DISTANCE: ', distance + 'km');
                if(distance <= 20) {
                    this.storeFilter.apartFiltered.push(element)
                }
            });
            this.store.loading = false;
            this.storeFilter.apartFiltered.length > 0 ? null : this.emptySearch = true;
            setTimeout(() => this.emptySearch = false, 3500); 
        },
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
            <input @keyup.enter="search.length > 0 ? getLocation() : null" v-model="search" class="form-control me-2" type="search"
                placeholder="Search city or address" aria-label="Search">
            <span v-if="emptySearch" class="text-danger mt-1">Your search returned no results</span>
        </form>
        <button class="btn btn-warning ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Filters</button>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.text-danger {
    font-size: .75rem;
}

@media (max-width: 576px) {

    .searchContainer {
        margin-top: 20px;
    }
}
</style>