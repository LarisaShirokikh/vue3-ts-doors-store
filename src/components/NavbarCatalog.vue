<template>
  <nav class="bg-white p-4 border-b flex justify-between items-center">
    <div class="flex items-center text-lg hover:text-red-500 text-gray-700">
      <img src="/logo/marker.png" alt="marker" class=" p-3">
      <span>Местоположение</span>
    </div>

    <div class="flex flex-wrap text-gray-700 items-center space-y-10 sm:space-y-0 sm:space-x-8">
      <a :href="socialLinks.weibo" class=" font-semibold text-lg hover:text-red-500 transition duration-300">Хиты продаж</a>
      <a :href="socialLinks.telegram" class=" font-semibold text-lg hover:text-red-500 transition duration-300">Скидки</a>
      <a :href="socialLinks.whatsapp" class=" font-semibold text-lg hover:text-red-500 transition duration-300">Белые двери</a>
      <a :href="socialLinks.weibo" class=" font-semibold text-lg hover:text-red-500 transition duration-300">С терморазрывом</a>
      <a :href="socialLinks.weibo" class=" font-semibold text-lg hover:text-red-500 transition duration-300">Популярные</a>
    </div>
  </nav>
</template>


  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavbarCatalog',
  
    data() {
      return {
      
        socialLinks: {
          weibo: 'https://example.com/weibo',
          telegram: 'https://example.com/telegram',
          whatsapp: 'https://example.com/whatsapp',
        },
      };
    },
  });
  </script>
  