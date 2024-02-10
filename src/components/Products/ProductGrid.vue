<template>
  <div class="title">
    <h2>Хиты для Вас</h2>
    <el-link
      to="/more"
      class="more-link"
      :underline="false"
      :prefix-icon="ArrowRight"
    >
      <p>Смотреть больше</p>
      <el-icon><ArrowRight /></el-icon>
    </el-link>
  </div>

  <el-scrollbar>
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
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getProducts } from "@/server/product";
import { ArrowRight } from "@element-plus/icons-vue";

const products = ref<Array<any>>([]);

onMounted(async () => {
  try {
    products.value = await getProducts();
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
:root {
  --el-color-primary: red;
}
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-flex-content:hover {
  display: flex;
  color: red;
}

.name:hover {
  color: red;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  object-fit: cover;
}

.more-link-card {
  text-decoration: none;
  color: #333;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 500px;
  margin: 5px;
}
.more-link {
  text-decoration: none;
  color: #333;
}

.more-link:hover {
  color: #d91111;
}

.more-link i {
  margin-left: 5px;
}
.title {
  color: #333;
  padding: 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
