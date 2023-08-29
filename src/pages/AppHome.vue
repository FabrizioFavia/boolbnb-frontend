<script>
export default{
  name: 'AppHome',
  data() {
    return {
      message: 'prova',
    }
  },
  methods:{
    prova(){
      console.log('ciao');
    }
  },
  mounted(){
    this.prova();
  }
}
</script>

<template>
  <h1>prova</h1>
</template>