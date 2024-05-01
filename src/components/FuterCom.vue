<template>
  <footer class="footer">
    <div class="footer-column">
      
        <el-link href="/" type="danger" class="title"> Двери Эталон </el-link>
      
      <div style="display:flex; align-items: center; gap: 30px; margin-bottom: 10px;">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/vk-com.png"
          alt="VK Icon"
          style="width: 28px; color: #777;"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/telegram-app.png"
          alt="Telegram Icon"
          style="width: 28px"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png"
          alt="YouTube Icon"
          style="width: 28px"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png"
          alt="WhatsApp Icon"
          style="width: 28px"
        />
      </div>
      <el-link class="social-link" style="font-size: 28px">+7 (495) 999-99-99</el-link>
      <div>Режим работы</div>
      <div style="font-size: large; margin-bottom: 10px;">ПН-ВС с 9.00 до 21.00</div>
      <div>© Двери Эталон, 2024</div>
    </div>
    <div class="footer-column">
      <div class="title2">Магазин</div>
      <div class="social-link">
        <a href="/category" type="default" class="social-link">Все разделы</a>
        <a href="/catalogs" type="default" class="social-link">Все каталоги</a>
        <a href="/" type="default" class="social-link">Популярные категории</a>
        <a href="/" type="default" class="social-link">Акции</a>
        <a href="/" type="default" class="social-link">Отзывы</a>
        <a href="/" type="default" class="social-link">Отзывы</a>
        <a href="/" type="default" class="social-link">Специальное предложение</a>
      </div>
    </div>
    <div class="footer-column">
      <div class="title2">Клиентам</div>
      <div class="social-link">
      <a href="/category" type="default" class="social-link">Наши установки</a>
        <a href="/" type="default" class="social-link">Отзывы</a>
        <a href="/" type="default" class="social-link">Отзывы</a>
        <a href="/" type="default" class="social-link">Отзывы</a>
        <a href="/" type="default" class="social-link">Вызвать замерщика</a>
        <a href="/" type="default" class="social-link">Услуги и сервисы</a>
        <a href="/" type="default" class="social-link">Получить консультацию</a>
      </div>
    </div>
    <!-- <div class="footer-column">
      <div class="title2">Соцсети</div>
      <div>
        <a href="/" type="default" class="social-link">Каталог дверей</a>
        <a href="/" type="default" class="social-link">Каталог дверей</a>
        <a href="/" type="default" class="social-link">Каталог дверей</a>
        <a href="/" type="default" class="social-link">Каталог дверей</a>
        <a href="/" type="default" class="social-link">Каталог дверей</a>
      </div>
    </div> -->
  </footer>
</template>

<style scoped>

.text {

  font-size: 12px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  width: 100%;
}

.footer-column {
  flex: 1;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 34px;
  padding: 10px;
  margin: 10px;
}

.title2 {
  font-weight: bold;
  margin-bottom: 1px;
  font-size: 24px;
  padding: 10px;
  margin: 10px;
}

.social-link {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
  text-decoration: none;
  
}

.social-link:hover {
  color: #d91111;
}
</style>
