<template>
    <div class="title">
          <h2>Популярные категории</h2>
           <el-link to="/more" class="more-link">
              <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
            </el-link>
        </div>
    <div class="scrollbar">
      <div v-for="catalog in catalogs" :key="catalog.id">
        <el-link :href="'/catalog/' + catalog.id" :underline="false" :justify="space - evenly">
          <el-image
            :src="photoUrl(catalog.photo[0])"
            :alt="catalog.name"
            style="
              width: 120px;
              height: 150px;
              margin: 5px;
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
              color: white;
              font-size: 12px;
              font-weight: bold;
            "
          >
            {{ catalog.name }}
          </div>
        </el-link>
      </div>
    </div>
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
  overflow: hidden;
  scroll-snap-type: x mandatory;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>