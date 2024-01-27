<template>
  <div class="container">
    <el-container>
      <el-aside width="600px">
        <h2 class="heading">Добавить сервисы и услуги</h2>
        <el-form :model="form" ref="serviceForm" :rules="rules" label-width="100px">
          <el-form-item label="Название" prop="serviceName">
            <el-input v-model="form.serviceName" type="textarea"
            placeholder="Введите название" required></el-input>
          </el-form-item>
          <el-form-item label="Короткое описание" prop="shotDesc">
            <el-input v-model="form.shotDesc" 
            placeholder="Введите короткое описание"
            type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="Условия" prop="сonditions">
            <el-input v-model="form.serviceCon" 
            type="textarea"
            placeholder="Введите условия" required></el-input>
          </el-form-item>
          <el-form-item label="Стоимость" prop="price">
            <el-input v-model="form.price" 
            type="textarea"
            placeholder="Введите стоимость" required></el-input>
          </el-form-item>
          <el-form-item label="Оформление услуги" prop="decor">
            <el-input v-model="form.decor" 
            type="textarea"
            placeholder="Введите оформление услуги" required></el-input>
          </el-form-item>
          <el-form-item label="Описание оформления" prop="decorDesc">
            <el-input v-model="form.decorDesc" 
            type="textarea"
            placeholder="Введите описание оформления" 
            style="active-border-color: #f59e0b;"
            required></el-input>
          </el-form-item>
          <el-form-item label="Ссылка на фото" prop="photoLink">
            <el-input v-model="form.photoLink" placeholder="Введите ссылку на фото"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary"
            style="background-color: #f59e0b; border-color: #f59e0b;"
            @click="sendServiceData">Добавить сервис</el-button>
          </el-form-item>
        </el-form>
      </el-aside>

      <el-main>
    <h2 class="heading">Список сервисов</h2>
    <div v-for="service in services" :key="service.id" class="service-item">
      <el-card>
        <el-image :src="service.photo" fit="cover"></el-image>
        <el-row>
          <el-col :span="12">
            <span class="service-name">{{ service.serviceName }}</span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="text" @click="editService(service)">Редактировать</el-button>
            <el-button type="text" @click="deleteService(service.id)">Удалить</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-main>
    </el-container>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { toast } from 'vue3-toastify';
  import { getServices, sendServiceToServer } from '@/server/service'

  export default defineComponent({
    setup() {
      const form = ref({
        serviceName: '',
        shotDesc: '',
        serviceCon: '',
        price: '',
        decor: '',
        decorDesc: '',
        photoLink: '',
      });

      const rules = {
        serviceName: [{ required: true, message: 'Введите название', trigger: 'blur' }],
        serviceCon: [{ required: true, message: 'Введите условия', trigger: 'blur' }],
        price: [{ required: true, message: 'Введите стоимость', trigger: 'blur' }],
        decor: [{ required: true, message: 'Введите оформление услуги', trigger: 'blur' }],
        decorDesc: [{ required: true, message: 'Введите описание оформления', trigger: 'blur' }],
      };



      const sendServiceData = async () => {
        try {
          const requestData = {
            serviceName: form.value.serviceName,
            shotDesc: form.value.shotDesc,
            serviceCon: form.value.serviceCon,
            price: form.value.price,
            decor: form.value.decor,
            decorDesc: form.value.decorDesc,
            photoLink: form.value.photoLink,
          };
          const response = await sendServiceToServer(requestData)
          console.log('Server Response:', response);

          if (response) {
            toast.success('Успешное добавление продукта', { theme: 'colored' });
            
          } else {
            toast.error('Ошибка при добавлении продукта', { theme: 'colored' });
          }
        } catch (error) {
          console.error('Ошибка при отправке продукта:', error);
        }
      
       };
       const services = ref([]);

      onMounted(async () => {
        try {
          services.value = await getServices();
        } catch (error) {
          console.error('Ошибка при получении списка сервисов:', error);
        }
      });

      return {
        form,
        rules,
        sendServiceData,

      };
    },
  });
  </script>

  

<style>
.container {
  padding: 0px 30px 0px;
}

.heading {
  font-size: 1.5rem;
  color: #f59e0b; /* Оранжевый цвет */
  margin-bottom: 1rem;
}

/* Стили для блока "Добавить сервисы и услуги" */
.el-aside {
  width: 400px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
  max-width: none;
  padding: 0.5rem;
  border: 1px solid #f59e0b; /* Оранжевый цвет границы */
  border-radius: 0.375rem;
  outline: none;
  margin-bottom: 1rem;
  background-color: #fff; /* Белый фон */
  color: #f59e0b; /* Оранжевый цвет текста */
}

.el-form {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-label {
  display: block;
  color: #f59e0b; /* Оранжевый цвет текста метки */
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.el-button {
  background-color: #f59e0b;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.el-button:hover {
  background-color: #e67e22; /* Оранжевый цвет при наведении */
}

/* Стили для блока "Список сервисов" */
.el-main {
  padding: 0 30px;
}

.service-item {
  margin-bottom: 20px;
}

.el-card {
  position: relative;
}

.el-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.el-row {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
}

.el-col {
  display: flex;
  align-items: center;
}

.text-right {
  justify-content: flex-end;
}

.edit-button,
.delete-button {
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
  color: #f59e0b; /* Оранжевый цвет текста */
}

.delete-button {
  color: #e53e3e;
}

</style>