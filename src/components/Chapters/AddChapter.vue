<template>
  <div class="container">
    <div>
      <span>Добавить раздел</span>
      <a-form
        :model="formState"
      >
        <a-form-item>
          <label for="name" class="label">Название раздела:</label>
          <a-input v-model:value="formState.name" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="description" class="label">Описание:</label>
          <a-textarea
            v-model:value="formState.description"
            :autoSize="{ minRows: 2 }"
            allow-clear
            required
          ></a-textarea>
        </a-form-item>

        <a-form-item>
          <label for="photoLink" class="label">Ссылка на фото:</label>
          <a-input
            v-model:value="formState.photoLink"
            @input="addPhotoLink"
            allow-clear
          />
        </a-form-item>

        <a-form-item>
          <label for="photo" class="label">Загрузить фото:
          <a-input
            ref="fileInput"
            type="file"
            id="photo"
            @change="handleChange"
            accept="image/*"
            />
          </label>
        </a-form-item>


        <img
          v-if="photoPreview"
          :src="photoPreview"
          alt="Предворительный просмотр фото каталога"
          class="chapter-preview"
          style="max-width: 150px; max-height: 200px; margin: 5px; border-radius: 5px"
        />

        <a-form-item>
          <a-button danger @click="sendChapterData" class="button">
            Добавить раздел
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
  <chapter-list :chapter-added-count="chapterAddedCount"></chapter-list>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useForm, FormStateChapters } from "@/utils/formHelpers";
import { toast } from "vue3-toastify";
import ChapterList from "@/components/Chapters/ChapterList.vue";
// import { UploadOutlined } from "@ant-design/icons-vue";
import ChapterService from "@/server/chapter";
const chapterService = new ChapterService();
const chapterAddedCount = ref(0);

const {
  photo,
  photoPreview,
  handleChange,
  addPhotoLink,
  resetFormChapters,
  //loadPhotoPreviews
} = useForm();

const formState: FormStateChapters = reactive({
  name: "",
  description: "",
  photoLink: "",
  photo: null,
});



const sendChapterData = async () => {
  console.log("Sending chapter data 1", formState);
  try {
    if (!formState.name || !formState.name || (photo.value && photo.value.length === 0)) {
      console.log("Необходимо указать имя и загрузить файл");
      toast.error("Необходимо заполнить все поля", { theme: "colored" });
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

    const response = await chapterService.sendChapterToServer(formData);

    if (response && response.name) {
      chapterAddedCount.value++;
      toast.success("Успешное добавление раздела", { theme: "colored" });
      resetFormChapters(formState);
    } else {
      toast.error("Ошибка при добавлении раздела", { theme: "colored" });
      console.error("Дополнительная информация об ошибке:", response);
    }
  } catch (error) {
    console.error("Ошибка при отправке каталога:", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
}

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

</style>