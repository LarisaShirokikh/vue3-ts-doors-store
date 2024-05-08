<template>
  <a-space class="title">
    <a-text>Услуги и сервисы</a-text>
    <el-link href="/more" class="more-link" :underline="false">
      <a-text>Смотреть больше  ></a-text>
    </el-link>
  </a-space>

  <el-scrollbar>
    <div class="services">
      <div v-for="service in servises" :key="service.id">
        <el-link :href="'/service/' + service.id" :underline="false">
          <div class="image-container" style="">
          <img
            :src="photoUrl(service.photo[0])"
            :alt="service.name"
            class="service-image"
            style="max-width: 200px; max-height: 200px; border-radius: 10px"
          />
          <div class="service-name" style="margin: 5px; max-width: 200px;">
            {{ service.serviceName }}
          </div>
          <div class="service-name" style="margin: 5px">
            от {{ service.price }}
          </div>
          <button style="border: none; color: #333; margin: 5px">Подробнее...</button>
        </div>
        </el-link>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { getServices } from "@/server/service";
import { onMounted, ref } from "vue";
import { photoUrl } from "@/utils/photoService";

const servises = ref<Array<any>>([]);

onMounted(async () => {
  try {
    servises.value = await getServices();
  } catch (error) {
    console.error("Error fetching data from the server:", error);
  }
});
</script>

<style scoped>
.services {
  display: flex;
  
}
.image-container {
  margin: 15px;
}

.title {
  color: #333;
  padding: 20px 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-link {
  text-decoration: none;
  color: #333;
}
.more-link {
  text-decoration: none;
  color: #333;
}

.more-link:hover {
  color: #d91111;
}

.more-link i {
  margin-left: 5px;
}
</style>
