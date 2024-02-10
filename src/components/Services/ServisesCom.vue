<template>
  <div class="title">
    <h2>Услуги и сервисы</h2>
    <el-link href="/more" class="more-link" :underline="false">
      <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
    </el-link>
  </div>

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
          <!-- <el-image
            :src="photoUrl(service.photo[0])"
            :alt="service.name"
            style="
              width: 120px;
              height: 150px;
              margin: 5px;
              border-radius: 15px;
            "
          >
          </el-image>
          <div
            class="service-name"
            style="
              position: absolute;
              top: 10px;
              left: 15px;
              color: white;
              font-size: 12px;
              font-weight: bold;
            "
          >
            {{ service.name }}
          </div> -->
        </el-link>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
//import { sendServiceToServer } from '@/server/service';
import { getServices } from "@/server/service";
import { onMounted, ref } from "vue";
//import { toast } from 'vue3-toastify/index';

const servises = ref<Array<any>>([]);

const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

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
