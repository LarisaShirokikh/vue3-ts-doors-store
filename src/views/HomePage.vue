<template>
  <!-- <div id="home-view"> -->
  <!-- <el-scrollbar 
    
    > -->
  <SearchInput></SearchInput>
  <carusel-item></carusel-item>
  <catalog-category />
  <building-list :videos="videos"></building-list>
  <popular-categories></popular-categories>
  <ReviewBlog></ReviewBlog>
  <product-grid></product-grid>
  <catalog-wite></catalog-wite>

  <service-com></service-com>
  <!-- </el-scrollbar> -->
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import ReviewBlog from "@/components/ReviewBlog.vue";
// import DeliveryBlog from "@/components/DeliveryBlog.vue";
import { fetchDataFromServer } from "@/server/catalog";
import BuildingList from "@/components/Buildings/BuildingList.vue";
import { getVideo } from "@/server/video";
import PopularCategories from "@/components/Popular/PopularCategories.vue";
import ServiceCom from "@/components/Services/ServisesCom.vue";
import ProductGrid from "@/components/Products/ProductGrid.vue";
import CatalogCategory from "@/components/Catalog/Catalog-Category.vue";
import CatalogWite from "@/components/Catalog/CatalogWite.vue";
import SearchInput from "@/components/Search-input.vue";
import CaruselItem from "@/components/CaruselItem.vue";

const isDesktop = ref(true);
const catalogs = ref([]);
const selectedTabIndex = ref(0);
const videos = ref([]);

const checkScreenWidth = () => {
  isDesktop.value = window.innerWidth > 1000;
};

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
.container {
}
</style>
