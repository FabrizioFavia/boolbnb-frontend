<script>

import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue';

export default{
  components:{
    HelloWorld,
    AppHeader,
    
  }
}

</script>

<template>
  <AppHeader />
<HelloWorld />

<main>
  <router-view>
    
  </router-view>
</main>



</template>

<style scoped>

</style>
