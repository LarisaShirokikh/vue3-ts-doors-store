<template>
  <div>
    <h2 class="heading">Список разделов</h2>
    <el-table
      :data="chapters"
      :key="index"
      style="width: 100%; max-height: 800px; overflow-y: auto"
      :page-size="5"
    >
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column label="Фото" width="100">
        <template #default="scope">
          <img
            v-if="scope.row.photo && scope.row.photo.length > 0"
            :src="photoUrl(scope.row.photo[0])"
            :alt="scope.row.name"
            style="max-width: 80px; max-height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Название" />
      <el-table-column label="Действия" width="200">
        <template #default="scope">
          <el-button
            @click="(drawer = true), startEditing(scope.row)"
            :icon="Edit"
            circle
            size="small"
            type="primary"
          ></el-button>
          <el-button
            @click="deleteChapter(scope.row.id)"
            :icon="Delete"
            circle
            size="small"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      v-model="drawer"
      size="50%"
      :visible="editDrawerVisible"
      @close="editDrawerVisible = false"
      direction="rtl"
    >
      <div class="form">
        <form :model="editedChapter" ref="editedChapterForm" label-width="80px">
          <label for="chapterName" class="label">Название раздела:</label>
          <input
            v-model="editedChapter.name"
            type="text"
            id="chapterName"
            class="input"
            required
          />

          <label for="description" class="label">Описание:</label>
          <textarea
            v-model="editedChapter.description"
            rows="4"
            id="description"
            class="input"
            required
          ></textarea>

          <!-- Отображение текущего фото и возможность его удалить -->
          <label class="label">Текущее фото:</label>
          <div class="foto">
            <img
              v-if="editedChapter.photo"
              :src="editedChapter.photo"
              class="avatar"
              style="max-width: 80px; max-height: 80px"
            />
            <el-button
              v-if="editedChapter.photo"
              style="margin: 10px"
              @click="removePhoto"
              type="danger"
              >Удалить фото
            </el-button>
          </div>

          <label for="chapterPhoto" class="label">Загрузить фото:</label>
          <input
            type="file"
            id="chapterPhoto"
            @change="handleChapterPhotoChange"
            accept="image/*, .png, .jpg, gif, .web,"
            class="input"
          />
          <label for="photoLink" class="label">Ссылка на фото:</label>
          <input
            v-model="photoLink"
            type="text"
            id="photoLink"
            class="input"
            @input="loadPhotoFromLink"
          />
          <img
            v-if="chapterPhotoPreview"
            :src="chapterPhotoPreview"
            alt="Предворительный просмотр фото каталога"
            class="chapter-preview"
            style="
              width: 250px;
              height: 300px;
              margin: 10px;
              border-radius: 15px;
            "
          />
        </form>

        <div class="dialog-footer">
          <el-button @click="drawer = false">Отменить</el-button>
          <el-button type="danger" @click="saveEditedChapter"
            >Сохранить</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { toast } from "vue3-toastify";
import { getChapters, updateChapter, deleteChapterId } from "@/server/chapter";
import { Delete, Edit } from "@element-plus/icons-vue";
const drawer = ref(false);
const chapters = ref([]);
const editDrawerVisible = ref(false);
const chapterPhotoPreview = ref(null);
const photoLink = ref("");
const chapterPhoto = ref(null);
const props = defineProps({
  chapterAddedCount: Number
});


const removePhoto = () => {
  editedChapter.value.photo = null;
};

const handleChapterPhotoChange = (event) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];

  if (file) {
    chapterPhoto.value = file;
    chapterPhotoPreview.value = URL.createObjectURL(file);
  }
};

const loadPhotoFromLink = () => {
  if (photoLink.value.trim() !== "") {
    chapterPhotoPreview.value = photoLink.value.trim();
  } else {
    chapterPhotoPreview.value = null;
  }
};
const editedChapter = ref({
  id: null,
  name: "",
  description: "",
  photo: null,
});

const photoUrl = (path) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const startEditing = (chapter) => {
  console.log("Editing chapter:", chapter);
  editedChapter.value.id = chapter.id;
  editedChapter.value.name = chapter.name;
  editedChapter.value.description = chapter.description;
  editedChapter.value.photo = chapter.photo[0];
  editDrawerVisible.value = true;
};

const saveEditedChapter = async () => {
  try {
    const formData = new FormData();
    formData.append("name", editedChapter.value.name);
    formData.append("description", editedChapter.value.description);

    if (editedChapter.value.photo) {
      formData.append(
        "photo",
        editedChapter.value.photo,
        editedChapter.value.name
      );
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }

    const response = await updateChapter(formData, editedChapter.value.id);
    if (response && response.id) {
      toast.success("Раздел успешно обновлен", { theme: "colored" });
      editDrawerVisible.value = false;
      resetEditedChapter();
      await fetchChapters();
    } else {
      toast.error("Ошибка при обновлении раздела", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении раздела:", error);
    toast.error("Ошибка при обновлении раздела", { theme: "colored" });
  }
};

const resetEditedChapter = () => {
  editedChapter.value.id = null;
  editedChapter.value.name = "";
  editedChapter.value.description = "";
  editedChapter.value.photo = null;
};

const fetchChapters = async () => {
  try {
    const fetchedChapters = await getChapters();
    chapters.value = fetchedChapters.reverse();
  } catch (error) {
    console.error("Ошибка при получении списка разделов:", error);
    toast.error("Ошибка при получении списка разделов", { theme: "colored" });
  }
};

watch(() => props.chapterAddedCount, async () => {
  // Функция для получения обновленного списка глав
  await fetchChapters();
}, { immediate: true });

const deleteChapter = async (chapterId) => {
  try {
    // Отправить запрос на удаление раздела к серверу
    await deleteChapterId(chapterId);
    toast.success("Раздел успешно удален", { theme: "colored" });
    // Обновить список разделов после успешного удаления
    await fetchChapters();
  } catch (error) {
    console.error("Ошибка при удалении раздела:", error);
    toast.error("Ошибка при удалении раздела", { theme: "colored" });
  }
};

onMounted(fetchChapters);
</script>

<style scoped>
.foto {
  display: flex;
  margin: 10px;
}
.avatar-uploader {
  display: inline-block;
  margin-right: 0.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
}

.form {
  max-width: 100%;
  margin: auto;
  background-color: #f8f9fa; /* Цвет фона */
  padding: 2rem;
  border-radius: 15px; /* Радиус скругления углов */
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

.heading {
  color: #f56c6c;
}
</style>
