<template>
  <footer class="footer">
    <div class="footer-column">
      <div class="title">
        <el-link href="/" type="danger" class="title">
          Двери Эталон
        </el-link>
      </div>
      <el-link style="font-size: x-large;">+7 (495) 999-99-99</el-link>
      <div>Режим работы</div>
      <div style="font-size: x-large;">ПН-ВС с 9.00 до 21.00</div>
     <div style="font-size: x-large;"> © Двери Эталон, 2024</div>
    </div>
    <div class="footer-column">
      <div class="footer-column-title">
        Режим работы
      </div>
      <div>ПН-ВС с 9.00 до 21.00</div>
    </div>

    <div class="footer-column">
      <div class="footer-column-title">Соцсети</div>
      <div>
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Instagram</a>
        <a href="#" class="social-link">Twitter</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  
  width: 100%;
  /* text-align: center; */
  /* margin: 10px; */
}

.footer-column {
  flex: 1;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 34px
}

.social-link {
  margin-right: 10px;
  color: #333;
  text-decoration: none;
}

.social-link:hover {
  color: #d91111;
}
</style>
