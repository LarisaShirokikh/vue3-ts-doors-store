<template>
  <nav class="nav">
    
      <template v-if="isLoggedIn">
        <div class="relative">
          <div @click="toggleMenu" class="menu-title">
            <div class="avatar">
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="Аватар" />
            </div>
            Мой профиль
          </div>
          <div v-if="isOpenMenu" class="menu" ref="menu">
            <a @click="handleCommand('video')">
                <i class="far fa-user fa-lg"></i>
                <span>Добавить видео</span>
              </a>
            <a @click="handleCommand('profile')">
              <i class="far fa-user fa-lg"></i>
              <span>Добавить каталог</span>
            </a>
            <a @click="handleCommand('addProduct')">
                <i class="far fa-user fa-lg"></i>
                <span>Добавить карточку</span>
              </a>
              <a @click="handleCommand('addServices')">
                  <i class="far fa-user fa-lg"></i>
                  <span>Добавить сервис</span>
                </a>
            <a @click="handleCommand('addFile')">
              <i class="far fa-file fa-lg"></i>
              <span>Загрузить из файла</span>
            </a>
            <a @click="handleCommand('addReview')">
                <i class="far fa-file fa-lg"></i>
                <span>Добавить отзыв</span>
              </a>
            <a @click="handleCommand('logout')">
              <i class="fas fa-sign-out fa-lg"></i>
              <span>Выйти</span>
            </a>
          </div>
        </div>
      </template>
      <!-- Условный рендеринг для незалогиненного пользователя -->
      <template v-else>
        <div class="login">
          <router-link to="/login" class="">Войти</router-link>
          <span>/</span>
          <router-link to="/register" class="">Регистрация</router-link>
        </div>
      </template>
    <!-- </div> -->
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authenticateUser } from '../../server/auth';
import router from '@/router/router';

export default defineComponent({
  name: 'NavbarComponent',
  data() {
    return {
      isLoggedIn: false,
      isOpenMenu: false,
      menuPosition: { top: '100%', left: '0' },
    };
  },
  methods: {
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
      this.calculateMenuPosition();
    },
    handleCommand(command: string) {
      if (command === 'addFile') {
        console.log('Загрузить из файла');
      } else if (command === 'profile') {
        console.log('Мой профиль');
        this.calculateMenuPosition();
        router.push('/profile');
      }  else if (command === 'video') {
        console.log('video');
      router.push('/addVideo');
      } else if (command === 'addProduct') {
        console.log('добавить карточку');
        router.push('/addProduct');
        } else if (command === 'addServices') {
        console.log('добавить сервис');
        router.push('/addServices');
        } else if (command === 'addReview') {
        console.log('добавить отзыв');
        router.push('/addReview');
      } else if (command === 'logout') {
        console.log('Выйти');
      }
    },
    calculateMenuPosition() {
      this.$nextTick(() => {
        const menu = this.$refs.menu as HTMLElement;
        const avatar = this.$refs.avatar as HTMLElement;

        if (menu && avatar) {
          const avatarRect = avatar.getBoundingClientRect();
          const menuRect = menu.getBoundingClientRect();
          const screenWidth = window.innerWidth;

          if (avatarRect.right + menuRect.width > screenWidth) {
            this.menuPosition = { top: '0', left: `-${menuRect.width - avatarRect.width}px` };
          } else {
            this.menuPosition = { top: '100%', left: '0' };
          }
        }
      });
    },
    checkLoggedIn() {
      const storedToken = sessionStorage.getItem('userToken');

      if (storedToken) {
        const tokenData = JSON.parse(storedToken);
        const token = tokenData.token;

        authenticateUser(token).then((isAuthenticated) => {
          if (isAuthenticated === true) {
            this.isLoggedIn = true;
          }
        });
      }
    },
  },
  mounted() {
    this.checkLoggedIn();
    window.addEventListener('resize', this.calculateMenuPosition);
  },
  watch: {
    '$store.getters.getUser'() {
      this.checkLoggedIn();
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateMenuPosition);
  },
});
</script>


<style scoped>
.login {
  color: #555555;
}
.nav {
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

.menu {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: none;
}

.relative:hover .menu {
  display: block;
}

.menu-title {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu a {
  display: flex;
  align-items: center;
  padding: 8px 0 8px;
  color: #000;
  text-decoration: none;
}

.menu a i {
  margin-right: 10px;
}

.menu a:hover {
  background-color: #e6e6e6;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.router-link h3 {
  text-decoration: none;
}

.router-link:hover {
  color: #d91111;
}
</style>
