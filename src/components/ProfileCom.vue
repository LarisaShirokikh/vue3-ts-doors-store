<template>
    <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="heading">Добавить каталог</h2>
        <form @submit.prevent="sendCatalogData" class="form">
        <label for="catalogName" class="label">Название каталога:</label>
        <input v-model="catalogName" type="text" id="catalogName" class="input" required />

        <label for="catalogPhoto" class="label">Загрузить фото:</label>
        <input 
        type="file" 
        id="catalogPhoto" 
        @change="handleCatalogPhotoChange" 
        accept="image/*, .png, .jpg, gif, .web," 
        class="input" 
        />
        <img v-if="catalogPhotoPreview" :src="catalogPhotoPreview" alt="Catalog Preview" class="mt-2 w-20 h-20" />

        <button type="submit" class="button">Добавить каталог</button>
      </form>
      </div>
    </div>

    <div class="mobile-list">
    <h2 class="heading">Список каталогов</h2>
    <div class="catalog-container">
      <div v-for="catalog in catalogs" :key="catalog.id" class="catalog-item">
        <div class="catalog-image">
          <img :src="photoUrl(catalog.photo[0])" :alt="catalog.name" class="w-10 h-10" />
        </div>
        <div class="catalog-info">
          <span class="catalog-name">{{ catalog.name }}</span>
          
            <button @click="editCatalog(catalog)" class="edit-button">
              <i class="fas fa-edit" style="color: orange;"></i>
            </button>
            <button @click="deleteCatalog(catalog.id)" class="delete-button">
              <i class="fas fa-trash-alt" style="color: red;"></i>
            </button>
          
        </div>
      </div>
    </div>
  </div>

    </div>
  

  </template>

      <!-- <div>
    <h2 class="text-xl text-gray-700 mb-2 mt-8">Добавить продукт</h2>
    <form @submit.prevent="addProduct" class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <label for="productName" class="block text-gray-700 text-xs mb-2">Название продукта:</label>
      <input v-model="productName" type="text" id="productName" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none " required />

      <label for="productPrice" class="block text-gray-700 text-xs mb-2">Цена продукта:</label>
      <input v-model="productPrice" type="number" id="productPrice" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" required />

      <label for="availability" class="block text-gray-700 text-xs mb-2">В наличии:</label>
      <input v-model="availability" type="text" id="availability" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="construction" class="block text-gray-700 text-xs mb-2">Конструкция:</label>
      <input v-model="construction" type="text" id="construction" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="sealingContours" class="block text-gray-700 text-xs mb-2">Контуры уплотнения:</label>
      <input v-model="sealingContours" type="text" id="sealingContours" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="thicknessWeight" class="block text-gray-700 text-xs mb-2">Толщина:</label>
      <input v-model="thicknessWeight" type="text" id="thicknessWeight" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="weight" class="block text-gray-700 text-xs mb-2">Вес:</label>
      <input v-model="weight" type="text" id="weight" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="insulation" class="block text-gray-700 text-xs mb-2">Утепление:</label>
      <input v-model="insulation" type="text" id="insulation" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="mainLock" class="block text-gray-700 text-xs mb-2">Основной замок:</label>
      <input v-model="mainLock" type="text" id="mainLock" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="additionalLock" class="block text-gray-700 text-xs mb-2">Дополнительный замок:</label>
      <input v-model="additionalLock" type="text" id="additionalLock" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="exteriorFinish" class="block text-gray-700 text-xs mb-2">Отделка снаружи:</label>
      <input v-model="exteriorFinish" type="text" id="exteriorFinish" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="interiorFinish" class="block text-gray-700 text-xs mb-2">Отделка внутри:</label>
      <input v-model="interiorFinish" type="text" id="interiorFinish" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="hinges" class="block text-gray-700 text-xs mb-2">Петли:</label>
      <input v-model="hinges" type="text" id="hinges" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="doorProtection" class="block text-gray-700 text-xs mb-2">Защита от снятия полотна:</label>
      <input v-model="doorProtection" type="text" id="doorProtection" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />

      <label for="description" class="block text-gray-700 text-xs mb-2">Описание:</label>
      <input v-model="description" type="text" id="description" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" />
      

      <label for="productPhoto" class="block text-gray-700 text-xs mb-2">Загрузить фото:</label>
      <input type="file" id="productPhoto" @change="handleProductPhotoChange" accept="image/*" 
      class="w-full p-2 border rounded mb-2 text-xs focus:outline-none" />
      <img v-if="productPhotoPreview" :src="productPhotoPreview" alt="Product Preview" class="mt-2 w-10 h-10" />

      <label for="selectedCatalog" class="block text-gray-700 text-xs mb-2">Выберите каталог:</label>
      <select v-model="selectedCatalog" id="selectedCatalog" class="w-full p-2 border rounded mb-2 text-sm focus:outline-none" required>
        <option v-for="catalog in catalogs" :key="catalog.id" :value="catalog.id">{{ catalog.name }}</option>
      </select>

      <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded mt-4">Добавить продукт</button>
    </form>
  </div> -->
    


  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { getCatalogs, sendCatalogToServer } from '../server/catalog';
  import { toast } from 'vue3-toastify';
  
  export default defineComponent({
  setup() {
    const catalogName = ref('');
  const catalogPhoto = ref<File | null>(null);
  const catalogPhotoPreview = ref<string | null>(null);
    const catalogs = ref<Array<any>>([]);

    const handleCatalogPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    catalogPhoto.value = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      catalogPhotoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const photoUrl = (path: string) => {
    if (path.startsWith('/uploads/')) {
      return `http://localhost:3000${path}`;
    }
    return path;
  }



const sendCatalogData = async () => {
    try {
        if (!catalogName.value || !catalogPhoto.value) {
            return;
        }
        const name = catalogName.value;
        const photo = catalogPhoto.value; 

        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo', photo, photo.name);

        const response = await sendCatalogToServer(formData);

        console.log('Server Response:', response);
    if (response) {
        toast.success('Успешное добавление каталога', { theme: 'colored' });
        catalogName.value = '';
            catalogPhoto.value = null;
            catalogPhotoPreview.value = null;
    } else {
        toast.error('Ошибка при добавлении каталога', { theme: 'colored' });
    }
    } catch (error) {
        console.error('Ошибка при отправке каталога:', error);
    }
};
    const editCatalog = () => {
      // Реализуйте логику редактирования каталога
    };

    const deleteCatalog = async (catalogId: number) => {
      // Реализуйте логику удаления каталога
      try {
        // Вызывайте API для удаления каталога
        // await api.removeCatalog(catalogId);
        
        // Удалите каталог из состояния
        catalogs.value = catalogs.value.filter((catalog) => catalog.id !== catalogId);
      } catch (error) {
        console.error('Ошибка при удалении каталога:', error);
      }
    };

    onMounted(async () => {
        try {
          catalogs.value = await getCatalogs();
        } catch (error) {
          console.error('Ошибка при получении списка каталогов:', error);
        }
    })

    return {
        catalogName,
      catalogPhoto,
      catalogPhotoPreview,
      catalogs,
      handleCatalogPhotoChange,
      sendCatalogData,
      editCatalog,
      deleteCatalog,
      photoUrl
    };
  },
});
  </script>
  

<style>
.catalog-container {
}

.catalog-item {
    display: flex;/* Ширина элемента в 1/3 ширины контейнера, с учетом отступа */
  margin-bottom: 16px; /* Расстояние между элементами */
}

.catalog-image img {
  width: 60px;
  height: auto;
  display: block;
}

.catalog-info {
  padding: 8px;
  color: #4a5568;
}

.catalog-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.catalog-buttons {
}

.edit-button,
.delete-button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}




.heading {
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.form {
  max-width: 500rem;
  margin: auto;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.label {
  display: block;
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  outline: none;
}

.button {
  background-color: #f59e0b;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  margin-top: 1rem;
  cursor: pointer;
}
.button:hover {
    background-color: #e67e22; /* измените цвет при наведении, если нужно */
  }

.image {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  outline: none;
}
</style>