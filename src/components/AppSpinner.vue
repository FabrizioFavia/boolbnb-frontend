<script>
import { store } from '../data/store';
import { storeFilter } from '../data/storeFilter';

export default {
    name: 'AppSpinner',
    data() {
        return {
            store,
            storeFilter
        }
    },
}

</script>

<template>
    <div v-show="store.loading || storeFilter.loading" class="p-4">
        <button class="btn btn-loading text-white px-2 py-1" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
        </button>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

.btn-loading {
    background-color: $light-orange;
    border-color: $light-orange;
}
</style>
