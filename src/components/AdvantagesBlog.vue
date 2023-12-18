<template>
    <div class="advantages-container flex justify-between">
      <!-- Преимущество 1 -->
      <div class="advantage">
        <div class="icon flex text-gray-700">
          <img src="/logo/pay.png" alt="pay" class="">
          <span class='flex'>Не берем предоплат!</span>
          <!-- Вставьте иконку для первого преимущества -->
          <!-- <img src="icon1.png" alt="Icon 1" /> -->
        </div>
        <div class="text text-gray-700">
          <!-- Текст для первого преимущества -->
          <p>Расчет происходит только после установки</p>
        </div>
      </div>
  
      <!-- Преимущество 2 -->
      <div class="advantage">
        <div class="icon flex text-gray-700">
          <img src="/logo/del.png" alt="del" class="">
          <span class='flex'>Доставка в течении 2-х дней</span>
          <!-- Вставьте иконку для второго преимущества -->
          <!-- <img src="icon2.png" alt="Icon 2" /> -->
        </div>
        <div class="text text-gray-700">
          <!-- Текст для второго преимущества -->
          <p>Расчет происходит только после установки</p>
        </div>
      </div>
  
      <!-- Преимущество 3 -->
      <div class="advantage">
        <div class="icon flex text-gray-700">
          <!-- Вставьте иконку для третьего преимущества -->
          <img src="/logo/door.png" alt="door" class="">
          <span class='flex'>В наличии более 1500 дверей</span>
        </div>
        <div class="text text-gray-700">
          <!-- Текст для третьего преимущества -->
          <p>Расчет происходит только после установки</p>
        </div>
      </div>
  
      <!-- Преимущество 4 -->
      <div class="advantage">
        <div class="icon flex text-gray-700">
          <!-- Вставьте иконку для четвертого преимущества -->
          <img src="/logo/worker.png" alt="worker" class="">
          <span class='flex'>Качественный монтаж</span>
        </div>
        <div class="text text-gray-700">
          <!-- Текст для четвертого преимущества -->
          <p>Расчет происходит только после установки</p>
        </div>
      </div>
    </div>
  </template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdvantagesBlog',
})
</script>
  
  <style scoped>
  .advantages-container {
    margin: 50px; /* Отступы вокруг контейнера с преимуществами */
  }
  
  .advantage {
    width: 100%;
    max-width: 200px; /* Максимальная ширина для каждого контейнера преимущества */
    text-align: center;
  }
  
  .icon img {
    width: 100%; /* Занимает всю ширину контейнера */
    max-height: 80px; /* Максимальная высота иконки */
    object-fit: contain; /* Сохраняет соотношение сторон и вписывает изображение */
  }
  
  .text p {
    margin-top: 10px; /* Отступ между иконкой и текстом */
  }
  </style>
  