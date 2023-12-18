<template>
  <vueSlickCarousel/>
  <advantages-blog />
  <product-grid />
  <delivery-blog/>
  <product-grid-two/>
    
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AdvantagesBlog from '@/components/AdvantagesBlog.vue';
import ProductGrid from '@/components/ProductGrid.vue';
  import vueSlickCarousel from '../components/BannersCarousel.vue'; 
  import DeliveryBlog from '@/components/DeliveryBlog.vue';
  import ProductGridTwo from '@/components/ProductGridTwo.vue';
  
  export default defineComponent({
    name: 'HomeView',
    components: 
    {
      vueSlickCarousel,
        AdvantagesBlog,
        ProductGrid,
        DeliveryBlog,
        ProductGridTwo
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  