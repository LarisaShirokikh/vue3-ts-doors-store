<template>
    <div class="">
      <div class="">
        <h2 class="">Хиты для Вас</h2>
        <button class="">Посмотреть все</button>
      </div>
      
      <div class="">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import ProductCard from '@/components/ProductCard.vue'; 

  export default defineComponent({
    name: 'CategoryCard',
    components: {
    ProductCard
},
data() {
      return {
    
       
        }
}
  })

  
  </script>