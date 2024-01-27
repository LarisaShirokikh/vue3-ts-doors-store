<template>
    <el-scrollbar height="800px">
   
      <div v-for="catalog in catalogs" :key="catalog.id" class="scrollbar">
        <el-link :href="'/catalog/' + catalog.id" :underline="false">
          <el-image
            :src="photoUrl(catalog.photo[0])"
            :alt="catalog.name"
            style="
              width: 60px;
              height: 60px;
              margin: 10px;
              border-radius: 10px;
            "
          >
          </el-image>
          <div
            class="catalog-name"
            style="
              /* position: absolute; */
              top: 10px;
              left: 20px;
              color: #333;
              font-size: 13px;
              font-weight: bold;
              overflow-y: auto;
            "
          >
            {{ catalog.name }}
          </div>
        </el-link>
      </div>
    
    </el-scrollbar>
    <!-- <el-menu  class="el-menu-vertical-demo" 
        active-text-color="#ffd04b" style="width:250px; padding-top: 20px; padding-bottom: 20px;">

        <el-menu-item index="1">
            <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Все двери</span>
        </el-menu-item>

        <el-menu-item index="2">
            <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Хиты продаж</span>
        </el-menu-item>

        <el-menu-item index="3">
            <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Цены ниже</span>
        </el-menu-item>

        <el-menu-item index="4">
            <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Белые двери</span>
        </el-menu-item>

        <el-menu-item index="5">
            <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Отделка металл</span>
        </el-menu-item>

        <el-menu-item index="6">
                <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
                <span>С терморазрывом</span>
            </el-menu-item>

    <el-menu-item index="7">
                <el-image style="width: 50px; height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
                <span>С зеркалом</span>
            </el-menu-item>

            <el-menu-item index="8">
                <el-image style="width: 50px; 
                border-radius: 15px;
                height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
                <span>Под покраску</span>
            </el-menu-item>


        <el-menu-item index="9">
            <el-image style="width: 50px; 
            border-radius: 15px;
            height: 50px; padding-right: 10px;" :src="w" :fit="fit"></el-image>
            <span>Двухконтурные</span>
        </el-menu-item>
    </el-menu> -->
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
  height: 100%;
}
</style>