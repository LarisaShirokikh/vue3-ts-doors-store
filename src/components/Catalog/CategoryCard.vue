<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/category' }"
      >Категории</el-breadcrumb-item
    >
    <el-breadcrumb-item v-if="category" :to="{ path: '/catalog/id' }">{{
      category.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!--  -->
  <div
    class="category-details"
    v-if="category"
    style="margin-bottom: 30px; margin: 20px"
  >
    <h1>{{ category.name }}</h1>
  </div>

  <div v-if="products.length > 0">
    <div v-for="product in products" :key="product.id">
      <el-link
        :href="'/product/' + product.id"
        :underline="false"
        class="name"
        style="align-items: center"
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
              style="
                border-radius: 15px;
                width: 120px;
                margin: 5px;
                align-items: center;
              "
              class="flex-wrap gap-6"
              plain
              >{{ product.newPrice }} руб.</el-button
            >
          </div>
          <el-button text class="flex justify-space-between flex-wrap gap-4"
            >Подробнее <el-icon><ArrowRight /></el-icon
          ></el-button>
        </div>
      </el-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { photoUrl } from "@/utils/photoService";
import { getProductsByCatalogId } from "@/server/product";
import { getCategoryById } from "@/server/catalog";
import { useRouter } from "vue-router";
const router = useRouter();

const category = ref(null);
const products = ref([]);

const fetchCategories = async () => {
  try {
    const routeParams = router.currentRoute.value.params;
    const catalogId = routeParams ? routeParams.id : null;

    if (!catalogId) {
      throw new Error("Product ID not found in the route parameters.");
    }
    category.value = await getCategoryById(catalogId);
    products.value = await getProductsByCatalogId(catalogId);
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
  }
};

onMounted(fetchCategories);
</script>
