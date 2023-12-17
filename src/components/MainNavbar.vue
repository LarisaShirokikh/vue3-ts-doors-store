<template>
    <nav class="bg-white p-4 border-t border-b border-gray-300">
      <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <!-- Кнопка Каталог и Инпут поиска -->
        <div class="flex flex-col sm:flex-row w-full">
  
          <button class="text-white bg-yellow-500 rounded-md px-6 py-3 mb-2 sm:mb-0">
            Каталог
          </button>
  
          <!-- Инпут поиска -->
          <div class="relative flex items-center ml-4 flex-grow w-1/2">
            <input v-model="search" placeholder="Поиск" class="border border-yellow-500 rounded-md py-3 px-4 w-full" />
            <button class="bg-yellow-500 text-white rounded-md px-4 py-3">
              Найти
            </button>
          </div>
        </div>


           <!-- Блок Время работы -->
      <div class="ml-0 sm:ml-4 mb-2 sm:mb-0 w-1/2">
        <p class="text-sm text-gray-800">Время работы:</p>
        <p class="text-gray-800">ПН-ВС с 10:00 - 21:00</p>
      </div>

      <!-- Номер телефона и Иконки соцсетей -->
      <div class="ml-0 sm:ml-4  sm:flex-row space-x-4 w-full sm:w-auto">
        <div class="text-gray-800 ">
          <a :href="telLink" class="text-gray-800 text-xl ">+7 (926) 021-73-65</a>
        </div>
        <div class=" sm:flex-row space-x-4 sm:w-auto">
          <a :href="socialLinks.weibo" class="text-gray-800">Weibo</a>
          <a :href="socialLinks.telegram" class="text-gray-800">Telegram</a>
          <a :href="socialLinks.whatsapp" class="text-gray-800">WhatsApp</a>
        </div>
        </div>

      </div>
    </nav>
  </template>
  
  
  
  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'MainNavbar',
  
    data() {
      return {
        search: '',
        telLink: 'tel:+79260217365',
        socialLinks: {
          weibo: 'https://example.com/weibo',
          telegram: 'https://example.com/telegram',
          whatsapp: 'https://example.com/whatsapp',
        },
      };
    },
  });
  </script>
  