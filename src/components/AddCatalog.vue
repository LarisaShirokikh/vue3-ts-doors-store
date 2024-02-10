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
        <textarea
          v-model="description"
          rows="4"
          id="description"
          class="input"
          required
        ></textarea>

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

        <label for="selectedChapter" class="label">Выберите категорию:</label>
        <select
          v-model="selectedChapter"
          id="selectedChapter"
          class="select-box"
          required
        >
          <option
            v-for="chapter in chapters"
            :key="chapter.id"
            :value="chapter.id"
          >
            {{ chapter.name }}
          </option>
        </select>

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

      <el-table :data="catalogs" :key="index" style="width: 100%">
        <el-table-column prop="id" label="id" width="50" />
        <el-table-column label="Фото" width="100">
          <template v-slot="scope">
            <img
              :src="photoUrl(scope.row.photo[0])"
              :alt="scope.row.name"
              style="max-width: 80px; max-height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Название" />
        <el-table-column label="Действия" width="100">
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
import { getChapters } from "@/server/chapter";

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
const selectedChapter = ref("");
const chapters = ref([]);

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
    formData.append("chapters", selectedChapter.value);
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
    formData.append("atHome", atHome.value);
    formData.append("popular", popular.value);
    formData.append("forOne", forOne.value);

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
const fetchChapters = async () => {
  try {
    // Fetch the list of catalogs from the server
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

onMounted(async () => {
  fetchChapters();
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

.form {
  max-width: 100%;
  margin: auto;
  background-color: #f8f9fa; /* Цвет фона */
  padding: 2rem;
  border-radius: 8px; /* Радиус скругления углов */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Тень */
  padding-left: 20px;
}

.label {
  display: block;
  color: #495057; /* Цвет текста */
  font-size: 1rem; /* Размер шрифта */
  margin-bottom: 0.5rem;
}

.input,
.select-box {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da; /* Цвет границы */
  border-radius: 4px; /* Радиус скругления */
  outline: none;
  margin-bottom: 1rem;
}

.select-box {
  position: relative;
}

.select-box::after {
  content: "\25BC";
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.button {
  background-color: #ffad42; /* Цвет фона кнопки */
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Анимация при наведении */
}

.button:hover {
  background-color: #0056b3; /* Цвет фона при наведении */
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
  border: 2px solid #6c757d; /* Цвет рамки */
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}

.checkbox:checked {
  background-color: #007bff; /* Цвет фона при активации */
}

.checkbox:checked::after {
  content: "\2714"; /* Галочка */
  font-size: 14px;
  color: #fff; /* Цвет галочки */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  font-size: 1rem;
  color: #495057; /* Цвет текста */
}
</style>
