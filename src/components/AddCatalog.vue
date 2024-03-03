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

        <label class="label">Выберите раздел:</label>
        <el-select
          v-model="selectedChapter"
          collapse-tags
          placeholder="Выбрать..."
          style="width: 100%; border-color: none"
          multiple
        >
        <template #header>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="indeterminate"
        @change="handleCheckAll"
      >
        Все
      </el-checkbox>
    </template>
          <el-option
            v-for="chapter in chapters"
            :key="chapter.id"
            :value="chapter.id"
            :label="chapter.name"
          />
        </el-select>

        <label for="photoLink" class="label">Ссылка на фото:</label>
        <input
          v-model="photoLink"
          type="text"
          id="photoLink"
          class="input"
          @input="loadPhotoFromLink"
        />

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
          style="width: 250px; height: 300px; margin: 10px; border-radius: 15px"
        />

        <button type="submit" class="button">Добавить каталог</button>
      </form>
    </div>
    <catalog-list></catalog-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { sendCatalogToServer } from "../server/catalog";
import { toast } from "vue3-toastify";
import { getChapters } from "@/server/chapter";
import CatalogList from "@/components/CatalogList.vue";
import type { CheckboxValueType } from 'element-plus'

const price = ref("" || null);
const description = ref("");
const catalogName = ref("");
const catalogPhoto = ref<File | null>(null);
const catalogPhotoPreview = ref<string | null>(null);
const photoLink = ref("");
const selectedChapter = ref([]);
const chapters = ref([]);
const value = ref<CheckboxValueType[]>([])


const checkAll = ref(false)
const indeterminate = ref(false)

watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === chapters.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})


const loadPhotoFromLink = () => {
  if (photoLink.value.trim() !== "") {
    catalogPhotoPreview.value = photoLink.value.trim();
  } else {
    catalogPhotoPreview.value = null;
  }
};

const handleCatalogPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    catalogPhoto.value = file;
    catalogPhotoPreview.value = URL.createObjectURL(file);
  }
};

const sendCatalogData = async () => {
  try {
    if (
      !catalogName.value ||
      (!catalogPhoto.value && !photoLink.value.trim())
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", catalogName.value);
    if (catalogPhoto.value) {
      formData.append("photo", catalogPhoto.value, catalogPhoto.value.name);
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }
    formData.append("description", description.value);
    if (
      price.value !== "" &&
      price.value !== null &&
      price.value !== undefined
    ) {
      formData.append("price", price.value);
    }
    formData.append("chapterId", selectedChapter.value.join(","));

    const response = await sendCatalogToServer(formData);

    console.log("Server Response:", response);

    if (response && response.name) {
      toast.success("Успешное добавление каталога", { theme: "colored" });
      catalogName.value = "";
      catalogPhoto.value = null;
      catalogPhotoPreview.value = null;
      photoLink.value = "";
      description.value = "";
      photoLink.value = "";
    } else {
      toast.error("Ошибка при добавлении каталога", { theme: "colored" });
      console.error("Дополнительная информация об ошибке:", response);
    }
  } catch (error) {
    console.error("Ошибка при отправке каталога:", error);
  }
};

const fetchChapters = async () => {
  try {
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

onMounted(async () => {
  fetchChapters();
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
  background-color: #b65e58; /* Цвет фона при наведении */
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #6c757d;
  border-radius: 3px;
  margin-right: 6px;
  cursor: pointer;
}

.checkbox:checked {
  background-color: #323e4a;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #495057;
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
</style>
