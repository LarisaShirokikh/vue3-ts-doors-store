<template>
  <div class="navbar">
    <button @click="toggleMenu" class="menu-button">
      <i :class="isOpenMenu ? 'fas fa-times fa-lg' : 'fas fa-bars fa-lg'"></i>
    </button>
    <div v-if="isOpenMenu" class="menu">
      <input type="text" placeholder="Поиск" class="search-input" />
      <div class="menu-items">
        <a href="#">
          <i class="far fa-list-alt fa-lg"></i>
          <span>Каталог</span>
        </a>
        <a href="#">
          <i class="far fa-comments fa-lg"></i>
          <span>Отзывы</span>
        </a>
        <a href="#">
          <i class="far fa-building fa-lg"></i>
          <span>О компании</span>
        </a>
        <a href="#">
  <i class="fas fa-wrench fa-lg"></i>
  <span>Наши установки</span>
</a>
<a href="#">
  <i class="fas fa-puzzle-piece fa-lg"></i>
  <span>Доборы</span>
</a>
<a href="#">
  <i class="fas fa-gift fa-lg"></i>
  <span>Акции</span>
</a>
<a href="#">
  <i class="fas fa-hands-helping fa-lg"></i>
  <span>Поддержка</span>
</a>
<a href="#">
  <i class="fas fa-shopping-cart fa-lg"></i>
  <span>Как купить</span>
</a>
        <a href="#">
          <i class="far fa-newspaper fa-lg"></i>
          <span>Блог</span>
        </a>
      </div>
    </div>
    <a href="tel:+79260217365" class="phone-icon">
      <i class="fas fa-phone fa-lg"></i> +7 (926) 021-73-65
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default defineComponent({
  name: 'MainNavbar',
  data() {
    return {
      isOpenMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
});
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-items {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.menu a {
  color: #555555;
  text-decoration: none;
  padding: 12px 0;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.menu a:not(:last-child):after {
  content: '';
  border-bottom: 1px solid #e0e0e0;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.menu a i {
  margin-right: 10px;
}

.menu a span {
  flex-grow: 1;
  margin-left: 10px;
}

.menu a:hover {
  background-color: #e6e6e6;
  border-radius: 3px;
}

.search-input {
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.navbar {
  background-color: #ffcc00;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  min-height: 60px;
}

.menu-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #555555;
  cursor: pointer;
}

.phone-icon {
  color: #555555; /* Изменено на серый цвет */
  font-size: 1.4rem; /* Уменьшен размер шрифта номера телефона */
  max-width: 400px; /* Новая строка: максимальная ширина блока номера телефона */
}

.phone-icon:hover {
  background-color: #e6b800;
  border-radius: 3px;
}
</style>
