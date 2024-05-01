<template>
  <div class="container">
    <el-text size="large">{{ isLoginForm ? "Войти" : "Регистрация" }}</el-text>
    <div class="email-input">
      <input
        ref="emailInput"
        v-if="isLoginForm"
        type="email"
        v-model="form.email"
        class="input"
        placeholder="Email"
        required
      />
      <input
        ref="registrationEmailInput"
        v-else
        type="email"
        v-model="registrationForm.email"
        class="input"
        placeholder="Email"
        required
      />
    </div>

    <div class="password-input">
      <input
        ref="passwordInput"
        v-if="isLoginForm"
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Пароль"
        required
        @focus="moveCursorToMiddle($event)"
      />
      <input
        ref="registrationPasswordInput"
        v-else
        type="password"
        v-model="registrationForm.password"
        class="input"
        placeholder="Пароль"
        required
        @focus="moveCursorToMiddle($event)"
      />
      <input
        ref="registrationConfirmPasswordInput"
        v-if="!isLoginForm"
        type="password"
        v-model="registrationForm.confirmPassword"
        class="input"
        placeholder="Повторите пароль"
        required
        @focus="moveCursorToMiddle($event)"
      />
    </div>

    <div class="name-input" v-if="!isLoginForm">
      <input
        ref="registrationNameInput"
        type="text"
        v-model="registrationForm.name"
        class="input"
        placeholder="Имя"
        required
        @focus="moveCursorToMiddle($event)"
      />
    </div>

    <div class="futer-botton">
      <el-button
        @click="submitForm"
        v-if="isLoginForm"
        type="danger"
        style="border-radius: 20px; margin-bottom: 20px; width: 200px"
        >Войти</el-button
      >
      <el-button
        @click="submitRegistrationForm"
        v-else
        type="danger"
        style="border-radius: 20px; margin-bottom: 20px; width: 200px"
        >Зарегистрироваться</el-button
      >
      <el-button
        @click="toggleForm"
        v-if="isLoginForm"
        type="info"
        plain
        text
        style="border-radius: 20px; margin-bottom: 20px; width: 200px"
        >Регистрация</el-button
      >
      <el-button
        @click="toggleForm"
        v-else
        type="info"
        plain
        text
        style="border-radius: 20px; margin-bottom: 20px; width: 200px"
        >Войти</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { toast } from "vue3-toastify";
import { authenticateWithEmail, registerWithEmail } from "@/server/auth";
const emits = defineEmits(["loggedIn"]);
const isLoginForm = ref(true);

const form = {
  email: "",
  password: "",
};

const registrationForm = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const moveCursorToMiddle = (event) => {
  const input = event.target;
  const length = input.value.length;
  input.setSelectionRange(length / 2, length / 2);
};

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};

const submitRegistrationForm = async () => {
  try {
    if (
      !registrationForm.email ||
      !registrationForm.password ||
      !registrationForm.name ||
      !registrationForm.confirmPassword
    ) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (registrationForm.password !== registrationForm.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    const login = await registerWithEmail(
      registrationForm.email,
      registrationForm.password,
      registrationForm.name
    );

    if (login) {
      sessionStorage.setItem("userToken", JSON.stringify(login));
      emits("loggedIn", login);
      toast.success("Успешная регистрация", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    toast.error("Ошибка регистрации");
  }
};

const submitForm = async () => {
  try {
    if (!form.email && !form.password) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    const login = await authenticateWithEmail(form.email, form.password);

    if (login) {
      sessionStorage.setItem("userToken", JSON.stringify(login));
      toast.success("Успешный вход", { theme: "colored" });
      emits("loggedIn", login);
    } else {
      toast.error("Такой пользователь не найден", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка входа:", error);
    toast.error("Ошибка входа");
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  border: none;
  outline: none;
  font-size: 22px;
  background-color: rgb(247, 244, 249);
  border-radius: 20px;
  margin-bottom: 20px;
}

.back-arrow {
  cursor: pointer;
  margin-top: 20px;
}

.futer-botton {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>
