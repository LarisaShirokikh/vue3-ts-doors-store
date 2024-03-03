<template>
    <el-scrollbar >
   
      <div v-for="chapter in chapters" :key="chapter.id" class="scrollbar">
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
          <div
            class="chapter-name"
            style="
              /* position: absolute; */
              top: 10px;
              left: 20px;
              color: #333;
              font-size: 16px;
              font-weight: bold;
              overflow-y: auto;
            "
          >
            {{ chapter.name }}
          </div>
        </el-link>
      </div>
    
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
    console.log("Sending request...");
    chapters.value = await getChapters();
    console.log("chapters after setting:", chapters.value);
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