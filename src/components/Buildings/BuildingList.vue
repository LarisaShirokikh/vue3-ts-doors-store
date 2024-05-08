<template>
  <div class="title">
    <h2>Наши установки</h2>
  </div>

  <div class="horizontal-scroll">
    <div v-for="video in videos" :key="video.id">
      <video
        width="200"
        height="auto"
        preload="auto"
        style="border-radius: 15px"
        @click="toggleVideo(video)"
      >
        <source :src="videoUrl(video.video[0])" :poster="video.thumbnail" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getVideo } from "@/server/video";
import { videoUrl } from "@/utils/photoService";
const videos = ref([]);

const fetchData = async () => {
  try {
    const videoData = await getVideo();
    videos.value = videoData.reverse();
  } catch (error) {
    console.error("Ошибка при получении списка видео:", error);
  }
};

onMounted(() => {
  fetchData();
});

const toggleVideo = (video) => {
  const videoElement = document.querySelector(`#videoPlayer_${video.id}`);
  if (videoElement) {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }
};
</script>

<style scoped>
.building-list {
  padding: 20px;
  gap: 10px;
}

.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
}

.title {
  padding: 20px 30px 20px;
  color: #333;
}

/* Добавьте стили по желанию для горизонтальной прокрутки */
</style>
