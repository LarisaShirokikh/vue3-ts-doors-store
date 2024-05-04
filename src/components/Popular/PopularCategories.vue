<template>
  <a-space class="title">
    <a-text>Популярные категории</a-text>
    <el-link
    :href="'/catalogs'" 
    class="more-link" 
    :underline="false" >
    
      <a-text>Смотреть больше  ></a-text>
    </el-link>
  </a-space>

  <el-scrollbar>
    <div class="scrollbar">
      <div v-for="catalog in catalogs" :key="catalog.id">
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
            font-size: 16px;
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
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
});
</script>
<style scoped>

:root {
  --a-color-primary: red;
}
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-flex-content:hover {
  display: flex;
  color: red;
}

.name:hover {
  color: red;
}
.scrollbar {
  display: flex;
}

.more-link:hover {
  color: #d91111;
}
.more-link i {
  margin-left: 5px;
}

.more-link-card {
  text-decoration: none;
  color: #333;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 500px;
  margin: 5px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #333;
}
</style>
