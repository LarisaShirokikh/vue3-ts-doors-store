<template>
  <div class="title">
    <h2>Отзывы</h2>
    <el-link href="/more" class="more-link">
      <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
    </el-link>
  </div>
  <el-scrollbar>
    <div class="reviews">
      <el-link v-for="review in reviews" :key="review.id" class="more-link-card "
        :href="{ name: 'review-details', params: { id: review.id } }">
        <el-card :justify="space-evenly">
          <img :src="photoUrl(review.photo[0])" :alt="review.name" class="image" :fit="fit" />
          <div style="padding: 5px">
            <span>{{ review.title }}</span>
            <div class="rating">
                <el-rate v-if="typeof review.rating === 'number'"
                v-model="review.rating" 
                :disabled="true" 
                show-score
                :score-template="scoreTemplate"
                ></el-rate>
              </div>
            <div class="bottom">
              <el-button text class="button">Подробнее</el-button>
            </div>
          </div>
        </el-card>
      </el-link>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { getReviews } from '@/server/review'
import { onMounted, ref } from 'vue'


const reviews = ref([]);

const scoreTemplate = (score) => {
  return `${score}/5`;
};

const photoUrl = (path) => {
      if (path.startsWith('/doorsPhoto/')) {
        return `http://localhost:3000${path}`;
      }
      return path;
    }

onMounted(async () => {
  try {
    const response = await getReviews();
    console.log('response rating', response);
    reviews.value = response; 
  } catch (error) {
    console.error('Error fetching data from the server:', error);
  }
});
</script>

<style scoped>
.products {
  display: flex;
}


.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  object-fit: cover;
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

.title {
  color: #333;
  padding: 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
