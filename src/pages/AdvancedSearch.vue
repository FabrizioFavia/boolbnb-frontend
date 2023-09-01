<script>
import axios from 'axios';
import AppHome from './AppHome.vue';
import { storeFilter } from '../data/storeFilter';



export default {
    name: 'AdvancedSearch',
    components: {
        AppHome,
    },
    data() {
        return {
            range: 20,
            clicked: false,
            animation: false,
            services: [],
            storeFilter
        }
    },
    methods: {
        isClicked() {
            this.clicked = !this.clicked;
            this.animation = !this.animation;
        },

        getService() {
            console.log('PARTITA');
            axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_SERVICES_API_PATH).then((response) => {
                this.services = response.data.results;
                console.log(this.services)
            })
        }
    },
    watch: {
        'storeFilter.emptySearch'() {
            this.$refs.alert.style.display = this.storeFilter.emptySearch === true ? "block" : "none";
        }
    },
    mounted() {
        this.getService()
    }
}
</script>

<template>
    <div class="alert alert-danger mt-1" role="alert" ref="alert">Your search returned no results!</div>

    <section class="filterSection">
        <div class="topNav">
            <div class="filterNav mt-3 w-100 py-2 px-2 d-flex align-items-center justify-content-evenly">
                <div>
                    <label class="me-2 text-white" for="rooms">Rooms</label>
                    <input min="1" name="rooms" type="number" class="w-25 ps-2">
                </div>
                <div>
                    <label class="me-2 text-white" for="beds">Beds</label>
                    <input min="1" name="beds" type="number" class="w-25 ps-2">
                </div>
                <div class="d-flex">
                    <label class="me-2 text-white" for="radius">Radius</label>
                    <input v-model="range" min="20" step="10" max="1000" name="radius" type="range" class="w-100 ps-2">
                    <span class="text-white ms-2">{{ range }}</span> <span class="ms-1 text-white">km</span>
                </div>

                <div class="d-flex align-items-center ms-5">
                    <button @click="this.isClicked()"
                        class="btn serviceBtn btn-warning d-flex align-items-center justify-content-center"><span
                            v-show="!clicked">+</span><span v-show="clicked">-</span></button>

                    <span class="ms-2 text-white">Services</span>
                </div>
            </div>
        </div>
        <div class="bottomNav mb-2" :class="{ 'dropDown': animation }">
            <div v-show="clicked" class="serviceMenu ps-5 text-start py-3 w-100" :class="{ 'd-flex flex-wrap': clicked }">
                <div class="row flex-wrap justify-content-start">
                    <div v-for="service in services" class="d-block col-2">
                        <input type="checkbox" class="me-2">
                        <span class="text-white serviceName">{{ service.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <AppHome />
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.filterSection {

    .topNav {
        filter: saturate(0.9);
        border-radius: 15px;
        background-color: $light-orange;
    }

    .bottomNav {
        width: 95%;
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
        height: 150px;
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

    }

}


@media screen and (-webkit-min-device-pixel-ratio:0) {

    input[type="range"] {
        accent-color: #d86a41;
        height: 4px;
        margin-top: 10px;
    }
}
</style>