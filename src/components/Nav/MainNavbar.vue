<template>
  
  <div class="navbar">
    <el-button @click="toggleMenu" class="menu-button">
      <i :class="isOpenMenu ? 'fas fa-times fa-lg' : 'fas fa-bars fa-lg'"></i>
    </el-button>
    <el-aside v-if="isOpenMenu" class="menu">
      <el-input type="text" placeholder="Поиск" class="search-input"></el-input>
      <el-menu class="menu-items">
        <el-menu-item index="#">
          <i class="far fa-list-alt fa-lg"></i>
          <span>Каталог</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="far fa-comments fa-lg"></i>
          <span>Отзывы</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="far fa-building fa-lg"></i>
          <span>О компании</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="fas fa-wrench fa-lg"></i>
          <span>Наши установки</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="fas fa-puzzle-piece fa-lg"></i>
          <span>Доборы</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="fas fa-gift fa-lg"></i>
          <span>Акции</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="fas fa-hands-helping fa-lg"></i>
          <span>Поддержка</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="fas fa-shopping-cart fa-lg"></i>
          <span>Как купить</span>
        </el-menu-item>
        <el-menu-item index="#">
          <i class="far fa-newspaper fa-lg"></i>
          <span>Блог</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- Переместите router-link за пределы блока меню -->
    <el-link v-if="!isOpenMenu" href="/" class="brend">
      <h1>Двери Эталон</h1>
   </el-link>
  
    
      <el-link href="tel:+79260217365" 
      type="info" 
      size="large"
      >+7 (926) 021-73-65</el-link>
    
    
        <el-link
        v-if="isLoggedIn" href="/myProfile" class="avatar">
          <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-link>
        
        
        <el-aside v-else class="login">
          <el-link href="/login" type="warning">Войти</el-link>
          <span>/</span>
          <el-link href="/register" type="success">Регистрация</el-link>
        </el-aside>
        </div>
  
</template>


<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import { authenticateUser } from '@/server/auth';
import { ref } from 'vue';


  
const isLoggedIn = ref(false)
const isOpenMenu = ref(false);
    
const checkLoggedIn = async () => {
    const storedToken = sessionStorage.getItem('userToken');

    if (storedToken) {
      const tokenData = JSON.parse(storedToken);
      const token = tokenData.token;

      authenticateUser(token).then((isAuthenticated) => {
        if (isAuthenticated === true) {
          isLoggedIn.value = true;
        }
      });
    }
  };
  checkLoggedIn();

const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

</script>

<style scoped>
.navbar {
  display: flex;
  width: auto;
  background-color: #ffffff;
  align-items: center;
  padding: 0px 50px 0px; 
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  color: #555555;
}

.login {
  color: #555555;
  padding: 0px 50px 0px; 
  text-decoration: none;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-items {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.menu a {
  color: #555555;
  text-decoration: none;
  padding: 12px 0;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.menu a:not(:last-child):after {
  content: '';
  border-bottom: 1px solid #e0e0e0;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.menu a i {
  margin-right: 10px;
  color: #555555;
}

.menu a span {
  flex-grow: 1;
  margin-left: 10px;
}

.menu a:hover {
  background-color: #e6e6e6;
  border-radius: 3px;
}

.search-input {
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 3px;
}

.navbar {
  border-bottom: 1px solid #ccc;
  /* background-color: #ffcc00; */
  padding: 0px 30px 0px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  min-height: 60px;
  width: auto;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
}

.menu-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #555555;
  cursor: pointer;
}
.menu-button:hover {
  color: #000; /* Darken button color on hover */
}

.phone-icon {
  color: #555555; /* Изменено на серый цвет */
  font-size: 1.4rem; /* Уменьшен размер шрифта номера телефона */
  max-width: 400px; /* Новая строка: максимальная ширина блока номера телефона */
  text-decoration: none;
}

.phone-icon:hover {
  background-color: #e6b800;
  border-radius: 3px;
  color: #fff;
}

.brend {
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  color: #555555;
}
.brend:hover {
  color: red;
}
</style>
