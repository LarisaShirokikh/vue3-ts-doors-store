<template>
    <div class="category-details">
      <div v-for="category in categories" :key="category.id">
        <h2 class="">{{category.name}}</h2>
        <button class="">Посмотреть все</button>
      </div>
      
      <div class="scrollbar-flex-content">
      <div v-for="product in products" :key="product.id">
        <el-link
          :href="'/product/' + product.id"
          :underline="false"
          class="name"
          style="align-items: center;"
        >
          <div>
            <img
              :src="photoUrl(product.photo[0])"
              :alt="product.name"
              style="
                width: 150px;
                height: 170px;
                margin: 5px;
                border-radius: 10px;
              "
            />
            <div class="product-name" style="margin: 5px; max-width: 200px">
              <span>{{ product.name }}</span>
            </div>
            <div>
              <el-button
                type="danger"
                style="border-radius: 15px; width: 120px; margin: 5px; align-items: center;"
                class="flex-wrap gap-6"
                plain
                >{{ product.newPrice }} руб.</el-button
              >
            </div>
            <el-button text class="flex justify-space-between flex-wrap gap-4"
              >Подробнее <el-icon><ArrowRight /></el-icon></el-button
            >
          </div>
        </el-link>
      </div>
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref, onMounted } from "vue";
  
import { getProducts } from "@/server/product";
import { getCategoryById } from "@/server/catalog";

const products = ref<Array<any>>([]);
const categories = ref<Array<any>>([]);
const catalogId = ref<number | null>(null);

onMounted(async () => {
  try {
    // Проверяем, существует ли this.$route.params
    if (this.$route.params && this.$route.params.catalogId) {
      catalogId.value = parseInt(this.$route.params.catalogId as string, 10);
      categories.value = await getCategoryById(catalogId.value);
      products.value = await getProducts();
    } else {
      console.error("Missing 'catalogId' parameter");
    }
  } catch (error) {
    console.error("Error fetching data from the server:", error);
  }
});

const photoUrl = (path: string) => {
  if (path.startsWith("/doorsPhoto/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};
  
  </script>