<script>
import { store } from '../data/store';
import { storeFilter } from '../data/storeFilter';

export default {
    name: 'AdvancedFilter',
    data() {
        return {
            store,
            storeFilter
        }
    }
}
</script>

<template>
    <div class="searchContainer d-flex justify-content-center w-100">
        <form class="d-flex flex-column w-75" @submit.prevent="onSubmit">
            <input @keyup.enter="getLocation()" v-model="search" class="form-control me-2" type="search"
                placeholder="Search" aria-label="Search">
            <span v-if="emptySearch" class="text-danger mt-1">Your search returned no results</span>
        </form>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

</style>