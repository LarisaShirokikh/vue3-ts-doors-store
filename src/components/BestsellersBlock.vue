<template>
  <div class="conteiner">
    <div class="title">
      <h2>Хиты для Вас</h2>
       <router-link to="/more" class="more-link">
          <p>Смотреть больше <i class="fa-solid fa-chevron-right"></i></p>
        </router-link>
    </div>
    <div v-if="bestsellers.length > 0" class="con">
      <product-grid :products="bestsellers" />
    </div>
    <div v-else>
      <p>Нет данных о хитах продаж.</p>
    </div>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import ProductGrid from '@/components/Products/ProductGrid.vue';

export default defineComponent({
  name: 'BestsellersBlock',
  components: {
    ProductGrid,
  },
  props: {
    bestsellers: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style scoped>
/* .con {
  display: flex;
  flex-wrap: wrap;
} */

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
  padding: 20px 30px 20px; 
  display: flex;
  align-items: center;
    justify-content: space-between;
}

.router-link,
.router-link-exact-active {
  text-decoration: none;
  color: #333; /* Цвет ссылки */
}

.router-link:hover {
  color: #d91111; 
}
</style>
  
  