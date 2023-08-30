<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
    name: 'SearchBar',
    data() {
        return {
            search: '',
            lat1: '',
            lon1: '',
            store


        }
    },
    methods: {
        getLocation() {
            axios.get(
                import.meta.env.VITE_API_PATH + this.search + '.json?key=' + import.meta.env.VITE_API_KEY).then((response) => {
                    this.lat1 = response.data.results[0].position['lat'];
                    this.lon1 = response.data.results[0].position['lon'];
                    console.log('LAT', this.lat1, 'LON' ,  this.lon1)
                })
            this.search = '';
            this.searchApartments()
            /* this.getDistance() */
        },

        getDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Raggio della Terra in chilometri

            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c;
            console.log(distance);
            return distance;
        },


        searchApartments() {
            this.store.apartments.forEach(element => {
                let latitude = element.latitude;
                let longitude = element.longitude;

                this.getDistance(this.lat1, this.lon1, latitude, longitude)
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