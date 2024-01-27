<template>
  <el-space direction="vertical">
    

        <el-breadcrumb separator="/" style="margin-bottom: 30px; margin-left: 10px;">
          <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
          <el-breadcrumb-item>Мой профиль</el-breadcrumb-item>
          <!--  -->
        </el-breadcrumb>
    

    <el-tabs
      :tab-position="tabPosition"
      style="height: auto; 
      color: orange"
      class="demo-tabs"
    >
      <el-tab-pane label="Мой профиль">Мой профиль</el-tab-pane>

      <el-tab-pane
        v-if="userRole.isSuperAdmin || userRole.isAdmin"
        label="Добавить каталог"
      >
        <add-catalog></add-catalog>
      </el-tab-pane>

      <el-tab-pane
        v-if="userRole.isSuperAdmin || userRole.isAdmin"
        label="Добавить карточку"
      >
        <add-product></add-product>
      </el-tab-pane>

      <el-tab-pane
        v-if="userRole.isSuperAdmin || userRole.isAdmin"
        label="Добавить сервис"
      >
        <add-services></add-services>
      </el-tab-pane>

      <el-tab-pane
        v-if="userRole.isSuperAdmin || userRole.isAdmin || userRole.user"
        label="Добавить видео"
      >
        <add-video></add-video>
      </el-tab-pane>
      <el-tab-pane label="Загрузить из файла">Загрузить из файла</el-tab-pane>

      <el-tab-pane
        v-if="userRole.isSuperAdmin || userRole.isAdmin || userRole.user"
        label="Добавить отзыв"
      >
        <add-review></add-review>
      </el-tab-pane>
    </el-tabs>
  </el-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AddCatalog from "@/components/AddCatalog.vue";
import AddProduct from "@/components/AddProduct.vue";
import AddServices from "@/components/Services/AddServices.vue";
import AddReview from "@/components/AddReview.vue";
import AddVideo from "@/components/Video/UploadVideo.vue";
import { getUserInfo } from "@/server/auth";

const tabPosition = ref('left')
const userRole = ref({ isAdmin: false, isSuperAdmin: false, user: false });

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
  color: #6b778c;
  font-size: 32px;
  font-weight: 200;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
