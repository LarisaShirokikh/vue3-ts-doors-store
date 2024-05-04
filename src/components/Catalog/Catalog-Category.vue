<template>
  <el-scrollbar>
    <div class="scrollbar">
      <div v-for="catalog in catalogs" :key="catalog.id">
        <el-link :href="'/catalog/' + catalog.id" :underline="false">
          <el-image
            :src="photoUrl(catalog.photo[0])"
            :alt="catalog.name"
            style="
              width: 180px;
              height: 300px;
              margin: 10px;
              border-radius: 10px;
            "
          ></el-image>
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
  </el-scrollbar>
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
    const fetchedCatalogs = await getCatalogs();
    catalogs.value = fetchedCatalogs.reverse();
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
