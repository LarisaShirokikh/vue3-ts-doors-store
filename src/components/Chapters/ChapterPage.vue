<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/category' }"
      >Категории</el-breadcrumb-item
    >
    <el-breadcrumb-item v-if="chapter">{{ chapter.name }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!--  -->
  <div
    class="chapter-page"
    v-if="chapter"
    style="margin-bottom: 30px; margin: 20px"
  >
    <h1>{{ chapter.name }}</h1>
    <!-- Другие детали вашей главы, которые вы хотите отобразить -->
  </div>

  <div v-if="catalogs.length > 0" class="category">
    <div v-for="catalog in catalogs" :key="catalog.id" class="catalog-item">
      <el-link :href="'/chapter/' + catalog.id" :underline="false">
        <el-image
          :src="photoUrl(catalog.photo[0])"
          :alt="catalog.name"
          class="catalog-image"
          style="
            width: 120px;
            max-height: 350px;
            margin: 10px;
            border-radius: 10px;
          "
        >
        </el-image>
      </el-link>
      <div
        class="catalog-name"
        style="
          color: #666;
          top: 5px;
          font-size: 14px;
          margin: 2px;
          text-align: center;
        "
      >
        {{ catalog.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getChapterById } from "@/server/chapter";
import { getCatalogByChapterName } from "@/server/catalog";
import { useRouter } from "vue-router";
const router = useRouter();

const chapter = ref(null);
const catalogs = ref([]);

const photoUrl = (path) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchChapter = async () => {
  try {
    const routeParams = router.currentRoute.value.params;
    const chapterId = routeParams ? routeParams.id : null;
    const chapterName = routeParams ? routeParams.name : null;

    if (!chapterId) {
      throw new Error("Product ID not found in the route parameters.");
    }
    chapter.value = await getChapterById(chapterId);
    if (!chapterName) {
      throw new Error("Chapter name not found in the route parameters.");
    }
    catalogs.value = await getCatalogByChapterName(chapterName);
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
};

onMounted(fetchChapter);
</script>

<style scoped>
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.catalog-item {
  text-align: center;
  margin: 20px;
  flex: 0 0 calc(33.3333% - 40px);
}

.catalog-image {
  width: 250px;
  max-height: 300px;
  border-radius: 10px;
}

.catalog-name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px; /* Adjust as needed */
  max-width: 100%;
  text-align: center;
}
</style>
