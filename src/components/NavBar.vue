<template>
  <a-space
    class="navbar"
    style="
      width: auto;
      padding: 10px;
      border-radius: 15px;
      background-color: white;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    "
  >
    <a-space style="display: flex; align-items: center">
      <template v-if="shouldShowExpandIcon">
        <icon
          style="
            font-size: 34px;
            margin: 10px;
            margin-right: 30px;
            color: #606266;
            border: none;
            cursor: pointer;
          "
          @click="toggleIcon"
        >
          <template v-if="!expanded">
            <MenuOutlined />
          </template>
          <template v-else>
            <CloseOutlined />
          </template>
        </icon>
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

      <a-button type="link" href="/" danger class="title">
        Двери Эталон
      </a-button>
    </a-space>

    <div v-if="shouldShowExpandIcon" link @click="phoneClick">
      <el-icon style="font-size: 34px; color: #333">
        <PhoneOutlined />
      </el-icon>
    </div>
    <div v-if="!shouldShowExpandIcon" link @click="phoneClick">
      <a-space style="font-size: 12px; color: #333">+7 (999) 999 99 99</a-space>
    </div>

    <el-button
      v-if="showSidebars"
      @click="handleButtonClick"
      link
      :span="4"
      class="login-button"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      "
    >
      <a-text v-if="!loggedIn">Войти</a-text>
      <a-text v-else>{{ user.email }}</a-text>
      <img :src="user.avatar" alt="Аватарка" v-if="user.avatar" />
    </el-button>

    <div
      v-if="!showSidebars"
      @click="handleButtonClick"
      link
      class="login-button-main"
      style="
        border-radius: 15px;
        margin: 5px;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      "
    >
      <icon size="large" color="#f56c6c" class="no-inherit">
        <UserOutlined />
      </icon>
      <a-text size="large" style="margin: 10px">
        {{ loggedIn ? user.email : "Войти" }}
      </a-text>

      <img
        v-if="user.avatar"
        :src="user.avatar"
        alt="Аватарка"
        style="margin-left: 10px"
      />
      <el-text v-if="loggedIn" @click="logout">/ Выйти</el-text>
    </div>
  </a-space>
  <el-space direction="vertical">
    <el-drawer
      v-model="dialogFormVisible"
      size="40%"
      style="border-radius: 30px; height: 600px"
    >
      <LoginForm :loggedIn="loggedIn" @loggedIn="handleLoginFormSubmit" />
    </el-drawer>
  </el-space>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, computed } from "vue";
import { ElDrawer } from "element-plus";
import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import { authenticateUser } from "@/server/auth";
import router from "@/router/router";
import MenuLeft from "./Menu-left.vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import type { DrawerProps } from "ant-design-vue";
const placement = ref<DrawerProps["placement"]>("left");
const open = ref<boolean>(false);
const loggedIn = ref(false);
const dialogFormVisible = ref(false);
const menuOpened = ref(false);
const expanded = ref(false);
const screenWidth = ref(window.innerWidth);

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

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
  showDrawer();
  expanded.value = !expanded.value;
};

// Функция для проверки ширины экрана
const checkWindowWidth = () => {
  return window.innerWidth < 1300;
};
const shouldShowExpandIcon = ref(checkWindowWidth());

const showSidebars = computed(() => {
  return screenWidth.value >= 1300;
});

// Обновление показа иконки при изменении ширины окна
window.addEventListener("resize", () => {
  shouldShowExpandIcon.value = checkWindowWidth();
});

// Закрываем меню при клике вне его области
window.addEventListener("click", (event) => {
  if (!event.target.closest(".navbar")) {
    menuOpened.value = false;
  }
});

const user = reactive({
  email: "",
  avatar: "",
});
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
      const isAuthenticated = await authenticateUser(token);
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
  console.log("Component is mounted loggin");
  checkLoggedIn();
});
</script>

<style>
.dropdown-menu {
  font-size: 36px;
}

.title {
  font-size: 30px;
  text-decoration: none;
}
</style>
