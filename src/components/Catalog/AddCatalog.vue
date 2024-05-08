<template>
  <div class="container">
    <div>
      <el-text class="heading">Добавить каталог</el-text>
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item>
          <label for="catalogName" class="label">Название каталога:</label>
          <a-input v-model:value="formState.catalogName" required allow-clear />
        </a-form-item>

        <a-form-item>
          <label for="price" class="label">Стоимость от:</label>
          <a-input
            v-model:value="formState.price"
            :rules="[{ validator: checkPrice }]"
            allow-clear
          />
        </a-form-item>

        <label for="description" class="label">Описание:</label>
        <a-textarea
          v-model:value="formState.description"
          required
          :autosize="{ minRows: 2 }"
          allow-clear
        />

        <a-label class="label">Выберите раздел:</a-label>
        <a-select
          v-model:value="formState.selectedChapter"
          show-search
          placeholder="Выбрать раздел..."
          mode="tags"
          style="width: 100%"
          allow-clear
          :rules="[
            { required: true, message: 'Выберите хотя бы один раздел!' },
          ]"
        >
          <a-select-option
            v-for="chapter in chapters"
            :key="chapter.id"
            :value="chapter.name"
            :label="chapter.id"
          />
        </a-select>

        <label for="photoLink" class="label">Ссылка на фото:</label>
        <a-input
          v-model:value="formState.photoLink"
          @input="loadPhotoFromLink"
          allow-clear
        />

        <label for="catalogPhoto" class="label">Загрузить фото:</label>
        <a-upload
          v-model:file-list="fileList"
          list-type="picture"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
          class="input"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Загрузить...
          </a-button>
        </a-upload>
        <img
          v-if="catalogPhotoPreview"
          :src="catalogPhotoPreview"
          alt="Предворительный просмотр фото каталога"
          class="catalog-preview"
          style="width: auto; height: 300px; margin: 10px; border-radius: 15px"
        />

        <a-button danger @click="sendCatalogData" class="button"
          >Добавить каталог</a-button
        >
      </a-form>
    </div>
    <catalog-list :catalog-added-count="catalogAddedCount"></catalog-list>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { checkCatalogName, sendCatalogToServer } from "@/server/catalog";
import { toast } from "vue3-toastify";
import CatalogList from "@/components/Catalog/CatalogList.vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import ChapterService from "@/server/chapter";
const chapterService = new ChapterService();
const catalogAddedCount = ref(0);
const catalogPhoto = ref<File | null>(null);
const catalogPhotoPreview = ref<string | null>(null);
const chapters = ref([]);
const fileList = ref([]);
const headers = {
  authorization: "authorization-text",
};

interface FormState {
  catalogName: string;
  price: number;
  description: string;
  photoLink: string;
  selectedChapter: string[];
}

const formState: FormState = reactive({
  catalogName: "",
  price: 0,
  description: "",
  photoLink: "",
  selectedChapter: [],
});

let debouncedCheckCatalogName: ReturnType<typeof setTimeout> | null = null;

watch(
  () => formState.catalogName,
  (newCatalogName) => {
    if (debouncedCheckCatalogName) {
      clearTimeout(debouncedCheckCatalogName);
    }
    debouncedCheckCatalogName = setTimeout(async () => {
      try {
        const isCatalogExist = await checkCatalogName(newCatalogName);
        if (isCatalogExist) {
          toast.error("Такой каталог уже существует", { theme: "colored" });
        }
      } catch (error) {
        console.error("Ошибка при проверке имени каталога:", error);
      }
    }, 1500); // Adjust the delay as needed
  }
);

const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Цена должна быть больше 0!"));
};

const loadPhotoFromLink = () => {
  if (formState.photoLink.trim() !== "") {
    catalogPhotoPreview.value = formState.photoLink.trim();
  } else {
    catalogPhotoPreview.value = null;
  }
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const sendCatalogData = async () => {
  try {
    if (
      !formState.catalogName ||
      (!catalogPhoto.value && !formState.photoLink.trim())
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.catalogName);
    if (catalogPhoto.value) {
      formData.append("photo", catalogPhoto.value, catalogPhoto.value.name);
    } else if (formState.photoLink) {
      formData.append("photo", formState.photoLink.trim());
    }
    formData.append("description", formState.description);
    if (formState.price) {
      formData.append("price", formState.price.toString());
    }
    formData.append("chapterName", formState.selectedChapter.join(", "));

    const response = await sendCatalogToServer(formData);

    if (response && response.name) {
      catalogAddedCount.value++;
      toast.success("Успешное добавление каталога", { theme: "colored" });
      formState.catalogName = "";
      catalogPhoto.value = null;
      catalogPhotoPreview.value = null;
      formState.photoLink = "";
      formState.description = "";
      formState.price = 0;
      formState.selectedChapter = [];
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
    chapters.value = await chapterService.getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

onMounted(async () => {
  await fetchChapters();
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
  font-size: 0, 5rem; /* Размер шрифта */
  margin: 0.5rem;
}

.button {
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1rem; /* Анимация при наведении */
}

.heading {
  color: #f56c6c;
}
</style>
