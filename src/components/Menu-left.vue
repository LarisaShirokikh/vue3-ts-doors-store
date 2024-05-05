<template>
    <el-scrollbar >
   
      <a-space v-for="chapter in chapters" :key="chapter.id" class="scrollbar">
        <el-link :href="'/chapter/' + chapter.id" :underline="false">
          <el-image
            :src="photoUrl(chapter.photo[0])"
            :alt="chapter.name"
            style="
              width: 60px;
              height: 60px;
              margin: 10px;
              border-radius: 10px;
            "
          >
          </el-image>
          <a-space
            class="chapter-name"
            style="
              /* position: absolute; */
              top: 10px;
              left: 20px;
              color: #666;
              font-size: 20px;
              overflow-y: auto;
            "
          >
            {{ chapter.name }}
          </a-space>
        </el-link>
      </a-space>
    
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {  getChapters } from "@/server/chapter";

const chapters = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

onMounted(async () => {
  try {
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }

});
</script>
<style scoped>
.scrollbar {
  height: 100%;
}
</style>