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
            servicesIds: [],
            searchHistory: '',
            bedNumber: undefined,
            roomNumber: undefined,
            storeFilter
        }
    },
    methods: {
        isClicked() {
            this.clicked = !this.clicked;
            this.animation = !this.animation;
        },

        getService() {
            axios.get(import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_SERVICES_API_PATH).then((response) => {
                this.services = response.data.results;
            })
        },
        saveValues() {
            let params = {
                bedNumber: this.bedNumber,
                roomNumber: this.roomNumber,
                range: this.range,
                services: this.servicesIds
            };

            this.storeFilter.searchParams = params
            this.servicesIds= []
            // params = undefined;
        },

        resetFilters() {
            this.bedNumber= undefined,
            this.roomNumber= undefined,
            this.range= 20,
            this.servicesIds= [],
            this.storeFilter.searchParams = null
        }
    },
    watch: {
        'storeFilter.emptySearch'() {
            this.$refs.alert.style.display = this.storeFilter.emptySearch === true ? "block" : "none";
        },
        'history.state'() {
            this.searchHistory = history.state.search
        }
    },
    mounted() {
        this.getService(),
        this.searchHistory = history.state.search
    }
}
</script>

<template>
    <div v-show="storeFilter.apartFiltered.length === 0" class="alert alert-danger mt-1" role="alert" ref="alert">Your search for "{{ searchHistory }}" returned no results!</div>

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

    <AppHome />
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
</style>