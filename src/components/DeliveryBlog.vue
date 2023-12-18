<template>
  <div class="mx-10 my-10 space-x-8 text-2xl font-bold text-gray-700">

    <h2>Как купить входную дверь?</h2>
  </div>

    <div class="advantages-container flex justify-between">
      <!-- Преимущество 1 -->
      <div class="advantage">
        <div class="icon flex text-gray-700">
          <CreditCard class='text-gray-700' style="width: 2em; height: 2em; margin-right: 10px"/>
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
          <Box style="width: 2em; height: 2em; margin-right: 10px"/>
          <span class='flex'>Не берем предоплат!</span>
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
          <Box style="width: 2em; height: 2em; margin-right: 10px"/>
          <span class='flex'>Не берем предоплат!</span>
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
          <Box style="width: 2em; height: 2em; margin-right: 10px"/>
          <span class='flex'>Не берем предоплат!</span>
        </div>
        <div class="text text-gray-700">
          <!-- Текст для четвертого преимущества -->
          <p>Расчет происходит только после установки</p>
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeliveryBlog',
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
  