<template>
    <div class=" bg-yellow-200 p-4 rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-700">Хиты для Вас</h2>
        <button class="text-sm text-gray-600 border rounded-md px-4 py-1 hover:underline">Посмотреть все</button>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
    
        products: [
          {
            id: 1,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 1',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 1
          },
          {
            id: 2,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 2',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 2
          },
          {
            id: 3,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 3,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 3,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 3,
            name: 'Входная дверь ART с Зеркалом 19 - Белый софт',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          
        ]}
}
  })

  
  </script>