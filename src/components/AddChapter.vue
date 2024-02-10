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
        <input v-model="photoLink" type="text" id="photoLink" class="input" />

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
        />

        <button type="submit" class="button">Добавить раздел</button>
      </form>
    </div>

    <div>
      <h2 class="heading">Список разделов</h2>

      <el-table :data="chapters" :key="index" style="width: 100%">
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
import { toast } from "vue3-toastify";
import {sendChapterToServer, getChapters }from '@/server/chapter'

const description = ref("");
const chapterName = ref("");
const chapterPhoto = ref<File | null>(null);
const chapterPhotoPreview = ref<string | null>(null);
const chapters = ref<Array<any>>([]);
const editedChapterId = ref<number | null>(null);
const editedChapterName = ref<string>("");
const editedChapterPhoto = ref<File | null>(null);
const photoLink = ref("");

const isEditing = (chapterId: number) => chapterId === editedChapterId.value;

// const handleEditedChapterPhotoChange = (event: Event) => {
//   const fileInput = event.target as HTMLInputElement;
//   const file = fileInput.files?.[0];

//   if (file) {
//     editedChapterPhoto.value = file;
//   }
// };



const startEditing = (chapterId: number) => {
  editedChapterId.value = chapterId;
  editedChapterName.value =
    chapters.value.find((chapter) => chapter.id === chapterId)?.name || "";
};

const cancelEditing = () => {
  editedChapterId.value = null;
  editedChapterName.value = "";
  editedChapterPhoto.value = null;
};

const saveChanges = async (chapterId: number) => {
  console.log("catalogId", chapterId);
  try {
    const formData = new FormData();
    formData.append("name", editedChapterName.value);
    if (editedChapterPhoto.value) {
      formData.append(
        "photo",
        editedChapterPhoto.value,
        editedChapterPhoto.value.name
      );
    }

    // const response = await updateChapter(formData, chapterId);
    // if (response) {
    //   toast.success("Успешное обновление каталога", { theme: "colored" });
    //   editedChapterId.value = null;
    //   editedChapterName.value = "";
    // } else {
    //   toast.error("Ошибка при обновлении каталога", { theme: "colored" });
    // }
  } catch (error) {
    console.error("Ошибка при обновлении каталога:", error);
  }
};


const handleChapterPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    chapterPhoto.value = file;
    chapterPhotoPreview.value = URL.createObjectURL(file);
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   catalogPhotoPreview.value = e.target?.result as string;
    // };
    // reader.readAsDataURL(file);
  }
}

  const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const sendChapterData = async () => {
  try {
    if (!chapterName.value || (!chapterPhoto.value && !photoLink.value)) {
      return;
    }

    const formData = new FormData();
    formData.append("name", chapterName.value);
    if (chapterPhoto.value) {
      formData.append("photo", chapterPhoto.value, chapterPhoto.value.name);
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value);
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
onMounted(async () => {
  try {
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});


</script>