<template>
  <div class="search-container">
    <a-input
      v-model="searchQuery"
      placeholder="Найти дверь..."
      @search="handleSearch"
      class="search-input"
      suffix-icon="search"
    />
    <a-button danger class="search-button" @click="handleSearch">Поиск</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref<string>('');

const handleSearch = () => {
  console.log('Выполняется поиск: ', searchQuery.value);
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.search-button {
  width: 100px;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .search-button {
    width: 100%;
  }
}
</style>
