<template>
    <footer class="bg-gray-900 text-white p-8">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <!-- Логотип или название компании -->
        <div class="mb-4 md:mb-0">
          <h1 class="text-2xl font-bold">Название вашей компании</h1>
          <p class="text-sm">Описание компании</p>
        </div>
  
        <!-- Навигация по сайту -->
        <nav class="flex flex-wrap justify-center md:justify-end space-x-4">
          <router-link to="/" class="text-sm">Главная</router-link>
          <router-link to="/about" class="text-sm">О нас</router-link>
          <router-link to="/services" class="text-sm">Услуги</router-link>
          <router-link to="/contact" class="text-sm">Контакты</router-link>
        </nav>
  
        <!-- Контактная информация -->
        <div class="text-sm">
          <p>Телефон: +7 (XXX) XXX-XX-XX</p>
          <p>Email: info@example.com</p>
          <!-- Другие контактные данные -->
        </div>
      </div>
    </footer>
  </template>
  