<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/category' }"
      >Категории</el-breadcrumb-item
    >
    <el-breadcrumb-item v-if="products">{{ product.name }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!--  -->
  <div
    class="product-page"
    v-if="product"
    style="margin-bottom: 30px; margin: 20px"
  >
    <h1>{{ product.name }}</h1>
  </div>

  <div class="product">
      <div v-for="product in products" :key="product.id" class="product-item">
        <el-link :href="'/product/' + product.id" :underline="false">
          <el-image
            :src="photoUrl(product.photo[0])"
            :alt="product.name"
            class="product-image"
          ></el-image>
        </el-link>

        <div class="product-name">
          {{ truncateProductName(product.name) }}
        </div>
        <div class="product-price">{{ product.newPrice }} руб.</div>
        <div>
          <el-button class="product-button" type="danger" plain size="default"
            >Подробнее <el-icon><ArrowRight /></el-icon
          ></el-button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { getProducts } from "@/server/product";
import { ref, onMounted } from "vue";

const products = ref([]);

const photoUrl = (path) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchProducts = async () => {
  try {
    
    products.value = await getProducts();
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
};

onMounted(fetchProducts);
</script>