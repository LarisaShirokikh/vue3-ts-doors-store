<template>
    <nav class="bg-white p-4 border-t  border-gray-300">
      <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div class="flex flex-col sm:flex-row w-full">
          <button class="text-gray-700 bg-yellow-400 rounded-md px-6 py-2 mt-1 sm:mb-0 h-full">
            Каталог
          </button>
  
          <div class="relative flex items-center ml-0 sm:ml-4 flex-grow w-1/2 mr-4">
            <div class="flex w-full">
              <input v-model="search" placeholder="Поиск" class="border border-yellow-400 rounded-l-md py-2 px-2 w-full" />
              <button class="bg-yellow-400 text-gray-700 rounded-r-md px-4 py-2">
                Найти
              </button>
            </div>
          </div>

          
          <!-- Блок Время работы -->
          <img src="/logo/work.png" alt="work" class="">
          <div class="ml-0 sm:ml-4 mb-2 sm:mb-0 w-1/2 gap-5">
            <p class="text-m text-gray-700">Время работы:</p>
            <p class="text-gray-700">ПН-ВС с 10:00 - 21:00</p>
          </div>
          
          <div class="flex flex-row">
            <button class="text-gray-700 bg-yellow-400 rounded-md px-6 h-full" style="white-space: nowrap">
               Вызвать замерщика
              </button>
          </div>

          <!-- Номер телефона и Иконки соцсетей -->
          <div class="ml-0 sm:ml-4  sm:flex-row space-x-4">
            <div class="text-gray-700" style="white-space: nowrap;">
              <a :href="telLink" class="text-gray-700 text-xl">+7 (926) 021-73-65</a>
            </div>
  
            <div class="flex w-full sm:flex-row space-x-4 justify-between w-5 h-5">
            <img :href="socialLinks.teleLink" src="/logo/telega.png" alt="Telegram" class="">
              <img href='' src="/logo/vk.png" alt="Vkontakte" class="">
              <img href='' src="/logo/wp.png" alt="WatsApp" class="">
            </div>
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
          teleLink: 'https://example.com/weibo',
          telegram: 'https://example.com/telegram',
          whatsapp: 'https://example.com/whatsapp',
        },
      };
    },
  });
  </script>
  