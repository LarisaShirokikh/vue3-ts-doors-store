<template>
  <div class="title">
    <h2>Входные двери для домов ПИК</h2>
    <el-link 
    to="/more" 
    class="more-link" 
    :underline="false" 
    >
      <p>Смотреть больше</p>
      <el-icon><ArrowRight /></el-icon>
    </el-link>
  </div>
  

  <el-scrollbar>
    <div class="catalogs">
      <div v-for="catalog in catalogs" :key="catalog.id" class="catalog-item">
        <el-link :href="'/catalog/' + catalog.id" :underline="false">
          <el-image
            :src="photoUrl(catalog.photo[0])"
            :alt="catalog.name"
            class="catalog-image"
          ></el-image>
        </el-link>
        <div class="catalog-name">
          {{ catalog.name }}
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCatalogByChapterId } from "@/server/catalog";
import { ArrowRight } from "@element-plus/icons-vue";
const chapterId = 1;
const catalogs = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

onMounted(async () => {
  try {
    catalogs.value = await getCatalogByChapterId(chapterId);
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>

<style scoped>

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.catalogs {
  display: flex;
  justify-content: center;
  align-items: center;
}

.catalog-item {
  text-align: center;
  margin: 20px;
  flex: 0 0 calc(33.3333% - 40px);
}

.catalog-image {
  width: 110px;
  max-height: 200px;
}

.catalog-name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px; /* Adjust as needed */
  max-width: 100%;
}
</style>
