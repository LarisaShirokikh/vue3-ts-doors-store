<template>
  <div class="banner-container relative max-w-full mx-auto overflow-hidden">
    <transition-group name="banner-fade" tag="div">
      <div
        v-for="(banner, index) in banners"
        :key="index"
        class="banner absolute top-0 left-0 w-full h-full rounded-lg"
        :style="{ zIndex: index === currentIndex ? 1 : 0, opacity: index === currentIndex ? 1 : 0 }"
      >
        <img :src="banner.image" :alt="banner.alt" class="w-full h-full rounded-lg" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VueCarousel',

  data() {
    return {
      banners: [
        { image: 'https://dveri-na-pobede.ru/wp-content/uploads/2021/05/vhodnie-dveri-banner.jpg', alt: 'Banner 1' },
        { image: 'https://dveri-na-pobede.ru/wp-content/uploads/2021/05/md-main3.jpg', alt: 'Banner 2' },
        // Добавьте другие баннеры по мере необходимости
      ],
      currentIndex: 0,
    };
  },

  mounted() {
    this.startCarousel();
  },

  methods: {
    startCarousel() {
      setInterval(() => {
        this.showNextBanner();
      }, 5000); // Переключение каждые 5 секунд (можете изменить по необходимости)
    },

    showNextBanner() {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    },
  },
});
</script>

<style scoped>
.banner-container {
  width: 100%;
  max-width: 100%;
  /* margin: 10px;  */
  height: 200px; /* Установите высоту карусели по вашему усмотрению */
}

.banner {
  transition: opacity 1s ease-in-out;
  margin-right: 2%; /* Используем проценты для автоматического определения отступов */
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Сохранять соотношение сторон и обрезать избыточные части */
}

@media (min-width: 640px) {
  .banner {
    margin-right: 1%; /* Изменяем отступ для устройств с шириной экрана 640px и более */
  }
}
</style>
