<template>
  <div class="menu">
    <el-scrollbar>
      <a-space v-for="chapter in chapters" :key="chapter.id" class="menu-item">
        <el-link :href="'/chapter/' + chapter.id" :underline="false">
          <a-image
            :src="photoUrl(chapter.photo[0])"
            :alt="chapter.name"
            :preview="false"
            style="width: 60px; height: 60px; margin: 10px; border-radius: 10px"
          />

          <a-space
            class="chapter-name"
            style="
              color: #666;
              font-size: 16px;
              overflow-y: auto;
            "
          >
            {{ chapter.name }}
          </a-space>
        </el-link>
      </a-space>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ChapterService from "@/server/chapter";
import { photoUrl } from "@/utils/photoService";

const chapters = ref<any[]>([]);
const chapterService = new ChapterService();

onMounted(async () => {
  try {
    chapters.value = await chapterService.getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.menu-item {
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
}

.chapter-name {
  margin-top: 5px;
  text-align: center;
}

@media (max-width: 768px) {
  .menu-item {
    max-width: none;
  }
}
</style>
