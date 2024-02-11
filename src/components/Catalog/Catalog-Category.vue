<template>
  <el-scrollbar >
    <div class="scrollbar">
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
              color: #333;
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
  </el-scrollbar >
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCatalogs } from "@/server/catalog";

const catalogs = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

onMounted(async () => {
  try {
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>
<style scoped>
.scrollbar {
  display: flex;
}
</style>
