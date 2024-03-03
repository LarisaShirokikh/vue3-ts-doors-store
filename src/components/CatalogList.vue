<template>
    <div>
      <h2 class="heading">Список каталогов</h2>

      <el-table
        :data="catalogs"
        :key="index"
        style="width: 100%; max-height: 500px; overflow-y: auto"
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
        <el-table-column label="Действия" width="100">
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
      <div class="container">
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
          <img
            v-if="editedCatalog.photo"
            :src="editedCatalog.photo"
            class="avatar"
            style="max-width: 80px; max-height: 80px"
          />
          <el-button
            v-if="editedCatalog.photo"
            style="margin: 10px"
            @click="removePhoto"
            type="warning"
            >Удалить фото
          </el-button>

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
              width: 250px;
              height: 300px;
              margin: 10px;
              border-radius: 15px;
            "
          />
        </form>

        <div class="dialog-footer">
          <el-button @click="drawer = false"
            >Отменить</el-button
          >
          <el-button type="warning" @click="saveChanges"
            >Сохранить</el-button
          >
        </div>
      </div>
    </el-drawer>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  deleteCatalogRequest,
  getCatalogs,
  updateCatalog,
} from "../server/catalog";
import { toast } from "vue3-toastify";
import { Delete, Edit } from "@element-plus/icons-vue";
import { Category } from "@/types/catalogType";

const drawer = ref(false);
const catalogPhoto = ref<File | null>(null);
const catalogPhotoPreview = ref<string | null>(null);
const catalogs = ref<Array<any>>([]);
const photoLink = ref("");
const editDrawerVisible = ref(false);

const removePhoto = () => {
  editedCatalog.value.photo = null;
};


const editedCatalog = ref({
  id: null,
  name: "",
  description: "",
  photo: null,
});

const startEditing = (catalog: Category[]) => {
  console.log("Editing chapter:", catalog);
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
    if (editedCatalog.value.photo) {
      formData.append(
        "photo",
        editedCatalog.value.photo,
        editedCatalog.value.name
      );
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }

    const response = await updateCatalog(formData, editedCatalog.value.id);
    if (response && response.id) {
      toast.success("Успешное обновление каталога", { theme: "colored" });
      editDrawerVisible.value = false;
      resetEditedCatalog()
      await  fetchCatalogs()
    } else {
      toast.error("Ошибка при обновлении каталога", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении каталога:", error);
  }
};

const deleteCatalog = async (catalogId) => {
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

const handleCatalogPhotoChange = (event: { target: any; }) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];

  if (file) {
    catalogPhoto.value = file;
    catalogPhotoPreview.value = URL.createObjectURL(file);
  }
};

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchCatalogs = async () => {
    try {
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
}

onMounted(fetchCatalogs);
</script>