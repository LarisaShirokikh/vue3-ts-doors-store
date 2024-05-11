<template>
  <div class="navbar">
    <div class="brand-container">
      <template v-if="shouldShowExpandIcon">
        <Menu class="menu-icon" @click="toggleIcon" />
      </template>

      <a-drawer
        :open="open"
        @close="onClose"
        :placement="placement"
        :width="500"
        border-radius="20px"
        @update:open="expanded = $event"
      >
        <div>
          <menu-left class="dropdown-menu"></menu-left>
        </div>
      </a-drawer>

      <router-link to="/" class="brand-title">Двери Эталон</router-link>
    </div>

    <div class="contact-info" v-if="shouldShowExpandIcon" @click="phoneClick">
      <Phone class="phone-icon" />
    </div>
    <div class="contact-info" v-else @click="phoneClick">
      <span class="phone-number">+7 (926) 021-73-65</span>
    </div>

    <div class="auth-container">
      <a-text v-if="!loggedIn" @click="handleButtonClick" class="auth-link">
        <Plus class="auth-icon" />
        Войти
      </a-text>
      <a-text v-if="loggedIn" class="user-info">
        <a-avatar
        v-if="user.avatar"
        :src="user.avatar"
        alt="Аватарка"
        class="user-avatar"
        >
        <User class="auth-icon" />
      </a-avatar>
      <User v-else class="auth-icon" />
      <router-link :to="{ path: '/myProfile' }" class="email-link">
        {{ user.email }}
      </router-link>
      </a-text>
      <a-button
        v-if="loggedIn"
        @click="logout"
        dashed
        type="link"
        class="logout-button"
      >
        <LogOut class="auth-icon" />
      </a-button>
    </div>
  </div>

  <a-drawer v-model:open="dialogFormVisible" class="login-drawer">
    <LoginForm :loggedIn="loggedIn" @loggedIn="handleLoginFormSubmit" />
  </a-drawer>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { Menu, Phone, Plus, LogOut, User } from "lucide-vue-next";
import AuthService from "@/server/auth";
import router from "@/router/router";
import MenuLeft from "./Menu-left.vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import type { DrawerProps } from "ant-design-vue";

const authService = new AuthService();
const placement = ref<DrawerProps["placement"]>("left");
const open = ref<boolean>(false);
const loggedIn = ref(false);
const dialogFormVisible = ref(false);
const expanded = ref(false);

const user = reactive({
  email: "",
  avatar: "",
});

const checkWindowWidth = () => {
  return window.innerWidth < 768;
};

const shouldShowExpandIcon = ref(checkWindowWidth());
window.addEventListener("resize", () => {
  shouldShowExpandIcon.value = checkWindowWidth();
});

const handleLoginFormSubmit = (login: any) => {
  dialogFormVisible.value = false;
  loggedIn.value = true;
  user.email = login.email;
};

const logout = () => {
  sessionStorage.removeItem("userToken");
  loggedIn.value = false;
  user.email = "";
};

const toggleIcon = () => {
  open.value = !open.value;
  expanded.value = !expanded.value;
};

const onClose = () => {
  open.value = false;
};

const phoneClick = () => {
  // Your logic for phone click
};

const handleButtonClick = () => {
  if (!loggedIn.value) {
    dialogFormVisible.value = true;
  } else {
    router.push("/myProfile");
  }
};

const checkLoggedIn = async () => {
  const storedToken = sessionStorage.getItem("userToken");

  if (storedToken) {
    const tokenData = JSON.parse(storedToken);
    const token = tokenData.token;

    try {
      const isAuthenticated = await authService.authenticateUser(token);
      if (isAuthenticated) {
        loggedIn.value = true;
        user.email = tokenData.email;
      }
    } catch (error) {
      console.error("Ошибка аутентификации:", error);
    }
  }
};

onMounted(() => {
  checkLoggedIn();
});
</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-container {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: 24px;
  margin-left: 10px;
  color: #F56C6C;
}

.menu-icon {
  color: #606266;
}

.contact-info {
  display: flex;
  align-items: center;
}

.phone-icon {
  font-size: 24px;
  color: #606266;
}

.phone-number {
  font-size: 20px;
  color: #606266;
  cursor: pointer;
}

.auth-container {
  display: flex;
  align-items: center;
}

.auth-link,
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}


.email-link {
  color: inherit;
  text-decoration: none; 
  cursor: pointer;
}

.auth-icon {
  margin-right: 5px;
  color: #606266;
}

.logout-button {
  margin-left: 8px;
  color: #606266;
}

.user-avatar {
  margin-left: 8px; /* Отступ слева, если есть аватар */
  margin-right: 5px; /* Отступ справа, если есть аватар */
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.login-drawer {
  border-radius: 30px;
  height: 100%;
}
</style>
