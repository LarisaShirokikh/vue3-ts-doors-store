<template>
  <div class="container"> 
    <template v-if="!confirmationRequired">
      <h3>телефон</h3>
      <div v-if="!isPhoneInputHidden" class="phone-input">
        <input
        ref="phoneInput"
          type="tel"
      v-model="form.phone"
      @input="formatPhoneNumber"
          class="input"
          required
          pattern="[0-9]*"
          maxlength="12"
        />
      </div>
      
      <!-- Квадратики-чекбоксы для ввода цифр -->
      <template v-else>
        <div>
          <el-input
            v-for="(digit, index) in form.phone.toString()"
            :key="index"
            v-model="form.phone[index]"
            placeholder="Цифра"
            maxlength="6"
            required
            style="border: none"
          ></el-input>
        </div>
      </template>
      
      <!-- Кнопка отправки формы или подтверждения кода -->
      <el-button type="danger" @click="submitForm">
        {{ isLoginForm ? "Получить код" : "Зарегистрироваться" }}
      </el-button>
      <span v-if="isLoginForm" @click="toggleForm" style="padding: 20px">Регистрация</span>
      <span v-else @click="toggleForm" style="padding: 20px">Войти</span>
    </template>
    
    <!-- Поля для ввода кода подтверждения и кнопка подтверждения кода -->
    <template v-else>
        <span class="back-arrow" @click="confirmationRequired = false">&#8592; Назад</span>
      <div :key="index">
        <el-input
          v-model="confirmationCode[index - 1]"
          placeholder="Код"
          maxlength="1"
          required
          style="border: none"
        ></el-input>
      </div>
      <el-button @click="submitConfirmationCode">Подтвердить</el-button>
    </template>
  </div>
</template>

<script setup>
import { ref,reactive} from 'vue';
import { toast } from 'vue3-toastify';
import router from '@/router/router';
import {
  authenticateWithPhone,
  confirmRegistration, sendConfirmCode
} from '@/server/auth';

const confirmationRequired = ref(false);
const confirmationCode = ref(Array(6).fill(''));
const isPhoneInputHidden = ref(false);
const isLoginForm = ref(true);
const code= ref('')

const form = reactive({
  email: '',
  phone: '+7',
});



const formatPhoneNumber = (event) => {
  const value = event.target.value;
  form.phone = value.startsWith('+') ? '+' + value.replace(/\D/g, '') : value.replace(/\D/g, '');
form.phone = event.target.value;
};

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
      const data = await authenticateWithPhone(!form.phone.toString());
      confirmationRequired.value = true;
      isPhoneInputHidden.value = true;
      const confirmCode = await sendConfirmCode(code)
      if (confirmCode) {
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем элементы по горизонтали */
}

.phone-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  border: none; /* Убираем бордер */
  outline: none; /* Убираем обводку при фокусе */
  font-size: 32px;
}

.back-arrow {
  cursor: pointer;
  margin-top: 20px;
}
</style>