<template>
  <div class="title">
    <h2>Хиты для Вас</h2>
    <el-link :href="'/products'" class="more-link" :underline="false">
      <p>Смотреть больше</p>
      <el-icon><ArrowRight /></el-icon>
    </el-link>
  </div>

  <el-scrollbar>
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
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getProducts } from "@/server/product";
import { ArrowRight } from "@element-plus/icons-vue";

const products = ref<Array<any>>([]);

const truncateProductName = (name: string) => {
  const words = name.split(" ");
  if (words.length > 7) {
    return words.slice(0, 6).join(" ") + " ...";
  } else {
    return name;
  }
};

onMounted(async () => {
  try {
    const fetchedProducts = await getProducts();
    products.value = fetchedProducts.reverse();
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

<style scoped>
.product {
  display: flex;
}
.product-item {
  text-align: center;
  margin: 10px;
  flex: 0 0 calc(33.3333% - 20px);
}

.product-price {
  margin-top: 10px;
}

.product-image {
  width: 220px;
  max-height: 200px;
}

.product-name {
  color: #333;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px; /* Adjust as needed */
  max-width: 100%;
  /* max-height: 20px; */
}

.product-button {
  margin-top: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
