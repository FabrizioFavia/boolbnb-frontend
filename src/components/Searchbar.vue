<script>
import axios from 'axios';
import { store } from '../data/store';
// import geolib from 'geolib';
import * as geolib from 'geolib';

export default {
    name: 'SearchBar',
    data() {
        return {
            search: 'Roma, piazza del popolo 11',
            lat1: '',
            lon1: '',
            store
        }
    },
    methods: {
        async getLocation() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_PATH + this.search + '.json?key=' + import.meta.env.VITE_API_KEY);
                this.lat1 = response.data.results[0].position['lat'];
                this.lon1 = response.data.results[0].position['lon'];
                console.log('LAT', this.lat1, 'LON', this.lon1, 'FINE CHIAMATAA');
                this.search = '';
                this.searchApartments()
            } catch (error) {
                console.error('Errore durante la chiamata asincrona:', error);
            }
        },

        // getDistance(lat1, lon1, lat2, lon2) {

        //     const R = 6371; // Raggio della Terra in chilometri

        //     const dLat = (lat2 - lat1) * (Math.PI / 180);
        //     const dLon = (lon2 - lon1) * (Math.PI / 180);

        //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //         Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        //         Math.sin(dLon / 2) * Math.sin(dLon / 2);

        //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        //     const distance = R * c; // Distanza in chilometri
        //     console.log(distance);
        //     return distance;
        // },

        // searchApartmentss() {
        //     this.store.apartments.forEach(element => {
        //         let latitude = element.latitude;
        //         let longitude = element.longitude;
        //         console.log('LAT1:', this.lat1, 'LON1:', this.lon1, 'LAT2:', latitude, 'LON2:', longitude);
        //         this.getDistance(this.lat1, this.lon1, latitude, longitude)
        //     });
        // },
        searchApartments() {
        this.store.apartments.forEach(element => {
            let latitude = element.latitude;
            let longitude = element.longitude;
            let distance = geolib.getPreciseDistance(
                { latitude: this.lat1, longitude: this.lon1 },
                { latitude: latitude, longitude: longitude }
            );
            console.log('LAT1:', this.lat1, 'LON1:', this.lon1, 'LAT2:', latitude, 'LON2:', longitude);
            console.log('Distanza:', distance, 'metri');
        });
    }

    }
};



</script>

<template>
    <div class="searchContainer d-flex justify-content-center w-100">
        <form class="d-flex w-75" @submit.prevent="onSubmit">
            <input @keyup.enter="getLocation()" v-model="search" class="form-control me-2" type="search"
                placeholder="Search" aria-label="Search">
        </form>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;


@media (max-width: 576px) {

    .searchContainer {
        margin-top: 20px;
    }
}
</style>