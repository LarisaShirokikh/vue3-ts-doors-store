<template>
  <div class="container">
    <a-space class="title">
      <a-text>Новинки</a-text>
      <el-link href="/catalogs" class="more-link" :underline="false">
        <p>Смотреть больше  ></p>
      </el-link>
    </a-space>

    <el-scrollbar>
      <div class="products">
        <div
          v-for="product in products.slice(0, 4)"
          :key="product.id"
          class="product-item"
        >
          <el-link :href="'/product/' + product.id" :underline="false">
            <el-image
              :src="photoUrl(product.photo[0])"
              :alt="product.name"
              class="product-image"
            ></el-image>
          </el-link>
          <div class="product-details">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">{{ product.newPrice }} руб.</div>
            <a-button danger class="product-button"  size="default">Подробнее</a-button>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getProducts } from "@/server/product";
import { photoUrl } from "@/utils/photoService";
const products = ref<Array<any>>([]);

onMounted(async () => {
  try {
    const fetchedProducts = await getProducts();
    if (fetchedProducts && Array.isArray(fetchedProducts)) {
      products.value = fetchedProducts.slice().reverse();
    }
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.product-item {
  text-align: center;
  margin: 10px;
  width: 100%;
  max-width: 300px; /* Максимальная ширина для мобильных устройств */
}

.product-image {
  width: 100%; /* Сделать изображение растягиваемым на всю ширину блока */
}

.product-details {
  margin-top: 10px;
}

.product-name {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-button {
  margin-top: 10px;
}
</style>
