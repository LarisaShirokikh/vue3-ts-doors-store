<template>
  <nav class="bg-white p-2">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="text-gray-700 text-xl font-semibold ml-4 hover:text-red-500">
        Двери Эталон
      </router-link>
      <template v-if="isLoggedIn">
        <div class="relative">
          <div @click="toggleMenu" class="menu-title cursor-pointer">
            <div class="avatar">
              <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="Аватар" />
            </div>
            Мой профиль
          </div>
          <div v-if="isOpenMenu" class="menu" ref="menu">
            <a @click="handleCommand('profile')">
              <i class="far fa-user fa-lg"></i>
              <span>Открыть профиль</span>
            </a>
            <a @click="handleCommand('addFile')">
              <i class="far fa-file fa-lg"></i>
              <span>Загрузить из файла</span>
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
        <div class="flex items-center space-x-4 ml-auto text-gray-700">
          <router-link to="/login" class="hover:text-red-500">Войти</router-link>
          <span>/</span>
          <router-link to="/register" class="hover:text-red-500">Регистрация</router-link>
        </div>
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authenticateUser } from '../server/auth';
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
  padding: 8px 0;
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
</style>
