<template>
  <div class="container">
    <div>
      <a-text>Добавить каталог</a-text>
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item>
          <label for="catalogName" class="label">Название каталога:</label>
          <a-input v-model:value="formState.name" required allow-clear />
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

        <label for="photo" class="label">Загрузить фото:</label>
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
          v-if="photoPreview"
          :src="photoPreview"
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
import { useForm, FormStateCatalogs } from "@/utils/formHelpers";
import { checkCatalogName, sendCatalogToServer } from "@/server/catalog";
import { toast } from "vue3-toastify";
import CatalogList from "@/components/Catalog/CatalogList.vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import ChapterService from "@/server/chapter";
const chapterService = new ChapterService();
const catalogAddedCount = ref(0);
const chapters = ref([]);
const headers = {
  authorization: "authorization-text",
};

const {
  fileList,
  photo,
  photoPreview,
  handleChange,
  loadPhotoFromLink,
  resetFormCatalogs,
} = useForm();

const formState: FormStateCatalogs = reactive({
  name: "",
  price: 0,
  description: "",
  photoLink: "",
  selectedChapter: [],
});

let debouncedCheckCatalogName: ReturnType<typeof setTimeout> | null = null;

watch(
  () => formState.name,
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
    }, 1500);
  }
);

const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Цена должна быть больше 0!"));
};


const sendCatalogData = async () => {
  try {
    if (
      !formState.name ||
      (!photo.value && !formState.photoLink.trim())
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    if (photo.value) {
      formData.append("photo", photo.value, photo.value.name);
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
      resetFormCatalogs(formState);
      // formState.catalogName = "";
      // catalogPhoto.value = null;
      // catalogPhotoPreview.value = null;
      // formState.photoLink = "";
      // formState.description = "";
      // formState.price = 0;
      // formState.selectedChapter = [];
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
}

/* .form {
  max-width: 100%;
  margin: auto;
  background-color: #f8f9fa; 
  padding: 2rem;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  padding-left: 20px;
} */

.label {
  display: block;
  color: #495057;
  font-size: 0, 5rem;
  margin: 0.5rem;
}

.button {
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1rem;
}

/* .heading {
  color: #f56c6c;
} */
</style>
