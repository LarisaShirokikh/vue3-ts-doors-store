<template>
  <div id="app">
    <navbar-view></navbar-view>
    <main-navbar></main-navbar>
    <navbar-catalog v-if="isDesktop"></navbar-catalog>
    <router-view />
    <futer-com />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarView from './components/Navbar.vue';
import MainNavbar from './components/MainNavbar.vue';
import NavbarCatalog from './components/NavbarCatalog.vue';
import FuterCom from './components/FuterCom.vue';

export default defineComponent({
  name: 'App',
  components: 
  {
    NavbarView,
    MainNavbar,
    NavbarCatalog,
    FuterCom,
},
data() {
    return {
      isDesktop: true, // Изначально считаем, что это десктопная версия
    };
  },
  methods: {
    checkScreenWidth() {
      // Проверяем ширину экрана и обновляем значение переменной isDesktop
      this.isDesktop = window.innerWidth > 768; // Пример: считаем экран десктопным, если ширина больше 768px
    },
  },
  mounted() {
    // Вызываем метод для проверки ширины экрана при загрузке компонента
    this.checkScreenWidth();
    // Слушаем изменения размера экрана для обновления значения переменной isDesktop
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeUnmount() {
    // Отписываемся от события при уничтожении компонента
    window.removeEventListener('resize', this.checkScreenWidth);
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 100%; /* Новая строка: максимальная ширина контейнера */
  overflow: hidden;
}

/* Стили для десктопной версии */
#app .navbar-catalog {
  display: block;
}

/* Стили для мобильной версии */
@media (max-width: 768px) {
  #app .navbar-catalog {
    display: none;
  }
}
</style>

