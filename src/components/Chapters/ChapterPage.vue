<template>
    <el-breadcrumb separator="/" style="margin-bottom: 30px; margin-left: 10px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item>Белые двери</el-breadcrumb-item>
</el-breadcrumb>
<!--  -->
  <div class="chapter-page" v-if="chapter">
    <h1>{{ chapter.name }}</h1>
    <h3>{{ chapter.description }}</h3>
    <!-- Другие детали вашей главы, которые вы хотите отобразить -->
  </div>
  <div v-if="catalogs.length > 0">
    <div v-for="catalog in catalogs" :key="catalog.id">
      <el-link :href="'/catalog/' + catalog.id" :underline="false">
            <el-image
              :src="photoUrl(catalog.photo[0])"
              :alt="catalog.name"
              style="
                width: 250px;
                height: 300px;
                margin: 10px;
                border-radius: 15px;
              "
            >
            </el-image>
            <div
              class="catalog-name"
              style="
                position: absolute;
                top: 10px;
                left: 15px;
                color: #fff;
                font-size: 24px;
                margin: 10px;
                font-weight: bold;
              "
            >
              {{ catalog.name }}
            </div>
          </el-link>
  
        </div>
        
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getChapterById, getCatalogsByChapterId} from "@/server/chapter";
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

    if (!chapterId) {
      throw new Error("Product ID not found in the route parameters.");
    }
    chapter.value = await getChapterById(chapterId);
    catalogs.value = await getCatalogsByChapterId(chapterId);
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
};

onMounted(fetchChapter);
</script>

<style scoped>
/* Стили вашей страницы главы */
</style>
