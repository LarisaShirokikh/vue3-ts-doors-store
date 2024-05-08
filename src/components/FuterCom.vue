<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="title">Двери Эталон</div>
      <div class="social-icons">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/vk-com.png"
          alt="VK Icon"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/telegram-app.png"
          alt="Telegram Icon"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png"
          alt="YouTube Icon"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png"
          alt="WhatsApp Icon"
        />
      </div>
      <el-link class="phone-number">+7 (495) 999-99-99</el-link>
      <div class="working-hours">
        <div>Режим работы</div>
        <div>ПН-ВС с 9.00 до 21.00</div>
      </div>
    </div>
    <div class="copyright">© Двери Эталон, 2024</div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f0f0f0;
  padding: 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  font-size: 24px;
}

.social-icons img {
  width: 30px;
  margin-right: 10px;
}

.phone-number {
  margin-top: 10px;
}

.working-hours {
  margin-top: 10px;
}

.copyright {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>
