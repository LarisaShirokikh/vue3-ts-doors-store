<template>
  <div class="title">
    <h2>Хиты для Вас</h2>
    <el-link to="/more" class="more-link">
      <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
    </el-link>
  </div>

  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <el-col v-for="product in products" :key="product.id" :span="6">
        <div>
          <el-image
            :src="photoUrl(product.photo[0])"
            :alt="product.name"
            style="width: 150px; height: 170px; margin: 5px; border-radius: 5px"
          />
          <div style="padding: 1px; font-size: 12px">
            <span>{{ product.name }}</span>

            <el-button type="danger"
            style="border-radius: 15px; width: 120px" 
            class=" flex-wrap gap-6" plain
              >{{ product.newPrice }} руб.</el-button
            >
          </div>
          <el-button text class="flex justify-space-between flex-wrap gap-4">Подробнее</el-button>
        </div>
      </el-col>

      <!-- <el-link :href="'/product-details/' + product.id" :underline="false"> -->
    </div>
  </el-scrollbar>
</template>

<script>
import { defineComponent } from "vue";
import { getProducts } from "@/server/product";

export default defineComponent({
  name: "ProductGrid",
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const response = await getProducts();
      this.products = response;
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  },
  methods: {
    viewDoors(product) {
      console.log("View doors for product:", product.name);
    },
    photoUrl(path) {
      if (path.startsWith("/doorsPhoto/")) {
        return `http://localhost:3000${path}`;
      }
      return path;
    },
  },
});
</script>

<style scoped>
.scrollbar-flex-content {
  display: flex;
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
