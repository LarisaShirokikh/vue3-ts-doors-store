<template>
  <h2 class="heading">Добавить отзыв</h2>

  <a-form 
   :model="ruleForm"
   >
    <a-form-item label="Рейтинг">
      <a-rate v-model:value="ruleForm.rating" />
    </a-form-item>

    <a-form-item label="Заголовок">
      <a-input v-model:value="ruleForm.reviewName" />
    </a-form-item>

    <a-form-item
      label="Расскажите подробнее"
    >
      <a-textarea
        v-model:value="ruleForm.description"
        placeholder="Напишите подробный отзыв"
      />
    </a-form-item>

    <a-form-item prop="photo">
      <a-upload
        v-model:file-list="file"
        list-type="picture"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleReviewPhotoChange"
        class="input"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Загрузить фото ...
        </a-button>
      </a-upload>
      <img
        v-if="reviewPhotoPreview"
        :src="reviewPhotoPreview"
        alt="Предворительный просмотр фото"
        class="chapter-preview"
        style="width: auto; height: 300px; margin: 10px; border-radius: 15px"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        danger
        @click="submitForm"
        >Добавить отзыв
        </a-button>
    </a-form-item>
  </a-form>

  <review-list></review-list>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import { getReviews, sendReview } from "@/server/review";
import { toast } from "vue3-toastify";
import ReviewList from "@/components/Review/Review-List.vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { UnwrapRef } from 'vue';
//import type { UploadProps } from 'ant-design-vue';
const reviews = ref<any[]>([]);
const reviewPhoto = ref<File | null>(null);
const reviewPhotoPreview = ref<string | null>(null);
const file = ref([]);
const headers = {
  authorization: "authorization-text",
};

interface RuleForm {
  rating: number,
    reviewName: string,
    description: string,
    photo: File[],
}

const ruleForm: UnwrapRef<RuleForm> = reactive({
    rating: 0,
    reviewName: "",
    description: "",
    photo: [],
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
      console.log("userToken: ", user.value.email);
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
  if (fileInput) {
    const file = fileInput.files?.[0];
    if (file) {
      reviewPhoto.value = file;
      reviewPhotoPreview.value = URL.createObjectURL(file);
    }
  }
};

const submitForm = async () => {
  console.log('submit!', toRaw(ruleForm));
  try {
    if (!ruleForm.rating || !ruleForm.reviewName || !reviewPhoto.value) {
      return;
    }

    const formData = new FormData();
    formData.append("rating", ruleForm.rating.toString());
    formData.append("reviewName", ruleForm.reviewName);
    formData.append("description", ruleForm.description);
    if (reviewPhoto.value) {
      formData.append("photo", reviewPhoto.value, reviewPhoto.value.name);
    }
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
  ruleForm.rating = 0;
  ruleForm.reviewName = "";
  ruleForm.description = "";
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
  color: #f56c6c;
}
</style>
