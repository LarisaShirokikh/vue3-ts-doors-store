<template>
  <div>
    <el-form-item v-if="!isLoginForm" label="E-mail" prop="email">
      <el-input
        v-model="form.email"
        autocomplete="off"
        style="border: none"
        required
        active-border-color="#ff0000"
      />
    </el-form-item>
    
    
    <el-form-item label="Телефон" prop="phone">
      <el-input
        v-model.number="form.phone"
        autocomplete="off"
        style="border: none"
        required
        active-border-color="#ff0000"
      />
    </el-form-item>
    <template v-if="!confirmationRequired">
      <el-button type="danger" @click="submitForm">{{ isLoginForm ? "Получить код" : "Зарегистрироваться" }}</el-button>
      <span v-if="isLoginForm" @click="toggleForm" style="padding: 20px">Регистрация</span>
      <span v-if="!isLoginForm" @click="toggleForm" style="padding: 20px">Войти</span>
    </template>
    <template v-else>
      <div v-for="index in 6" :key="index">
        <el-input
          v-model="confirmationCode[index - 1]"
          placeholder="Код"
          maxlength="1"
          required
          active-border-color="#ff0000"
        ></el-input>
      </div>
      <el-button @click="submitConfirmationCode">Подтвердить</el-button>
    </template>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { toast } from 'vue3-toastify';
import router from '@/router/router';
import {
  authenticateWithPhone,
  confirmRegistration,
} from '@/server/auth';

const confirmationRequired = ref(false);
const confirmationCode = ref(Array(6).fill(''));

const form = reactive({
  email: '',
  phone: '',
});

const isLoginForm = ref(true);

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};

const submitForm = async () => {
  try {
    if (isLoginForm.value) {
      if (!form.phone) {
        toast.error('Пожалуйста, заполните поле "Телефон"');
        return;
      }
      const data = await authenticateWithPhone(form.phone);
      if (data) {
        sessionStorage.setItem("userToken", JSON.stringify(data));
        toast.success("Успешный вход", { theme: "colored" });
        router.push("/");
      } else {
        toast.error("Такой пользователь не найден", { theme: "colored" });
      }
    } else {
      if (!form.email || !form.phone) {
        toast.error('Пожалуйста, заполните все обязательные поля');
        return;
      }
      const userData = await authenticateWithPhone(form.email, form.phone);
      if (userData) {
        sessionStorage.setItem("userToken", JSON.stringify(userData));
        toast.success("Успешный вход", { theme: "colored" });
        router.push("/");
      } else {
        toast.error("Такой пользователь не найден", { theme: "colored" });
      }
    }
  } catch (error) {
    console.error('Ошибка входа/регистрации:', error);
    toast.error('Ошибка входа/регистрации');
  }
};

const submitConfirmationCode = async () => {
  try {
    const isSuccess = await confirmRegistration(
      form.email,
      confirmationCode.value.join('')
    );
    if (isSuccess) {
      toast.success('Вы успешно зарегистрированы!');
      router.push('/myProfile');
    } else {
      toast.error('Код подтверждения неверный');
    }
  } catch (error) {
    console.error('Ошибка подтверждения регистрации:', error);
    toast.error('Ошибка подтверждения регистрации');
  }
};
</script>
