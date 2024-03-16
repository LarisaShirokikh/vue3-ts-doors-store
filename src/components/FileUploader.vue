<template>
  <div class="mt-4">
    <!-- Используем ярлык для загрузки файла -->
    <label for="fileInput" class="cursor-pointer flex items-center">
      
      <span>Выберите файл CSV</span>
    </label>
    <!-- Вход для выбора файла -->
    <input
      ref="fileInput"
      type="file"
      id="fileInput"
      accept=".csv"
      @change="handleFileChange"
      class="hidden"
    />

    <!-- Зона для перетаскивания -->
    <div
      class="border-dashed border-2 border-gray-300 rounded-lg p-8 mt-4"
      @dragenter.prevent="isDragStarted = true"
      @dragleave.prevent="isDragStarted = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      :class="{ 'bg-gray-100': isDragStarted }"
    >
      <p class="text-gray-500">Перетащите файл сюда</p>
    </div>

    <!-- Отображение результатов разбора -->
    <div v-if="parsedData.length" class="mt-4">
      <h2 class="text-xl font-semibold mb-2">Результаты:</h2>
      <pre class="bg-gray-100 p-4 rounded">{{ parsedData }}</pre>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import Papa from 'papaparse';
//import uploadCsvData from '../server/createFromCsv';
import { Ref, ref } from 'vue';

// Объявление реактивной переменной для хранения разобранных данных CSV
const parsedData: Ref<any[]> = ref([]);

// Флаг для отслеживания начала перетаскивания
const isDragStarted = ref(false);

// Обработчик изменения файла
const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    Papa.parse(file, {
      complete: handleCsvParsed,
      header: true,
    });
  }
};

// Обработчик разобранных данных CSV
const handleCsvParsed = (result: Papa.ParseResult) => {
  parsedData.value = result.data;
};

// Обработчик перетаскивания файла
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragStarted.value = false;

  const file = event.dataTransfer?.files[0];
  if (file) {
    Papa.parse(file, {
      complete: handleCsvParsed,
      header: true,
    });
  }
};
</script>



  
  