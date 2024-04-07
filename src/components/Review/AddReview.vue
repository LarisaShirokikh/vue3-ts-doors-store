<template>
  <h2 class="heading">Добавить отзыв</h2>

  <el-form ref="form" :model="ruleForm">
    <el-form-item label="Рейтинг" prop="rating">
      <el-rate v-model="ruleForm.rating" show-score></el-rate>
    </el-form-item>
    <el-form-item label="Заголовок" prop="reviewName">
      <el-input
        type="textarea"
        v-model="ruleForm.reviewName"
        placeholder="Что Вам понравилось или не понравилось"
      ></el-input>
    </el-form-item>
    <el-form-item label="Расскажите подробнее" prop="description">
      <el-input
        type="textarea"
        v-model="ruleForm.description"
        placeholder="Напишите подробный отзыв"
      ></el-input>
    </el-form-item>
    <el-form-item label="Фото отзыва" prop="photo">
      <input
        type="file"
        id="reviewPhoto"
        @change="handleReviewPhotoChange"
        accept="image/*"
        class="input"
      />
      <img
        v-if="reviewPhotoPreview"
        :src="reviewPhotoPreview"
        alt="Предворительный просмотр фото каталога"
        class="chapter-preview"
        style="width: 250px; height: 300px; margin: 10px; border-radius: 15px"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm"
        style="background-color: #F56C6C; border-color: #F56C6C"
        >Добавить отзыв</el-button
      >
    </el-form-item>
  </el-form>
  <review-list></review-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getReviews, sendReview } from "@/server/review";
import { toast } from "vue3-toastify";
import ReviewList from "@/components/Review/Review-List.vue"
const reviews = ref<Array<any>>([]);
const reviewPhoto = ref<File | null>(null);
const reviewPhotoPreview = ref<string | null>(null);

const ruleForm = ref({
  rating: 0,
  reviewName: "",
  description: "",
});

const user = ref({
  email: "",
});

const extractUserInfoFromToken = () => {
  const token = sessionStorage.getItem("userToken");
  if (token) {
    try {
      const tokenData = JSON.parse(token);
      user.value.email = tokenData.email;
      console.log('userToken: ', user.value.email)
    } catch (error) {
      console.error("Ошибка при разборе токена:", error);
    }
  }
};

const fetchReviews = async () => {
  try {
    reviews.value = await getReviews();
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
  }
};

onMounted(fetchReviews);

const handleReviewPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    reviewPhoto.value = file;
    reviewPhotoPreview.value = URL.createObjectURL(file);
  }
};

const submitForm = async () => {
  try {
    if (!ruleForm.value.rating || !ruleForm.value.reviewName || !reviewPhoto.value) {
      return;
    }

    const formData = new FormData();
    formData.append("rating", ruleForm.value.rating);
    formData.append("reviewName", ruleForm.value.reviewName);
    formData.append("description", ruleForm.value.description);
    formData.append("photo", reviewPhoto.value, reviewPhoto.value.name);

    const response = await sendReview(formData);

    if (response) {
      toast.success("Успешное добавление отзыва", { theme: "colored" });
      resetForm();
    } else {
      toast.error("Ошибка при добавлении отзыва", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при отправке отзыва:", error);
  }
};

const resetForm = () => {
  ruleForm.value.rating = 0;
  ruleForm.value.reviewName = "";
  ruleForm.value.description = "";
  reviewPhoto.value = null;
  reviewPhotoPreview.value = null;
};

onMounted(extractUserInfoFromToken);
</script>

<style scoped>
.avatar-uploader {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.heading {
  color: #F56C6C
}
</style>
