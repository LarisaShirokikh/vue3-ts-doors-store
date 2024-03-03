
<template>
  <div class="search-container">
    <input class="search-input"
      type="text"
      v-model="searchQuery"
      placeholder="Найти дверь..."
      @input="handleSearch"
    />
    <!-- Здесь можете отобразить результаты поиска -->
  </div>
</template>

<script lang="ts" setup>
// const input = ref("");

import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = () => {
  // Здесь можете реализовать логику поиска
  console.log('Выполняется поиск: ', searchQuery.value);
  // Например, вызов функции для выполнения поиска на основе searchQuery.value
};
</script>


<style scoped>
.search-container {
  margin-bottom: 20px;
  width: 96%;
}

.search-input {
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-right: 10px;
  width: 100%;
  text-decoration: none;
}
</style>

