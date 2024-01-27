<template>
  <div class="container">
    <div>
      <h2 class="heading">Добавить каталог</h2>
      <form @submit.prevent="sendCatalogData" class="form">
        <label for="catalogName" class="label">Название каталога:</label>
        <input
          v-model="catalogName"
          type="text"
          id="catalogName"
          class="input"
          required
        />

        <label for="price" class="label">Стоимость от:</label>
        <input v-model="price" type="number" id="price" class="input" />

        <label for="description" class="label">Описание:</label>
        <input
          v-model="description"
          type="text"
          id="description"
          class="input"
          required
        />

        <div class="checkbox-container">
          <input
            v-model="atHome"
            type="checkbox"
            id="atHome"
            class="checkbox"
          />
          <label for="atHome" class="checkbox-label">Для квартиры:</label>
        </div>

        <div class="checkbox-container">
          <input
            v-model="forOne"
            type="checkbox"
            id="forOne"
            class="checkbox"
          />
          <label for="forOne" class="checkbox-label">Для компонента 1:</label>
        </div>

        <div class="checkbox-container">
          <input
            v-model="popular"
            type="checkbox"
            id="popular"
            class="checkbox"
          />
          <label for="popular" class="checkbox-label">Популярный:</label>
        </div>

        <label for="photoLink" class="label">Ссылка на фото:</label>
        <input v-model="photoLink" type="text" id="photoLink" class="input" />

        <label for="catalogPhoto" class="label">Загрузить фото:</label>
        <input
          type="file"
          id="catalogPhoto"
          @change="handleCatalogPhotoChange"
          accept="image/*, .png, .jpg, gif, .web,"
          class="input"
        />
        <img
          v-if="catalogPhotoPreview"
          :src="catalogPhotoPreview"
          alt="Предворительный просмотр фото каталога"
          class="catalog-preview"
        />

        <button type="submit" class="button">Добавить каталог</button>
      </form>
    </div>

    <div>
    <h2 class="heading">Список каталогов</h2>

    <el-table :data="catalogs" :key="index" style="width: 100%" >
      <el-table-column prop="id" label="id" width="50"/>
      <el-table-column label="Фото" width="100">
        <template v-slot="scope">
          <img
            :src="photoUrl(scope.row.photo[0])"
            :alt="scope.row.name"
            style="max-width: 80px; max-height: 80px;"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Название" />
      <el-table-column label="Действия" width="50">
        <template v-slot="scope">
          <el-button
            v-if="!isEditing(scope.row.id)"
            @click="startEditing(scope.row.id)"
            icon="el-icon-edit"
            circle
            size="small"
            type="primary"
          ></el-button>
          <el-button
            v-if="isEditing(scope.row.id)"
            @click="saveChanges(scope.row.id)"
            icon="el-icon-check"
            circle
            size="small"
            type="success"
          ></el-button>
          <el-button
            v-if="isEditing(scope.row.id)"
            @click="cancelEditing(scope.row.id)"
            icon="el-icon-close"
            circle
            size="small"
            type="danger"
          ></el-button>
          <el-button
            @click="deleteCatalog(scope.row.id)"
            icon="el-icon-delete"
            circle
            size="small"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  deleteCatalogRequest,
  getCatalogs,
  sendCatalogToServer,
  updateCatalog,
} from "../server/catalog";
import { toast } from "vue3-toastify";

const popular = ref(false);
const atHome = ref(false);
const forOne = ref(false);
const price = ref("" || null);
const description = ref("");
const catalogName = ref("");
const catalogPhoto = ref<File | null>(null);
const catalogPhotoPreview = ref<string | null>(null);
const catalogs = ref<Array<any>>([]);
const editedCatalogId = ref<number | null>(null);
const editedCatalogName = ref<string>("");
const editedCatalogPhoto = ref<File | null>(null);
const photoLink = ref("");

const isEditing = (catalogId: number) => catalogId === editedCatalogId.value;

const startEditing = (catalogId: number) => {
  editedCatalogId.value = catalogId;
  editedCatalogName.value =
    catalogs.value.find((catalog) => catalog.id === catalogId)?.name || "";
};

// const isString = (value: any): value is string => typeof value === "string";

