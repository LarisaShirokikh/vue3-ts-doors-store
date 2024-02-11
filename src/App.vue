<template>
  <div
    class="common-layout"
    id="app"
    style="
      background-color: #f0f0f0;
      padding: 10px;
      box-sizing: border-box;
      height: 100vh;
      position: relative;
    "
  >
    <el-container>
      <el-space direction="vertical">
        <el-aside
          v-if="showSidebars"
          width="250px"
          :span="4"
          style="
            border-radius: 15px;
            margin-left: 5px;
            background-color: white;
            margin-right: 15px;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <el-link href="/">
            <span class="text-x-large center font-600 mr-3"> Title </span>
          </el-link>
        </el-aside>

        <el-aside
          v-if="showSidebars"
          width="250px"
          :span="4"
          style="
            border-radius: 15px;
            margin-left: 5px;
            background-color: white;
            margin-right: 15px;
          "
        >
          <menu-left></menu-left>
        </el-aside>
      </el-space>

      <el-main
        style="
          padding: 10px;
          border-radius: 15px;
          background-color: white;
          overflow-y: auto;
        "
      >
      <div
       style="
              border-radius: 15px;
              margin: 5px;
              background-color: white;
              width: 100%;
              height: 50px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
      >
        <div style="display: flex; align-items: center; width: 50%">
          <el-icon style="font-size: 34px; margin: 10px; color: #606266"
            ><ArrowDownBold 
          /></el-icon>
          <el-link href="/"> BREND </el-link>
        </div>
        

          <div
            v-if="!showSidebars"
            @click="handleButtonClick"
            link
            class="login-button-main"
            style="
              border-radius: 15px;
              margin: 5px;
              background-color: white;
              width: 100%;
              height: 50px;
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
      
        <search-input />
        <router-view />
      </el-main>

      <el-space direction="vertical">
        <el-button
          v-if="showSidebars"
          @click="handleButtonClick"
          link
          :span="4"
          class="login-button"
          style="
            border-radius: 15px;
            margin-left: 15px;
            background-color: white;
            margin-right: 5px;
            width: 300px;
            height: 50px;
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

        <el-aside
          v-if="showSidebars"
          width="300px"
          :span="4"
          style="
            border-radius: 15px;
            margin-left: 15px;
            background-color: white;
            margin-right: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <carusel-right></carusel-right>
        </el-aside>
      </el-space>
    </el-container>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { authenticateUser } from "@/server/auth";
import MenuLeft from "@/components/Menu-left.vue";
import CaruselRight from "@/components/Carusel-Right.vue";
import SearchInput from "@/components/Search-input.vue";
import FooterComponent from "./components/Footer-component.vue";
import { ArrowDownBold, User } from "@element-plus/icons-vue";
import { authenticateWithEmailPassword } from "@/server/auth";
import router from "@/router/router";
import { toast } from "vue3-toastify";

const loggedIn = ref(false);
const dialogFormVisible = ref(false);
// const formLabelWidth = '140px'

const screenWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const showSidebars = computed(() => {
  return screenWidth.value >= 1300;
});

// const showLoginButton = computed(() => {
//   return screenWidth.value >= 1300;
// });

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
body {
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 1300px) {
  .common-layout .el-aside,
  .common-layout .login-button {
    display: none;
  }

  .common-layout .login-button-main {
    display: flex;
  }

  .common-layout .el-main {
    width: 100%;
  }
}

@media screen and (min-width: 1300px) {
  .common-layout .login-button-main {
    display: none;
  }

  .common-layout .el-aside,
  .common-layout .login-button {
    display: flex;
  }
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  overflow-y: auto;
}
</style>
