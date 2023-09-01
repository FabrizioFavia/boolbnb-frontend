<script>
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
            storeFilter
        }
    },
    watch: {
        'storeFilter.emptySearch'() {
            this.$refs.alert.style.display = this.storeFilter.emptySearch === true ? "block" : "none";
        }
    }
}
</script>

<template>
    <div class="alert alert-danger mt-1" role="alert" ref="alert">Your search returned no results!</div>
    <section>
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
                <button class="btn serviceBtn btn-warning d-flex align-items-center justify-content-center">+</button>
                <span class="ms-2 text-white">Services</span>
            </div>
        </div>
        <div>
            <OffCanvas />
        </div>

    </section>
    <AppHome />
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.filterNav {

    background-color: $light-orange;
    opacity: 80%;
    filter: saturate(0.9);
    border-radius: 15px;

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
</style>