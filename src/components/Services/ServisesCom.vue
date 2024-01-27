<template>
    <div class="title">
          <h2>Услуги и сервисы</h2>
           <el-link href="/more" class="more-link">
        <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
      </el-link>
        </div>
    <el-scrollbar>
        <div class="popular-categories">
          <router-link v-for="service in servises" :to="'/catalog/' + service.id" 
          :key="service.id" class="category-link">
            <div class="category-card" :style="{ backgroundImage: 'url(' + service.photoLink + ')' }">
              <div class="category-overlay">
                <h3 class="category-name">{{ service.serviceName }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </el-scrollbar>
</template>

<script lang="ts">
 //import { sendServiceToServer } from '@/server/service';
import { getServices } from '@/server/service';
import { defineComponent } from 'vue';
//import { toast } from 'vue3-toastify/index';

export default defineComponent({
    data() {
        return {
            servises: [],
            cardHeight: '200px',
        };
    },
    methods: {
    
    },
     async mounted() {
        try {
            const response = await getServices();
            this.servises = response;
        } catch (error) {
            console.error('Error fetching data from the server:', error);
        }
    },
});
</script>

<style scoped>
.popular-categories {
    margin-bottom: 20px;
    display: flex;
}

.category-card {
position: relative;
  width: 400px;
  height: 300px;
  margin: 10px;
  border: 1px solid #ccc; /* Добавляем бордер */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Добавляем тень */
  overflow: hidden;
  border-radius: 4px;
}

.category-name {
    position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.category-image {
  width: auto;
  height: 50%;
  /* object-fit: cover; */
  border-radius: 4px;
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