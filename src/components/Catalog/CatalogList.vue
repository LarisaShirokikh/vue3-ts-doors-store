<template>
  <div>
    <el-text class="heading">Список каталогов</el-text>

    <el-table
      :data="catalogs"
      :key="index"
      style="width: 100%; max-height: 800px; overflow-y: auto"
      :page-size="5"
    >
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
      <el-table-column label="Действия" width="200">
        <template v-slot="scope">
          <el-button
            @click="(drawer = true), startEditing(scope.row)"
            :icon="Edit"
            circle
            size="small"
            type="primary"
          ></el-button>
          <el-button
            @click="deleteCatalog(scope.row.id)"
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
        <form :model="editedCatalog" ref="editedCatalogForm" label-width="80px">
          <label for="chapterName" class="label">Название раздела:</label>
          <input
            v-model="editedCatalog.name"
            type="text"
            id="chapterName"
            class="input"
            required
          />

          <label for="description" class="label">Описание:</label>
          <textarea
            v-model="editedCatalog.description"
            rows="4"
            id="description"
            class="input"
            required
          ></textarea>

          <!-- Отображение текущего фото и возможность его удалить -->
          <label class="label">Текущее фото:</label>
          <div class="foto">
            <img
              v-if="editedCatalog.photo"
              :src="editedCatalog.photo"
              class="avatar"
              style="max-width: auto; max-height: 100px"
            />
            <el-button
              v-if="editedCatalog.photo"
              style="margin: 10px"
              @click="removePhoto"
              type="danger"
              >Удалить фото
            </el-button>
          </div>

          <label for="catalogPhoto" class="label">Загрузить фото:</label>
          <input
            type="file"
            id="catalogPhoto"
            @change="handleCatalogPhotoChange"
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
            v-if="catalogPhotoPreview"
            :src="catalogPhotoPreview"
            alt="Предворительный просмотр фото каталога"
            class="chapter-preview"
            style="
              width: 150px;
              height: 100px;
              margin: 10px;
              border-radius: 15px;
            "
          />
        </form>

        <div class="dialog-footer">
          <el-button @click="drawer = false">Отменить</el-button>
          <el-button type="danger" @click="saveChanges">Сохранить</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { photoUrl } from "@/utils/photoService";
import { deleteCatalogId, getCatalogs, updateCatalog } from "@/server/catalog";
import { toast } from "vue3-toastify";
import { Delete, Edit } from "@element-plus/icons-vue";

const drawer = ref(false);
const catalogPhoto = ref(null);
const catalogPhotoPreview = ref(null);
const catalogs = ref([]);
const photoLink = ref("");
const editDrawerVisible = ref(false);
const props = defineProps({
  catalogAddedCount: Number,
});

const removePhoto = () => {
  editedCatalog.value.photo = null;
};

const editedCatalog = ref({
  id: null,
  name: "",
  description: "",
  photo: null,
});

const loadPhotoFromLink = () => {
  if (photoLink.value.trim() !== "") {
    catalogPhotoPreview.value = photoLink.value.trim();
  } else {
    catalogPhotoPreview.value = null;
  }
};

const startEditing = (catalog) => {
  editedCatalog.value.id = catalog.id;
  editedCatalog.value.name = catalog.name;
  editedCatalog.value.description = catalog.description;
  editedCatalog.value.photo = catalog.photo[0];
  editDrawerVisible.value = true;
};

const resetEditedCatalog = () => {
  editedCatalog.value.id = null;
  editedCatalog.value.name = "";
  editedCatalog.value.description = "";
  editedCatalog.value.photo = null;
};

const saveChanges = async () => {
  try {
    const formData = new FormData();
    formData.append("name", editedCatalog.value.name);
    formData.append("description", editedCatalog.value.description);
    // Проверяем, есть ли изменения в фото каталога
    if (editedCatalog.value.photo) {
      formData.append(
        "photo",
        new Blob([editedCatalog.value.photo], { type: "image/jpeg" }),
        editedCatalog.value.name
      );
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }

    const response = await updateCatalog(formData, editedCatalog.value.id);
    if (response && response.affected > 0) {
      toast.success("Успешное обновление каталога", { theme: "colored" });
      editDrawerVisible.value = false;
      resetEditedCatalog();
      await fetchCatalogs();
    } else {
      toast.error("Ошибка при обновлении каталога", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении каталога:", error);
  }
};

const deleteCatalog = async (catalogId) => {
  try {
    await deleteCatalogId(catalogId);

    toast.success("Успешное удаление каталога", { theme: "colored" });

    await fetchCatalogs();
  } catch (error) {
    toast.error("Ошибка при удалении каталога", { theme: "colored" });
    console.error("Ошибка при удалении каталога:", error);
  }
};

const handleCatalogPhotoChange = (event) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];

  if (file) {
    catalogPhoto.value = file;
    catalogPhotoPreview.value = URL.createObjectURL(file);
  }
};

const fetchCatalogs = async () => {
  try {
    const fetchedCatalog = await getCatalogs();
    catalogs.value = fetchedCatalog.reverse();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

watch(
  () => props.catalogAddedCount,
  async () => {
    await fetchCatalogs();
  },
  { immediate: true }
);

onMounted(fetchCatalogs);
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
