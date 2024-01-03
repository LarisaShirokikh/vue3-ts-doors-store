<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md mb-8">
        <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Введите ваш email">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Пароль (не менее 8 символов)
            </label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Введите ваш пароль">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Повторите пароль
            </label>
            <input v-model="passwordConfirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="passwordConfirmation" type="password" placeholder="Введите ваш пароль">
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
        <div>
            <img src="/foto/tb.jpg" alt="" class="rounded px-8 pt-6 pb-8 mb-4">
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const passwordConfirmation = ref('');
      const router = useRouter();
      const register = async () => {
        try {
          if (!email.value || !password.value || password.value !== passwordConfirmation.value) {
            console.error('Пожалуйста, заполните все поля и убедитесь, что пароли совпадают');
            return;
          }
  
          const response = await axios.post('http://localhost:3000/api/user', {
            email: email.value,
            password: password.value,
          });
  
          console.log('Ответ от бэкенда:', response.data);
  
          if (response.status === 201) {
            
            router.push('/');
          } else if (response.status === 400) {
          //toast.warning('Такой email уже существует');
          } else {
            console.error('Статус ответа:', response.status);
            console.error('Данные ответа:', response.data);
          }
        } catch (error: any) {
          console.error('Ошибка:', error);
  
          if (error.response) {
            console.error('Дополнительные данные об ошибке:', error.response.data);
          }
        }
      };
  
      return {
        email,
        password,
        passwordConfirmation,
        register,
      };
    },
  });
  </script>
  
  
  <style scoped>
  /* Добавьте стили по вашему усмотрению */
  </style>
