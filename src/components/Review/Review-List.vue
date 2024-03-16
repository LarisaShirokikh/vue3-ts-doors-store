<template>
  <div>
    <h2 class="heading">Все отзывы</h2>
    <el-table
    :data="reviews"
      :key="index"
      style="width: 100%; max-height: 500px; overflow-y: auto"
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
        <el-table-column prop="reviewName" label="Название" />
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
            @click="deleteReview(scope.row.id)"
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
        <form :model="editedReview" ref="editedReviewForm" label-width="80px">
          <label for="reviewName" class="label">Название раздела:</label>
          <input
            v-model="editedReview.name"
            type="text"
            id="reviewName"
            class="input"
            required
          />

          <label for="description" class="label">Описание:</label>
          <textarea
            v-model="editedReview.description"
            rows="4"
            id="description"
            class="input"
            required
          ></textarea>

          <!-- Отображение текущего фото и возможность его удалить -->
          <label class="label">Текущее фото:</label>
          <img
            v-if="editedReview.photo"
            :src="editedReview.photo"
            class="avatar"
            style="max-width: 80px; max-height: 80px"
          />
          <el-button
            v-if="editedReview.photo"
            style="margin: 10px"
            @click="removePhoto"
            type="warning"
            >Удалить фото
          </el-button>

          <label for="reviewPhoto" class="label">Загрузить фото:</label>
          <input
            type="file"
            id="reviewPhoto"
            @change="handleReviewPhotoChange"
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
            v-if="reviewPhotoPreview"
            :src="reviewPhotoPreview"
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
          <el-button type="warning" @click="saveEditedReview"
            >Сохранить</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
const drawer = ref(false);
const reviews = ref([]);
const editDrawerVisible = ref(false);
const reviewPhotoPreview = ref(null);
const photoLink = ref("");
const reviewPhoto = ref(null);
import {getReviews} from "@/server/review";
import { Delete, Edit } from "@element-plus/icons-vue";

const removePhoto = () => {
  editedReview.value.photo = null;
};

const handleReviewPhotoChange = (event) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];

  if (file) {
    reviewPhoto.value = file;
    reviewPhotoPreview.value = URL.createObjectURL(file);
  }
};
const editedReview = ref({
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

const startEditing = (review) => {
  console.log("Editing review:", review);
  editedReview.value.id = review.id;
  editedReview.value.name = review.name;
  editedReview.value.description = review.description;
  editedReview.value.photo = review.photo[0];
  editDrawerVisible.value = true;
};

// const saveEditedReview = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("name", editedReview.value.name);
//     formData.append("description", editedReview.value.description);

//     if (editedReview.value.photo) {
//       formData.append(
//         "photo",
//         editedReview.value.photo,
//         editedReview.value.name
//       );
//     } else if (photoLink.value) {
//       formData.append("photo", photoLink.value.trim());
//     }

//     const response = await updateReview(formData, editedReview.value.id);
//     if (response && response.id) {
//       toast.success("Отзыв успешно обновлен", { theme: "colored" });
//       editDrawerVisible.value = false;
//       resetEditedReview();
//       await fetchReviews();
//     } else {
//       toast.error("Ошибка при обновлении отзыва", { theme: "colored" });
//     }
//   } catch (error) {
//     console.error("Ошибка при обновлении отзыва:", error);
//     toast.error("Ошибка при обновлении отзыва", { theme: "colored" });
//   }
// };

// const resetEditedReview = () => {
//   editedReview.value.id = null;
//   editedReview.value.name = "";
//   editedReview.value.description = "";
//   editedReview.value.photo = null;
// };

const fetchReviews = async () => {
  try {
    reviews.value = await getReviews();
  } catch (error) {
    console.error("Ошибка при получении списка отзывов:", error);
    toast.error("Ошибка при получении списка отзывов", { theme: "colored" });
  }
};

onMounted(fetchReviews);
</script>