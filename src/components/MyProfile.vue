<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin-left: 10px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item>Мой профиль</el-breadcrumb-item>
    <!--  -->
  </el-breadcrumb>

  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane name="profile" label="профиль">Мой профиль</el-tab-pane>

    <el-tab-pane v-if="userRole.isAdmin === true"
      name="chapter"
      
      label="раздел"
    >
      <add-chapter v-if="activeName === 'chapter'"></add-chapter>
    </el-tab-pane>

    <el-tab-pane v-if="userRole.isAdmin === true"
      name="catalog"
      
      label="каталог"
    >
      <add-catalog v-if="activeName === 'catalog'"></add-catalog>
    </el-tab-pane>

    <el-tab-pane v-if="userRole.isAdmin === true"
      name="product"
      
      label="карточка"
    >
      <add-product v-if="activeName === 'product'"></add-product>
    </el-tab-pane>

    <el-tab-pane v-if="userRole.isAdmin === true"
      name="services"
      label="сервис"
    >
      <add-services v-if="activeName === 'services'"></add-services>
    </el-tab-pane>

    <el-tab-pane v-if="userRole.isAdmin === true"
      name="video"
      label="видео"
    >
      <add-video v-if="activeName === 'video'"></add-video>
    </el-tab-pane>
    <el-tab-pane  v-if="userRole.isAdmin === true"
    label="файл" 
    name="file"
    >
      <file-uploader v-if="activeName === 'file'"></file-uploader>
    </el-tab-pane>

    <el-tab-pane
      name="review"
      label="отзыв"
    >
      <add-review v-if="activeName === 'review'"></add-review>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {  onMounted, ref } from "vue";
import AddCatalog from "@/components/Catalog/AddCatalog.vue";
import AddProduct from "@/components/Products/AddProduct.vue";
import AddServices from "@/components/Services/AddServices.vue";
import AddReview from "@/components/Review/AddReview.vue";
import AddChapter from "@/components/AddChapter.vue";
import AddVideo from "@/components/Video/UploadVideo.vue";
import FileUploader from "@/components/FileUploader.vue";
import type { TabsPaneContext } from "element-plus";
import AuthService from "@/server/auth";
const authService = new AuthService();
import router from "@/router/router";

const activeName = ref("profile");
const userRole = ref({ isAdmin: false, isSuperAdmin: false, user: false });

const handleClick = (tab: TabsPaneContext) => {
  activeName.value = tab.name;
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: var(--el-text-color-danger);
  font-size: 18px;
  font-weight: auto;
  color: #ff124a; 
}


.el-tabs .el-tabs__item.is-active {
  color: #ff124a; 
}


.el-tabs .el-tabs__item.is-active::after {
  background-color: #ff124a; /* Желтый цвет для подчеркивания активного таба */
}

.el-tabs .el-tabs__item.is-active:hover,
.el-tabs .el-tabs__item.is-active:hover::after {
  color: #ff124a !important; 
}
</style>
