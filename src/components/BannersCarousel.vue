<!-- <template>
  <div class="banner-container">
    <transition-group name="banner-fade" tag="div">
      <div v-for="(banner, index) in banners" :key="index" class="banner">
        <img :src="banner.image" :alt="banner.alt" class="w-full h-full rounded-lg" />
      </div>
    </transition-group>
  </div>
</template> -->
<template>
  <div>
    <VueSlickCarousel :arrows="true" :dots="true">
      <div>
        <img src="https://dveri-na-pobede.ru/wp-content/uploads/2021/05/md-main3.jpg" alt="Slide 1" />
      </div>
      <div>
        <img src="https://dveri-na-pobede.ru/wp-content/uploads/2021/05/vhodnie-dveri-banner.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="https://dvericiti.ru/upload/banner5.jpg" alt="Slide 3" />
      </div>
      <!-- Добавьте дополнительные слайды, используя ваши закомментированные ссылки -->
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'vueSlickCarousel',
  components: { VueSlickCarousel }
});
</script>
