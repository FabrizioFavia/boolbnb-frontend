<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'prova',
    }
  },
  methods: {
    apiCall(){
      axios.get('http://localhost:8000/api/apartments').then((response) => {
        console.log(response.data);
    });
    }
  },
  mounted() {
    this.apiCall();
  }
}
</script>

<template>
  <router-link class="m-3" to="/homeProva">
    Home
  </router-link>
</template>