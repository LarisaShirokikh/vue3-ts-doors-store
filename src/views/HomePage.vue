<template>
  <div id="home-view">
    <el-scrollbar :style="{ height: 'calc(100vh - 20px)' }" >
      <catalog-category />
      <building-list :videos="videos"></building-list>
      <popular-categories></popular-categories>

      <catalog-list
        v-if="!isDesktop"
        :catalogs="catalogs"
        :selectedTabIndex="selectedTabIndex"
      ></catalog-list>

      <product-grid></product-grid>
      <delivery-blog />
      <service-com></service-com>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
//  import ReviewBlog from '@/components/ReviewBlog.vue'
import DeliveryBlog from "@/components/DeliveryBlog.vue";
import CatalogList from "@/components/CatalogList.vue";
import { fetchDataFromServer } from "@/server/catalog";
import BuildingList from "@/components/Buildings/BuildingList.vue";
import { getVideo } from "@/server/video";
import PopularCategories from "@/components/Popular/PopularCategories.vue";
import ServiceCom from "@/components/Services/ServisesCom.vue";
import ProductGrid from "@/components/Products/ProductGrid.vue";
import CatalogCategory from "@/components/Catalog-Category.vue";

const isDesktop = ref(true);
const catalogs = ref([]);
const selectedTabIndex = ref(0);
const videos = ref([]);

const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth > 1000;
};

// const updateSelectedTabIndex = async (index: number) => {
//   selectedTabIndex.value = index;

//   try {
//     catalogs.value = await fetchDataFromServer(selectedTabIndex.value);
//   } catch (error) {
//     console.error('Ошибка при загрузке каталогов из базы данных:', error);
//   }
// };
onMounted(() => {
  console.log("Component mounted");
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);

  try {
    fetchData();
  } catch (error) {
    console.error("Ошибка при загрузке каталогов из базы данных:", error);
  }
});
onBeforeUnmount(() => {
  console.log("Component will unmount");
  window.removeEventListener("resize", checkScreenWidth);
});

const fetchData = async () => {
  catalogs.value = await fetchDataFromServer(selectedTabIndex.value);
  videos.value = await getVideo();
  console.log("Videos loaded:", videos.value);
};
</script>

<style scoped>
.build {
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
