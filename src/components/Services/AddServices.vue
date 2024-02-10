<template>
  <div class="container">
    <div>
      <h2 class="heading">Добавить сервисы и услуги</h2>
      <form @submit.prevent="sendServiceData" class="form">
        <label for="serviceName" class="label">Название сервиса:</label>
        <input
          v-model="serviceName"
          type="text"
          id="serviceName"
          class="input"
          required
        />

        <label for="shotDesc" class="label">Короткое описание</label>
        <input v-model="shotDesc" type="text" id="shotDesc" class="input" />

        <label for="сonditions" class="label">Условия</label>
        <input
          v-model="serviceCon"
          type="textarea"
          class="input"
          id="сonditions"
        />

        <label for="price" class="label">Стоимость от</label>
        <input v-model="price" type="text" class="input" required />

        <label for="decor" class="label">Оформление услуги</label>
        <input v-model="decor" type="textarea" class="input" required />

        <label for="decorDesc" class="label">Описание оформления</label>
        <input v-model="decorDesc" type="textarea" class="input" required />

        <label for="servicePhoto" class="label">Загрузить фото:</label>
        <input
          type="file"
          id="servicePhoto"
          @change="handleServicePhotoChange"
          accept="image/*, .png, .jpg, gif, .web,"
          class="input"
        />
        <img
          v-if="servicePhotoPreview"
          :src="servicePhotoPreview"
          alt="Предворительный просмотр фото"
          class="service-preview"
          style="max-width: 80px; max-height: 80px;"
        />

        <button type="submit" class="button">Добавить сервис</button>
      </form>
    </div>

    <div>
      <h2 class="heading">Список сервисов</h2>

      <el-table :data="services" :key="index" style="width: 100%" >
      <el-table-column prop="id" label="id" width="50"/>
      <el-table-column label="Фото" width="100">
        <template v-slot="scope">
          <img
            :src="photoUrl(scope.row.photo[0])"
            :alt="scope.row.name"
            style="max-width: 80px; max-height: 80px;"
          />
        </template>
      </el-table-column>
      <el-table-column prop="serviceName" label="Название" />
      <el-table-column label="Действия" width="100">
        <template v-slot="scope">
          <el-button
            v-if="!isEditing(scope.row.id)"
            @click="startEditing(scope.row.id)"
            icon="el-icon-edit"
            circle
            size="small"
            type="primary"
          ></el-button>
          <el-button
            v-if="isEditing(scope.row.id)"
            @click="saveChanges(scope.row.id)"
            icon="el-icon-check"
            circle
            size="small"
            type="success"
          ></el-button>
          <el-button
            v-if="isEditing(scope.row.id)"
            @click="cancelEditing(scope.row.id)"
            icon="el-icon-close"
            circle
            size="small"
            type="danger"
          ></el-button>
          <el-button
            @click="deleteCatalog(scope.row.id)"
            icon="el-icon-delete"
            circle
            size="small"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
    
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { getServices, sendServiceToServer } from "@/server/service";

const serviceName = ref("");
const shotDesc = ref("");
const serviceCon = ref("");
const price = ref("");
const decor = ref("");
const decorDesc = ref("");
const servicePhoto = ref<File | null>(null);
const servicePhotoPreview = ref<string | null>(null);
//const services = ref<Array<any>>([]);
const editedServiceId = ref<number | null>(null);
const editedServiceName = ref<string>("");
//const editedServicePhoto = ref<File | null>(null);

const isEditing = (serviceId: number) => serviceId === editedServiceId.value;

const startEditing = (serviceId: number) => {
  editedServiceId.value = serviceId;
  editedServiceName.value =
    services.value.find((service) => service.id === serviceId)?.name || "";
};

    const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};
const handleServicePhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    servicePhoto.value = file;
    servicePhotoPreview.value = URL.createObjectURL(file);
  }
};

console.log("serviceName.value:", serviceName.value);
console.log("servicePhoto.value:", servicePhoto.value);

const sendServiceData = async () => {
  console.log("Функция sendServiceData вызвана");
  try {
    if (!serviceName.value || !servicePhoto.value) {
      console.log("Не все данные заполнены");
      return;
    }
    const formData = new FormData();
    formData.append("serviceName", serviceName.value);
    formData.append("shotDesc", shotDesc.value);
    formData.append("serviceCon", serviceCon.value);
    formData.append("price", price.value);
    formData.append("decor", decor.value);
    formData.append("decorDesc", decorDesc.value);
    const photo = servicePhoto.value;
    if (photo) {
      formData.append("photo", photo, photo.name);
    }

    console.log("Отправляю данные на сервер:", formData);
    const response = await sendServiceToServer(formData);
    console.log("Server Response:", response);

    if (response) {
      toast.success("Успешное добавление продукта", { theme: "colored" });
    } else {
      toast.error("Ошибка при добавлении продукта", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при отправке продукта:", error);
  }
};
const services = ref([]);

onMounted(async () => {
  try {
    services.value = await getServices();
  } catch (error) {
    console.error("Ошибка при получении списка сервисов:", error);
  }
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
