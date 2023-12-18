<template>
    <div class="bg-white p-3 rounded-lg shadow-md">
        <div>
    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-cover mb-4" style="object-fit: cover;" />
    
      <h3 class="text-sm font-bold text-gray-700">{{ product.name }}</h3>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-semibold text-red-500">{{ product.price }} руб.</span>
        <!-- <button @click="addToCart" class="px-4 py-2 bg-green-500 text-white rounded">Добавить в корзину</button> -->
      </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      addToCart() {
        // Логика добавления товара в корзину
      },
    },
  });

  
  </script>
  