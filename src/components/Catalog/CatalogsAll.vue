<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/catalogs' }"
      >Каталоги</el-breadcrumb-item
    >
  </el-breadcrumb>
  <div></div>

  <div v-if="catalogs.length > 0" class="category">
    <div v-for="catalog in catalogs" :key="catalog.id" class="catalog-item">
      <el-link :href="'/catalog/' + catalog.id" :underline="false">
        <el-image
          :src="photoUrl(catalog.photo[0])"
          :alt="catalog.name"
          class="catalogs-image"
          style="
            width: 120px;
            max-height: 350px;
            margin: 10px;
            border-radius: 10px;
          "
        >
        </el-image>
      </el-link>

      <div class="catalogs-name"
      style="
            color: #666;
            top: 5px;
            font-size: 14px;
            font-weight: bold;
            margin: 2px;
            text-align: center;
            width: 50%;
          "
      >
        <h1>{{ catalog.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCatalogs } from "@/server/catalog";
import { ref, onMounted } from "vue";
const catalogs = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchCatalogs = async () => {
  try {
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
};

onMounted(fetchCatalogs);
</script>

<style scoped>
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.catalogs-item {
  text-align: center;
  margin: 10px;
  flex: 0 0 calc(33.3333% - 40px);
  align-items: center;
}

.catalogs-image {
  width: 250px;
  max-height: 300px;
  border-radius: 10px;
}

.catalogs-name {
  color: #333;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
  max-width: 100%;
  text-align: center;
}
</style>
