
<template>
  <a-space direction="vertical" 
  style="width: 98%;"
  class="search-input"
  >
    <a-input
      type="text"
      v-model="searchQuery"
      placeholder="Найти дверь..."
      @search="handleSearch"
      status="error"
    />
    <template #enterButton>
        <a-button type="error">Custom</a-button>
      </template>
  </a-space>
</template>

<script lang="ts" setup>
// const input = ref("");

import { ref } from 'vue';

const searchQuery = ref<string>('');

const handleSearch = () => {
  // Здесь можете реализовать логику поиска
  console.log('Выполняется поиск: ', searchQuery.value);
  // Например, вызов функции для выполнения поиска на основе searchQuery.value
};
</script>


<style scoped>


.search-input {
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  border-radius: 15px;
  border:none;
  outline: none !important;
  width: 90%;
}
</style>

