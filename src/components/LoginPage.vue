<template>
  <el-form :model="ruleForm" label-position="left" class="demo-ruleForm">
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" placeholder="Введите email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="ruleForm.password" placeholder="Введите пароль"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Войти</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script setup>
    import { reactive } from 'vue';
    import { authenticateWithEmailPassword } from '../server/auth';
    import { toast } from 'vue3-toastify';
    import router from '@/router/router';
  


  const ruleForm = reactive({
    email: '',
    password: '',
  });
  
  

  const submitForm = async () => {
    if (!ruleForm) return
    
        try {
          const userData = await authenticateWithEmailPassword(ruleForm.email, ruleForm.password);
          console.log('userData', ruleForm.email, ruleForm.password)
          if (userData) {
            sessionStorage.setItem('userToken', JSON.stringify(userData));
            const storedToken = sessionStorage.getItem('userToken');
            console.log('stored token', storedToken);
            toast.success('Успешный вход', { theme: 'colored' });
            console.log('Успешный вход:', ruleForm.username);
            router.push('/');
          } else {
            console.error('Токен не верифицирован');
            toast.error('Такой пользователь не найден', { theme: 'colored' });
            router.push('/register');
          }
        } catch (error) {
          console.error('Ошибка входа:', error);
          if (error.response) {
            console.log('Данные ответа сервера:', error.response.data);
            console.log('Статус код:', error.response.status);
          }
        }
     
    }
  
  // const resetForm = (formEl) => {
  //   if (!formEl) return
  //   formEl.resetFields()
  // }

    


  </script>
  
  <style scoped>
  /* Добавьте стили по вашему усмотрению */
  </style>
  