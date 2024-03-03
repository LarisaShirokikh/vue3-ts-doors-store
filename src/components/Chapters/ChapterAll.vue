<template>
  <el-breadcrumb separator="/" style="margin-bottom: 30px; margin: 20px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/category' }">Категории</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="chapters">
    <div v-for="chapter in chapters" :key="chapter.id" class="chapters-item">
      <el-link :href="'/chapter/' + chapter.id" :underline="false">
        <el-image
          :src="photoUrl(chapter.photo[0])"
          :alt="chapter.name"
          class="chapters-image"
        >
        </el-image>
      </el-link>
      <div
        class="chapters-name"
        
      >
        {{ chapter.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getChapters } from "@/server/chapter";

const chapters = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchChapters = async () => {
  try {
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Ошибка при получении каталога:", error);
  }
};

onMounted(fetchChapters);
</script>

<style scoped>
.chapters {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.chapters-item {
  text-align: center;
  margin: 20px;
  flex: 0 0 calc(33.3333% - 40px);
}

.chapters-image {
  width: 250px;
  max-height: 300px;
  border-radius: 10px;
}

.chapters-name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px; /* Adjust as needed */
  max-width: 100%;
}
</style>
