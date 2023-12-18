 
<template>
    <nav class="bg-white p-2">
        <div class="container mx-auto flex items-center justify-between">
            <router-link 
            to="/" 
            class="text-gray-700 text-xl font-semibold ml-4 hover:text-red-500">Двери Эталон</router-link>
            <template v-if="isLoggedIn">
          <div class="flex items-center space-x-4 ml-auto">
            <img src="/foto/heart.png" alt="favorites" class="w-8 h-8" htef="/favorites">
            <img src="/foto/kol.png" alt="favorites" class="w-8 h-8" htef="/favorites">
            <img src="/foto/set.png" alt="favorites" class="w-8 h-8" htef="/favorites">
              <img src="https://avotar.ru/avatar/krutye/150/38.jpg" alt="User Avatar" class="w-8 h-8 rounded-full">
          </div>
          
          
        </template>
        <!-- Условный рендеринг для незалогиненного пользователя -->
        <template v-else>
          <div class="flex items-center space-x-4 ml-auto text-gray-700 ">
            <!-- <img src="/foto/heart.png" alt="favorites" class="w-8 h-8" htef="/favorites"> -->
            <router-link to="/login" class="hover:text-red-500">Войти</router-link>
            <span>/</span>
            <!-- <img src="/foto/heart.png" alt="favorites" class="w-8 h-8" htef="/favorites"> -->
            <router-link to="/register" class="hover:text-red-500">Регистрация</router-link>
          </div>
          
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
      isLoggedIn: false, // Предположим, что пользователь залогинен (вам нужно настроить логику)
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
  