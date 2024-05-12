<template>
  <!-- <a-breadcrumb>
    <a-breadcrumb-item><a href="/">Главная</a></a-breadcrumb-item>
    <a-breadcrumb-item>Мой профиль</a-breadcrumb-item>
    
  </a-breadcrumb> -->

  <a-tabs
    v-model:activeKey="activeName"
    type="card"
    color="danger"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <a-tab-pane key="profile">
      <template #tab>
        <span>
          <User />
          Профиль
        </span>
      </template>
      Мой профиль
    </a-tab-pane>

    <a-tab-pane 
    
    key="chapter">
      <template #tab>
        <span>
          <BookImage />
          Добавить раздел
        </span>
      </template>
      <add-chapter v-if="activeName === 'chapter'"></add-chapter>
    </a-tab-pane>

    <a-tab-pane  key="catalog">
      <template #tab>
        <span>
          <Images />
          Добавить каталог
        </span>
      </template>
      <add-catalog v-if="activeName === 'catalog'"></add-catalog>
    </a-tab-pane>

    <a-tab-pane  key="product">
      <template #tab>
        <span>
          <FileType />
          Добавить продукт
        </span>
      </template>
      <add-product v-if="activeName === 'product'"></add-product>
    </a-tab-pane>

    <a-tab-pane  key="services">
      <template #tab>
        <span>
          <HandCoins />
          Добавить сервис
        </span>
      </template>
      <add-services v-if="activeName === 'services'"></add-services>
    </a-tab-pane>

    <a-tab-pane  key="video">
      <template #tab>
        <span>
          <Video />
          Добавить видео
        </span>
      </template>
      <add-video v-if="activeName === 'video'"></add-video>
    </a-tab-pane>
    <a-tab-pane  key="file">
      <template #tab>
        <span>
          <FileInput />
          Добавить файл
        </span>
      </template>
      <file-uploader v-if="activeName === 'file'"></file-uploader>
    </a-tab-pane>

    <a-tab-pane key="review">
      <template #tab>
        <span>
          <MessageCircleCode />
          Добавить отзыв
        </span>
      </template>
      <add-review v-if="activeName === 'review'"></add-review>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AddCatalog from "@/components/Catalog/AddCatalog.vue";
import AddProduct from "@/components/Products/AddProduct.vue";
import AddServices from "@/components/Services/AddServices.vue";
import AddReview from "@/components/Review/AddReview.vue";
import AddChapter from "@/components/Chapters/AddChapter.vue";
import AddVideo from "@/components/Video/UploadVideo.vue";
import FileUploader from "@/components/FileUploader.vue";
import {
  User,
  BookImage,
  Images,
  FileType,
  HandCoins,
  Video,
  FileInput,
  MessageCircleCode,
} from "lucide-vue-next";
import AuthService from "@/server/auth";
const authService = new AuthService();
import router from "@/router/router";

const activeName = ref("profile");
const userRole = ref({ isAdmin: false, isSuperAdmin: false, user: false });

const handleClick = (tab: { key: string; }) => {
  activeName.value = tab.key;
};

onMounted(async () => {
  const storedToken = sessionStorage.getItem("userToken");

  if (storedToken) {
    const tokenData = JSON.parse(storedToken);
    const email = tokenData.email;

    const userInfo = await authService.getUserInfo(email);

    if (userInfo) {
      userRole.value = userInfo;
    }
  } else {
    router.push("/");
  }
});
</script>

<style>
.demo-tabs .a-tabs-tab {
  font-size: 16px;
  padding: 12px 24px;
}

.demo-tabs .a-tabs-tab.is-active {
  color: #e23f5d;
}

.demo-tabs .a-tabs-content {
  padding: 24px;
}

.demo-tabs .a-tabs-tab.is-active::after {
  background-color: #e23f5d;
}
</style>