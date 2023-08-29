<script>
import { store } from '../data/store';

export default {
  name: 'AppShowApartment',
  data() {
    return {
      store,
      loadingError: false,
    }
  }
}
</script>

<template>

  <!-- Error Message -->
  <div v-if="loadingError" class="d-flex justify-content-center my-10 alert alert-danger">
    <p>{{ loadingError }}</p>
  </div>

</template>

<style scoped lang="scss">@use 'src/style.scss' as *;

</style>