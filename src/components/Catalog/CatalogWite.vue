<template>
  <a-space class="title">
    <a-text>Входные двери для домов ПИК</a-text>
    <el-link to="/catalogs" class="more-link" :underline="false">
      <a-text>Смотреть больше ></a-text>
    </el-link>
  </a-space>

  <el-scrollbar>
    <div class="catalogs">
      <div
        v-for="catalog in catalogs.slice(0, 8)"
        :key="catalog.id"
        class="catalog-item"
      >
        <el-link :href="'/catalog/' + catalog.id" :underline="false">
          <el-image
            :src="photoUrl(catalog.photo[0])"
            :alt="catalog.name"
            style="
              width: 110px;
              max-height: 200px;
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
            font-size: 15px;
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
import { photoUrl } from "@/utils/photoService";
import { getCatalogByChapterName } from "@/server/catalog";
const chapterName = "Белые";
const catalogs = ref<Array<any>>([]);

onMounted(async () => {
  try {
    catalogs.value = await getCatalogByChapterName(chapterName);
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #333;
}
.catalogs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.catalog-item {
  text-align: center;
  flex: 0 0 calc(33.3333% - 40px);
}

.catalog-image {
  width: 110px;
  max-height: 200px;
}

.catalog-name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px; /* Adjust as needed */
  max-width: 100%;
}
</style>