// // Функция для формирования URL фото из файла
// const getPhotoUrl = (photo: any): string => {
//   if (photo instanceof File) {
//     return URL.createObjectURL(photo);
//   } else {
//     console.error("Ошибка: Невозможно определить тип фото");
//     return ""; // или другой URL по умолчанию
//   }
// };

const cancelEditing = () => {
  editedCatalogId.value = null;
  editedCatalogName.value = "";
  editedCatalogPhoto.value = null;
};

const saveChanges = async (catalogId: number) => {
  console.log("catalogId", catalogId);
  try {
    const formData = new FormData();
    formData.append("name", editedCatalogName.value);
    formData.append("forOne", forOne.value ? "true" : "false");
    formData.append("popular", popular.value ? "true" : "false");
    formData.append("atHome", atHome.value ? "true" : "false");
    if (editedCatalogPhoto.value) {
      formData.append(
        "photo",
        editedCatalogPhoto.value,
        editedCatalogPhoto.value.name
      );
    }

    const response = await updateCatalog(formData, catalogId);
    if (response) {
      toast.success("Успешное обновление каталога", { theme: "colored" });
      editedCatalogId.value = null;
      editedCatalogName.value = "";
    } else {
      toast.error("Ошибка при обновлении каталога", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении каталога:", error);
  }
};

const deleteCatalog = async (catalogId: number) => {
  try {
    const response = await deleteCatalogRequest(catalogId);
    if (response === 200) {
      toast.success("Успешное удаление каталога", { theme: "colored" });
    } else {
      toast.error("Ошибка при удалении каталога", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при удалении каталога:", error);
  }
};

const handleCatalogPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    catalogPhoto.value = file;
    catalogPhotoPreview.value = URL.createObjectURL(file);
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   catalogPhotoPreview.value = e.target?.result as string;
    // };
    // reader.readAsDataURL(file);
  }
};

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const sendCatalogData = async () => {
  try {
    if (!catalogName.value || (!catalogPhoto.value && !photoLink.value)) {
      return;
    }

    const formData = new FormData();
    formData.append("name", catalogName.value);
    if (catalogPhoto.value) {
      formData.append("photo", catalogPhoto.value, catalogPhoto.value.name);
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value);
    }
    formData.append("description", description.value);
    if (
      price.value !== "" &&
      price.value !== null &&
      price.value !== undefined
    ) {
      formData.append("price", price.value);
    }
    formData.append("atHome", atHome.value ? "true" : "false");
    formData.append("popular", popular.value ? "true" : "false");

    const response = await sendCatalogToServer(formData);

    console.log("Server Response:", response);

    if (response && response.name) {
      toast.success("Успешное добавление каталога", { theme: "colored" });
      catalogName.value = "";
      catalogPhoto.value = null;
      catalogPhotoPreview.value = null;
      photoLink.value = "";
    } else {
      toast.error("Ошибка при добавлении каталога", { theme: "colored" });
      console.error("Дополнительная информация об ошибке:", response);
    }
  } catch (error) {
    console.error("Ошибка при отправке каталога:", error);
  }
};

// const handleEditedCatalogPhotoChange = (event: Event) => {
//   const fileInput = event.target as HTMLInputElement;
//   const file = fileInput.files?.[0];

//   if (file) {
//     editedCatalogPhoto.value = file;
//   }
// };

onMounted(async () => {
  try {
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
}
.catalog-preview {
  width: auto;
  height: auto;
}
/* .container {
  padding: 0px 30px 0px;
} */



.catalog-info {
  display: flex;
  padding: 10px;
  color: #4a5568;
}

.edit-input {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.price {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.catalog-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.edit-button,
.save-button,
.cancel-button,
.delete-button {
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
}

.edit-button i,
.delete-button i {
  font-size: 20px;
}

.heading {
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 1rem;
}

.form {
  max-width: 500px;
  /* изменено значение */
  margin: auto;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.375rem;
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
  margin-bottom: 1rem;
  /* добавлено значение */
}

.button {
  background-color: #f59e0b;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.button:hover {
  background-color: #e67e22;
}

.image {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  outline: none;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ffcc00;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
}

.checkbox:checked {
  background-color: #ffcc00;
}

.checkbox-label {
  font-size: 1rem;
}
</style>
