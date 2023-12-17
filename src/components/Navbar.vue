 
<template>
    <nav class="bg-white p-2">
        <div class="container mx-auto flex items-center justify-between">
            <router-link to="/" class="text-gray-700 text-xl font-semibold ml-4">Двери Эталон</router-link>
            <template v-if="isLoggedIn">
          <div class="flex items-center space-x-4 ml-auto">

              <router-link to="/favorites" class="text-gray-700">Избранное</router-link>
              <img src="https://avotar.ru/avatar/krutye/150/38.jpg" alt="User Avatar" class="w-8 h-8 rounded-full">
          </div>
          
          
        </template>
        <!-- Условный рендеринг для незалогиненного пользователя -->
        <template v-else>
          <li>
            <router-link to="/login" class="text-gray-700">Войти</router-link>
          </li>
          <li>
            <router-link to="/register" class="text-gray-700">Регистрация</router-link>
          </li>
        </template>
        </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavbarView',
    data() {
    return {
      isLoggedIn: true, // Предположим, что пользователь залогинен (вам нужно настроить логику)
    };
  },
  });
  </script>
  
  <style scoped>
/* Добавьте стили по мере необходимости */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

nav ul {
  display: flex;
  list-style-type: none;
}

nav ul li {
  margin-right: 10px;
}

/* Медиа-запрос для мобильных устройств */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  nav ul {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }

  nav ul li {
    margin: 5px 0;
  }
}
</style>
  