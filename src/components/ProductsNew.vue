<template>
  <div class="title">
    <h2>Новинки</h2>
    <el-link href="/review" class="more-link">
      <p>Смотреть больше</p>
      <el-icon><ArrowRight /></el-icon>
    </el-link>
  </div>

  <el-scrollbar>
    <div class="products">
      <div
        v-for="product in products.slice(0, 5)"
        :key="product.id"
        class="product-item"
      >
        <el-link :href="'/product/' + product.id" :underline="false">
          <el-image
            :src="photoUrl(product.photo[0])"
            :alt="product.name"
            style="width: 200px; height: 100%; margin: 10px; 
            border-radius: 5px"
          ></el-image>
        </el-link>
        <div
          class="product-name"
          style="
            color: #333;
            top: 5px;
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
            text-align: center;
            max-width: 100%;
          "
        >
          {{ product.name }}
        </div>
        <div class="product-price">{{ product.newPrice }} руб.</div>
        <div>
          <el-button class="product-button" type="danger" plain size="default"
            >Подробнее <el-icon><ArrowRight /></el-icon
          ></el-button>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getProducts } from "@/server/product";
import { ArrowRight } from "@element-plus/icons-vue";
const products = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

onMounted(async () => {
  try {
    const fetchedProducts = await getProducts();
    products.value = fetchedProducts.reverse();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>
<style scoped>
.products {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
<style>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #333;
}

.product-item {
  text-align: center;
  margin: 10px;
  flex: 0 0 calc(33.3333% - 20px);
}

.product-price {
  margin-top: 10px;
}
</style>
