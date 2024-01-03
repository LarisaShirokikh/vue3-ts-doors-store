<template>
    <div class="mt-4">
      <label for="fileInput" class="cursor-pointer flex items-center space-x-2 text-blue-500">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span>Выберите файл CSV</span>
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        @change="handleFileChange"
        class="hidden"
      />
  
      <!-- Зона для перетаскивания -->
      <div
        class="mt-4 border-dashed border-2 border-gray-300 p-4 rounded"
        @dragenter.prevent="isDragStarted = true"
        @dragleave.prevent="isDragStarted = false"
        @dragover.prevent
        @drop.prevent="handleDrop"
        :class="{ 'bg-blue-100': isDragStarted }"
      >
        <p class="text-gray-500 text-sm">Перетащите файл сюда</p>
      </div>
  
      <!-- Отображение результатов разбора -->
      <!-- <div v-if="parsedData.length" class="mt-4">
        <h2 class="text-xl font-semibold mb-2">Результаты:</h2>
        <pre class="bg-gray-100 p-4 rounded">{{ parsedData }}</pre>
      </div> -->
    </div>
  </template>
  
  <script>
  import Papa from 'papaparse';
  import { defineComponent } from 'vue'; 
  import uploadCsvData from '../server/createFromCsv'

  export default defineComponent({
    data() {
      return {
        parsedData: [],
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
          Papa.parse(file, {
            complete: this.handleCsvParsed,
            header: true,
          });
        }
      },
      handleCsvParsed(result) {
        this.parsedData = result.data;
      },
      async handleFileUpload() {
        const formData = new FormData();
        formData.append('csvFile', this.$refs.fileInput.files[0]);
        formData.append('data', JSON.stringify(this.parsedData));

        try {
          await uploadCsvData(formData);
        } catch (error) {
          // Обработка ошибки
        }
      },
    },
  });
</script>


  
  