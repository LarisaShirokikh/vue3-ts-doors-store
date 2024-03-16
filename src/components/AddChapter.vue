<template>
  <div class="container">
    <div>
      <h2 class="heading">Добавить раздел</h2>
      <form @submit.prevent="sendChapterData" class="form">
        <label for="chapterName" class="label">Название раздела:</label>
        <input
          v-model="chapterName"
          type="text"
          id="chapterName"
          class="input"
          required
        />

        <label for="description" class="label">Описание:</label>
        <textarea
          v-model="description"
          rows="4"
          id="description"
          class="input"
          required
        ></textarea>

        <label for="photoLink" class="label">Ссылка на фото:</label>
        <input
          v-model="photoLink"
          type="text"
          id="photoLink"
          class="input"
          @input="loadPhotoFromLink"
        />

        <label for="chapterPhoto" class="label">Загрузить фото:</label>
        <input
          type="file"
          id="chapterPhoto"
          @change="handleChapterPhotoChange"
          accept="image/*, .png, .jpg, gif, .web,"
          class="input"
        />
        <img
          v-if="chapterPhotoPreview"
          :src="chapterPhotoPreview"
          alt="Предворительный просмотр фото каталога"
          class="chapter-preview"
          style="width: 250px; 
          height: 300px; 
          margin: 10px; 
          border-radius: 15px"
        />

        <button type="submit" 
        style="background-color: #F56C6C; border-color: #F56C6C"
        class="button">Добавить раздел</button>
      </form>
    </div>

    <chapter-list></chapter-list>
  </div>
</template>

<script lang="ts" setup>
import {  ref } from "vue";
import { toast } from "vue3-toastify";
import ChapterList from '../components/Chapters/ChapterList.vue'
import { sendChapterToServer } from "@/server/chapter";
//import { Check, Delete, Edit, Close } from "@element-plus/icons-vue";

const description = ref("");
const chapterName = ref("");
const chapterPhoto = ref<File | null>(null);
const chapterPhotoPreview = ref<string | null>(null);
const photoLink = ref("");

const loadPhotoFromLink = () => {
  if (photoLink.value.trim() !== "") {
    chapterPhotoPreview.value = photoLink.value.trim();
  } else {
    chapterPhotoPreview.value = null;
  }
};

const handleChapterPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    chapterPhoto.value = file;
    chapterPhotoPreview.value = URL.createObjectURL(file);
  }
};


const sendChapterData = async () => {
  try {
    if (
      !chapterName.value ||
      (!chapterPhoto.value && !photoLink.value.trim())
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", chapterName.value);
    if (chapterPhoto.value) {
      formData.append("photo", chapterPhoto.value, chapterPhoto.value.name);
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }
    formData.append("description", description.value);

    const response = await sendChapterToServer(formData);

    console.log("Server Response:", response);

    if (response && response.name) {
      toast.success("Успешное добавление каталога", { theme: "colored" });
      chapterName.value = "";
      chapterPhoto.value = null;
      chapterPhotoPreview.value = null;
      photoLink.value = "";
      description.value = "";
    } else {
      toast.error("Ошибка при добавлении каталога", { theme: "colored" });
      console.error("Дополнительная информация об ошибке:", response);
    }
  } catch (error) {
    console.error("Ошибка при отправке каталога:", error);
  }
};

</script>
