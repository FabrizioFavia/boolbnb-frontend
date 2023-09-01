<script>

import tt from '@tomtom-international/web-sdk-maps';

export default {
  name: 'Map',

  props: {
    apartment: Object
  },

  methods: {
    setPoint() {
      let map = null;

    map = tt.map({
      key: import.meta.env.VITE_API_KEY,
      container: 'map',
      center: [this.apartment.longitude, this.apartment.latitude],
      zoom: 18,
      radius: 20000,
    });

    new tt.Marker().setLngLat([this.apartment.longitude, this.apartment.latitude]).addTo(map);
    map.addControl(new tt.NavigationControl());

    return map
    },
  },
  mounted() {
    this.setPoint()
  }
}
</script>

<template>

<div id="map">

</div>

</template>

<style scoped lang="scss">
@use 'src/style.scss' as *;

#map{
    height: 400px;
    width: 100%;
}


</style>