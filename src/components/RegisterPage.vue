<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md">
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Логин
            </label>
            <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Введите ваш логин">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="tel">
              Номер телефона
            </label>
            <input v-model="tel" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Введите ваш логин">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Пароль
            </label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Введите ваш пароль">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Зарегистрироваться
            </button>
            <router-link to="/register" class="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-red-800">
              Войти
            </router-link>
          </div>
        </form>
      </div>
      <div>
          <img src="/foto/tb.jpg" alt="" class="rounded px-8 pt-6 pb-8 mb-4">
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    data() {
      return {
        username: '',
        tel: '',
        password: '',
      };
    },
    methods: {
      register() {
        // Ваш код для обработки входа пользователя
        console.log('Логин:', this.username);
        console.log('Пароль:', this.password);
  
        // Пример редиректа после успешного входа
        this.$router.push('/');
      },
    },
  });
  </script>
  
  <style scoped>
  /* Добавьте стили по вашему усмотрению */
  </style>
  