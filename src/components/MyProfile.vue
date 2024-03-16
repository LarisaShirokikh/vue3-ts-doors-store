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

    <el-tab-pane
      name="chapter"
      v-show="userRole.isSuperAdmin || userRole.isAdmin"
      label="раздел"
    >
      <add-chapter v-if="activeName === 'chapter'"></add-chapter>
    </el-tab-pane>

    <el-tab-pane
      name="catalog"
      v-show="userRole.isSuperAdmin || userRole.isAdmin"
      label="каталог"
    >
      <add-catalog v-if="activeName === 'catalog'"></add-catalog>
    </el-tab-pane>

    <el-tab-pane
      name="product"
      v-show="userRole.isSuperAdmin || userRole.isAdmin"
      label="карточка"
    >
      <add-product v-if="activeName === 'product'"></add-product>
    </el-tab-pane>

    <el-tab-pane
      name="services"
      v-show="userRole.isSuperAdmin || userRole.isAdmin"
      label="сервис"
    >
      <add-services v-if="activeName === 'services'"></add-services>
    </el-tab-pane>

    <el-tab-pane
      name="video"
      v-show="userRole.isSuperAdmin || userRole.isAdmin || userRole.user"
      label="видео"
    >
      <add-video v-if="activeName === 'video'"></add-video>
    </el-tab-pane>
    <el-tab-pane 
    label="файл" 
    name="file"
    v-show="userRole.isSuperAdmin || userRole.isAdmin || userRole.user"
    >
      <file-uploader v-if="activeName === 'file'"></file-uploader>
    </el-tab-pane>

    <el-tab-pane
      name="review"
      v-show="userRole.isSuperAdmin || userRole.isAdmin || userRole.user"
      label="отзыв"
    >
      <add-review v-if="activeName === 'review'"></add-review>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AddCatalog from "@/components/AddCatalog.vue";
import AddProduct from "@/components/AddProduct.vue";
import AddServices from "@/components/Services/AddServices.vue";
import AddReview from "@/components/AddReview.vue";
import AddChapter from "@/components/AddChapter.vue";
import AddVideo from "@/components/Video/UploadVideo.vue";
import FileUploader from "@/components/FileUploader.vue";
import type { TabsPaneContext } from "element-plus";
import { getUserInfo } from "@/server/auth";

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

    const userInfo = await getUserInfo(email);
    console.log("userInfo", userInfo);

    if (userInfo) {
      userRole.value = userInfo;
    }
  }
});
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: var(--el-text-color-danger);
  font-size: 18px;
  font-weight: auto;
}


.el-tabs .el-tabs__item.is-active {
  color: #f28144; /* Желтый цвет для активного таба */
}

.el-tabs .el-tabs__item.is-active::after {
  background-color: #f28144; /* Желтый цвет для подчеркивания активного таба */
}
</style>
