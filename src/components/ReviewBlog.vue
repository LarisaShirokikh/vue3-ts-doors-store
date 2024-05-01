<template>
  <a-space class="title">
    <a-text>Отзывы</a-text>
    <el-link href="/review" class="more-link">
      <p>Смотреть больше  ></p>
    </el-link>
  </a-space>

  <el-scrollbar>
    <div class="reviews">
      <div v-for="review in reviews.reverse()" :key="review.id" class="review-item">
        <el-link :href="'/review/' + review.id" :underline="false">

          <el-image
            :src="photoUrl(review.photo[0])"
            :alt="review.reviewName"
            style="
              width: 150px;
              max-height: 200px;
              margin: 10px;
              border-radius: 10px;
            "
          >
          </el-image>
        </el-link>
        <div style="padding: 10px">
          <div class="rating">
            <el-rate
            v-if="typeof review.rating === 'number'"
            v-model="review.rating"
            :disabled="true"
            show-score
            :score-template="scoreTemplate"
            ></el-rate>
          </div>
          <div class="review-text">
              <h3 style="
            color: #333;
            top: 5px;
            font-size: 14px;
            font-weight: bold;
            margin: 2px;
            text-align: left;
          ">{{ review.reviewName }}</h3>
              <p>{{ getFirstSentence(review.description) }}</p>
            </div>
          
            <el-button text class="button" 
            v-if="!isReadMoreVisible(review.description)" 
            @click="showFullDescription(review)"
            >
            Читать далее
          </el-button>
          
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { getReviews } from "@/server/review";
import { onMounted, ref } from "vue";

const reviews = ref([]);


const photoUrl = (path) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

onMounted(async () => {
  try {
    const response = await getReviews();
    console.log("response rating", response);
    reviews.value = response.map(review => ({ ...review, showFullDescription: false }));
  } catch (error) {
    console.error("Error fetching data from the server:", error);
  }
});

const getFirstSentence = (description) => {
  if (!description) return "";
  const sentences = description.split(/[.!?]/);
  return sentences[0];
};

const isReadMoreVisible = (description) => {
  if (!description) return false;
  const sentences = description.split(/[.!?]/);
  return sentences.length > 1;
};

const showFullDescription = (review) => {
  review.showFullDescription = true;
};
</script>

<style scoped>
.reviews {
  display: flex;
}
.review-item {
  text-align: left;
  margin: 10px;
  flex: 0 0 calc(33.3333% - 20px);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #333;
}
</style>
