<template>
  <nav class="bg-white p-4">
    <div class="container mx-auto flex flex-col sm:flex-row items-center justify-center">

      <div class="flex flex-wrap justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a :href="socialLinks.weibo" class="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300">Хиты продаж</a>
        <a :href="socialLinks.telegram" class="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300">Скидки</a>
        <a :href="socialLinks.whatsapp" class="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300">Белые двери</a>
        <a :href="socialLinks.weibo" class="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300">С терморазрывом</a>
        <a :href="socialLinks.weibo" class="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300">Популярные</a>
      </div>

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
  