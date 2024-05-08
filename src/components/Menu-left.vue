<template>
  <el-scrollbar>
    <a-space v-for="chapter in chapters" :key="chapter.id" class="scrollbar">
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
            /* position: absolute; */
            top: 10px;
            left: 10px;
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getChapters } from "@/server/chapter";
import { photoUrl } from "@/utils/utils";
const chapters = ref<Array<any>>([]);


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
  direction: flex;
}
</style>
