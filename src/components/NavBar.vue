<template>
  <div
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
    <div style="display: flex; align-items: center; ">
      <el-icon
        @click="toggleMenu"
        style="font-size: 44px; 
        margin: 10px; 
        margin-right: 30px;
        color: #606266"
        ><Expand
      /></el-icon>
      <el-link 
      type="danger"
      :underline="false"
      href="/" 
      style="font-size: 34px;
      
      
      "> <h1>Двери Эталон</h1> </el-link>
    </div>

    <div v-if="menuOpened" class="dropdown-menu" @click.stop=""> 
      <menu-left></menu-left>
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
      "
    >
      <span v-if="!loggedIn">Войти</span>
      <span v-else>{{ user.email }}</span>
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
      <el-icon style="font-size: 24px"><User /></el-icon>
      <span v-if="!loggedIn" style="margin: 10px">Войти</span>
      <span v-if="loggedIn" style="margin: 10px">{{ user.email }}</span>
      <img
        v-if="user.avatar"
        :src="user.avatar"
        alt="Аватарка"
        style="margin-left: 10px"
      />
    </div>
  </div>
  <el-space direction="vertical">
    <el-dialog v-model="dialogFormVisible">
      <div>
        <el-input
          v-model="form.email"
          placeholder="Логин"
          autocomplete="off"
          style="border: none"
        />
        <el-input
          v-model="form.password"
          placeholder="Пароль"
          type="password"
          autocomplete="off"
          style="border: none"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Отмена</el-button>
          <el-button type="primary" @click="submitForm">Войти</el-button>
        </span>
      </template>
    </el-dialog>
  </el-space>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { User, Expand } from "@element-plus/icons-vue";
import { authenticateWithEmailPassword, authenticateUser } from "@/server/auth";
import router from "@/router/router";

const loggedIn = ref(false);
const dialogFormVisible = ref(false);
const menuOpened = ref(false);

// Закрываем меню при клике вне его области
window.addEventListener('click', (event) => {
  if (!event.target.closest('.navbar')) {
    menuOpened.value = false;
  }
});

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value;
};

const form = reactive({
  email: "",
  password: "",
});

const user = reactive({
  email: "",
  avatar: "",
});
const handleButtonClick = () => {
  if (!loggedIn.value) {
    // Пользователь не вошел в систему, отобразить диалоговое окно входа
    dialogFormVisible.value = true;
  } else {
    // Пользователь вошел в систему, перейти на страницу профиля
    router.push("/myProfile");
  }
};

const checkLoggedIn = () => {
  const storedToken = sessionStorage.getItem("userToken");

  if (storedToken) {
    const tokenData = JSON.parse(storedToken);
    const token = tokenData.token;

    authenticateUser(token).then((isAuthenticated) => {
      if (isAuthenticated === true) {
        loggedIn.value = true;
        user.email = tokenData.email;
      }
    });
  }
};
onMounted(() => {
  console.log("Component is mounted loggin");
  checkLoggedIn();
});

const submitForm = async () => {
  if (!form) return;

  try {
    const userData = await authenticateWithEmailPassword(
      form.email,
      form.password
    );
    console.log("userData", form.email, form.password);
    if (userData) {
      sessionStorage.setItem("userToken", JSON.stringify(userData));
      const storedToken = sessionStorage.getItem("userToken");
      console.log("stored token", storedToken);
      user.email = userData.email;
      dialogFormVisible.value = false;
      toast.success("Успешный вход", { theme: "colored" });
      console.log("Успешный вход:", form.email);
    } else {
      console.error("Токен не верифицирован");
      toast.error("Такой пользователь не найден", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка входа:", error);
    if (error.response) {
      console.log("Данные ответа сервера:", error.response.data);
      console.log("Статус код:", error.response.status);
    }
  }
};
</script>

<style>
.dropdown-menu {
  position: absolute; /* Используем абсолютное позиционирование для правильного отображения меню */
  top: calc(100% + 10px); /* Располагаем меню под иконкой */
  left: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Устанавливаем z-index для меню поверх других элементов */
}
</style>
