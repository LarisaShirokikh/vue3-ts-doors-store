<template>
  <nav class="navbar">
    <div class="brand">
        <i class="fas fa-map-marker-alt icon"></i>
        <span class="location">Ваш город: {{ location }}</span>
      </div>

    <div class="links">
      <a href="socialLinks.weibo" class="link">Хиты продаж</a>
      <a href="socialLinks.telegram" class="link">Скидки</a>
      <a href="socialLinks.whatsapp" class="link">Белые двери</a>
      <a href="socialLinks.weibo" class="link">С терморазрывом</a>
      <a href="https/com.com" class="link">Популярные</a>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavbarCatalog',
  props: {
    location: String,
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  color: #333;
}

.brand {
  display: flex;
  align-items: center;
}

.icon {
  color: #e67e22; /* Цвет для иконки маркера */
  font-size: 1.5rem;
  margin-right: 10px;
}

.logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.links {
  display: flex;
}

.link {
  text-decoration: none;
  color: #333;
  margin-right: 20px;
  font-size: 1.2rem;
}

.link:hover {
  border-bottom: 2px solid #fff;
}
</style>
