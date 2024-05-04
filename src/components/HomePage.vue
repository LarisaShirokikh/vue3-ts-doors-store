<template>
  <searchInput></searchInput>
  <carusel-item></carusel-item>
  <br />
  <br />
  <catalog-category />
  <br />
  <br />
  <br />
  <br />
  <products-new />
  <br />
  <br />
  <br />
  <br />
  <popular-categories></popular-categories>
  <!-- <ReviewBlog></ReviewBlog> -->
  <br />
  <br />
  <br />
  <br />
  <product-grid></product-grid>
  <br />
  <br />
  <br />
  <br />
  <catalog-wite></catalog-wite>
  <br />
  <br />
  <br />
  <br />
  <service-com></service-com>
  <div class="footer">
    <FooterCom class="footer"></FooterCom>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
//import ReviewBlog from "@/components/ReviewBlog.vue";
import FooterCom from "@/components/FuterCom.vue";
import { fetchDataFromServer } from "@/server/catalog";
import PopularCategories from "@/components/Popular/PopularCategories.vue";
import ServiceCom from "@/components/Services/ServisesCom.vue";
import ProductGrid from "@/components/Products/ProductGrid.vue";
import CatalogCategory from "@/components/Catalog/Catalog-Category.vue";
import CatalogWite from "@/components/Catalog/CatalogWite.vue";
import searchInput from "@/components/Search-input.vue";
import CaruselItem from "@/components/CaruselItem.vue";
import ProductsNew from "@/components/ProductsNew.vue";

const isDesktop = ref(true);
const catalogs = ref([]);
const selectedTabIndex = ref(0);

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
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  border: none;
}
.footer {
  background-color: #f0f0f0;
  width: 100%;
  padding: 10px 10px 30px;
  border: none;
}
</style>
