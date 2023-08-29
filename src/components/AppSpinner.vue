<script>
import { store } from '../data/store';

export default {
    name: 'AppSpinner',
    data() {
        return {
            store
        }
    },
}

</script>

<template>
    <div v-if="store.loading">
        <button class="btn" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
        </button>
    </div>
</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

button {
    background-color: $light-orange;
    border-color: $light-orange;
}
</style>
