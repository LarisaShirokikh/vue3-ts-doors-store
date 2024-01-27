<template>
    <div class="f">
      <div class="">
        <form @submit.prevent="register" class="">
          <div class="">
            <label class="" for="email">
              Email
            </label>
            <input v-model="email" class="" id="username" type="text" placeholder="Введите ваш email">
          </div>
          <div class="mb-6">
            <label class="" for="password">
              Пароль (не менее 8 символов)
            </label>
            <input v-model="password" class="" id="password" type="password" placeholder="Введите ваш пароль">
          </div>
          <div class="mb-6">
            <label class="" for="password">
              Повторите пароль
            </label>
            <input v-model="passwordConfirmation" class="" 
            id="passwordConfirmation" type="password" placeholder="Введите ваш пароль">
          </div>
          <div class="">
            <button class="" type="submit">
              Зарегистрироваться
            </button>
            <router-link to="/register" class="">
              Войти
            </router-link>
          </div>
        </form>
        <div>
            <img src="/foto/tb.jpg" alt="" class="">
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
