<template>
  <vueSlickCarousel/>
    <div>
      <h1>Welcome to the Doors Store!</h1>
      <router-link to="/doors">View Doors</router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import vueSlickCarousel from '../components/BannersCarousel.vue'; 
  
  export default defineComponent({
    name: 'HomeView',
    components: 
    {
      vueSlickCarousel
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  