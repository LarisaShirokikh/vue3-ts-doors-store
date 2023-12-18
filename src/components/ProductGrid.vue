<template>
    <div class="justify-between mx-5 my-10 flex flex-row space-x-8">
    <!-- Контейнер слева с изображением и категорией -->
    <div class="w-full md:w-1/3 mb-4 md:mb-0">
      <CategoryCard class=""/>
    </div>
    
    <!-- Карточки товаров -->
    <div class="grid grid-cols-2 grid-cols-5 gap-6 w-2/3 mt-5">
      <ProductCard v-for="product in products" :key="product.id" :product="product" class="w-full mb-4" />
    </div>
  </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import ProductCard from '@/components/ProductCard.vue'; 
  import CategoryCard from '@/components/CategoryCard.vue';
  
  export default defineComponent({
    name: 'ProductGrid',
    components: {
    ProductCard,
    CategoryCard
},
    data() {
      return {
        categories: [{
            id: 1,
            image: 'https://torex.ru/upload/blog/articles/1172009/_17.jpg',
            title: 'Категория',
            description: 'Описание категории',
        }],
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
            name: 'Входная дверь ART 20 - Бетон светлый, зеркальные вставки',
            description: 'Описание продукта 2',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 2
          },
          {
            id: 3,
            name: 'Входная дверь ART 20 - Бетон светлый, зеркальные вставки',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 4,
            name: 'Входная дверь ART 20 - Бетон светлый, зеркальные вставки',
            description: 'Описание продукта 4',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 4
          },
          {
            id: 3,
            name: 'Продукт 3',
            description: 'Описание продукта 3',
            price: 39100,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 3,
            name: 'Продукт 3',
            description: 'Описание продукта 3',
            price: 200,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          {
            id: 3,
            name: 'Продукт 3',
            description: 'Описание продукта 3',
            price: 200,
            image: 'https://labirintdoors.ru/images/005/262/616/5262616/300x300no_crop/ART-19-white.jpg', // Фейковое изображение для продукта 3
          },
          // Добавьте другие фейковые продукты по мере необходимости
        ],
      };
    },
  });
  </script>
  
  