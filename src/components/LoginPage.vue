<template>
    <div class="flex items-center justify-center min-h-screen">
        <div>
            <img src="/foto/tb.jpg" alt="" class="rounded px-8 pt-6 pb-8 mb-4">
        </div>
      <div class="w-full max-w-md">
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Логин:
            </label>
            <input v-model="email" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" type="text" placeholder="Введите ваш логин">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Пароль:
            </label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Введите ваш пароль">
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Войти
            </button>
            <router-link to="/register" class="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-red-800">
              Зарегистрироваться
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { authenticateWithEmailPassword } from '../server/auth'
  import { toast } from 'vue3-toastify';

  export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
    try {
        const userData = await authenticateWithEmailPassword(this.email, this.password);
        console.log('userData',userData)
        if (userData) {
          sessionStorage.setItem('userToken', JSON.stringify(userData));
          const storedToken = sessionStorage.getItem('userToken');
    console.log('stored token', storedToken);
            toast.success('Успешный вход', { theme: 'colored' });
            console.log('Успешный вход:', this.username);
            this.$router.push('/');
        } else {
            console.error('Токен не верифицирован');
            toast.error('Такой пользователь не найден', { theme: 'colored' });
            this.$router.push('/login');
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        if (error.response) {
            console.log('Данные ответа сервера:', error.response.data);
            console.log('Статус код:', error.response.status);
        }
    }
  }
}
});
  </script>
  
  <style scoped>
  /* Добавьте стили по вашему усмотрению */
  </style>
  