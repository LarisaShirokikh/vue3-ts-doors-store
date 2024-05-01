<template>
  <div>
    <h2 class="heading">Список продуктов</h2>

    <el-table
      :data="products"
      :key="index"
      style="width: 100%; max-height: 800px; overflow-y: auto"
      :page-size="5"
    >
      <el-table-column prop="id" label="id" width="40" />
      <el-table-column prop="createdAt" label="Дата" sortable width="100" />
      <el-table-column label="Фото" width="100">
        <template v-slot="scope">
          <img
            :src="photoUrl(scope.row.photo[0])"
            :alt="scope.row.name"
            style="max-width: 80px; max-height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Название" />
      <el-table-column type="selection" width="55" />
      <el-table-column prop="newPrice" label="Цена" width="100"/>
      <el-table-column label="Действия" width="100">
        <template v-slot="scope">
          <el-button
            @click="(drawer = true), startEditing(scope.row)"
            :icon="Edit"
            circle
            size="small"
            type="primary"
          ></el-button>
          <el-button
            @click="deleteProduct(scope.row.id)"
            :icon="Delete"
            circle
            size="small"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      v-model="drawer"
      size="50%"
      :visible="editDrawerVisible"
      @close="editDrawerVisible = false"
      direction="rtl"
    >
      <div class="form">
        <form :model="editedProduct" ref="editedProductForm" label-width="80px">
          <label for="productName" class="label">Название раздела:</label>
          <input
            v-model="editedProduct.name"
            type="text"
            id="productName"
            class="input"
            required
          />

          <label for="description" class="label">Описание:</label>
          <textarea
            v-model="editedProduct.description"
            rows="4"
            id="description"
            class="input"
            required
          ></textarea>

          <!-- Отображение текущего фото и возможность его удалить -->
          <label class="label">Текущее фото:</label>
          <div class="foto">

            <img
              v-if="editedProduct.photo"
              :src="editedProduct.photo"
              class="avatar"
              style="max-width: auto; max-height: 100px"
            />
            <el-button
              v-if="editedProduct.photo"
              style="margin: 10px"
              @click="removePhoto"
              type="danger"
              >Удалить фото
            </el-button>
          </div>

          <label for="productPhoto" class="label">Загрузить фото:</label>
          <input
            type="file"
            id="productPhoto"
            @change="handleProductPhotoChange"
            accept="image/*, .png, .jpg, gif, .web,"
            class="input"
          />
          <label for="photoLink" class="label">Ссылка на фото:</label>
          <input
            v-model="photoLink"
            type="text"
            id="photoLink"
            class="input"
            @input="loadPhotoFromLink"
          />
          <img
            v-if="productPhotoPreview"
            :src="productPhotoPreview"
            alt="Предворительный просмотр фото каталога"
            class="product-preview"
            style="
              width: 150px;
              height: 100px;
              margin: 10px;
              border-radius: 15px;
            "
          />
        </form>

        <div class="dialog-footer">
          <el-button @click="drawer = false">Отменить</el-button>
          <el-button type="danger" @click="saveChanges">Сохранить</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import {
  deleteProductId,
  getProducts,
  updateProduct,
} from "@/server/product";
import { toast } from "vue3-toastify";
import { ElTable } from 'element-plus'
import { Delete, Edit } from "@element-plus/icons-vue";
//const newPriceForAllProducts = ref(0);
const drawer = ref(false);
const productPhoto = ref(null);
const productPhotoPreview = ref(null);
const products = ref([]);
const photoLink = ref("");
const editDrawerVisible = ref(false);
const props = defineProps({
  productAddedCount: Number
});

const removePhoto = () => {
  editedProduct.value.photo = null;
};

const editedProduct = ref({
  id: null,
  name: "",
  description: "",
  photo: null,
});

const loadPhotoFromLink = () => {
  if (photoLink.value.trim() !== "") {
    productPhotoPreview.value = photoLink.value.trim();
  } else {
    productPhotoPreview.value = null;
  }
};

const startEditing = (product) => {
  editedProduct.value.id = product.id;
  editedProduct.value.name = product.name;
  editedProduct.value.description = product.description;
  editedProduct.value.photo = product.photo[0];
  editDrawerVisible.value = true;
};

const resetEditedProduct = () => {
  editedProduct.value.id = null;
  editedProduct.value.name = "";
  editedProduct.value.description = "";
  editedProduct.value.photo = null;
};

const saveChanges = async () => {
  try {
    const formData = new FormData();
    formData.append("name", editedProduct.value.name);
    formData.append("description", editedProduct.value.description);
    // Проверяем, есть ли изменения в фото каталога
    if (editedProduct.value.photo) {
      
        formData.append("photo", 
        new Blob([editedProduct.value.photo], { type: "image/jpeg" }),
        editedProduct.value.name
        );
     
      
    } else if (photoLink.value) {
      formData.append("photo", photoLink.value.trim());
    }

    const response = await updateProduct(formData, editedProduct.value.id);
    if (response && response.affected > 0) {
      toast.success("Успешное обновление продукта", { theme: "colored" });
      editDrawerVisible.value = false;
      resetEditedProduct();
      await fetchProducts();
      
    } else {
      toast.error("Ошибка при обновлении каталога", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении каталога:", error);
  }
};

const deleteProduct = async (productId) => {
  try {
    await deleteProductId(productId);
   
      toast.success("Успешное удаление каталога", { theme: "colored" });
   
    await fetchProducts()
  } catch (error) {
    toast.error("Ошибка при удалении каталога", { theme: "colored" });
    console.error("Ошибка при удалении каталога:", error);
  }
};

const handleProductPhotoChange = (event) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];

  if (file) {
    productPhoto.value = file;
    productPhotoPreview.value = URL.createObjectURL(file);
  }
};

const photoUrl = (path) => {
  if (path.startsWith("/uploads/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const fetchProducts = async () => {
  try {
  const fetchedProduct = await getProducts();
    products.value = fetchedProduct.reverse();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

watch(() => props.productAddedCount, async () => {
  await fetchProducts();
}, { immediate: true });

onMounted(fetchProducts);
</script>

<style scoped>
.foto {
  display: flex;
  margin: 10px;
}
.avatar-uploader {
  display: inline-block;
  margin-right: 0.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
}

.form {
  max-width: 100%;
  margin: auto;
  background-color: #f8f9fa; /* Цвет фона */
  padding: 2rem;
  border-radius: 15px; /* Радиус скругления углов */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Тень */
  padding-left: 20px;
}

.label {
  display: block;
  color: #495057; /* Цвет текста */
  font-size: 1rem; /* Размер шрифта */
  margin-bottom: 0.5rem;
}

.input,
.select-box {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da; /* Цвет границы */
  border-radius: 4px; /* Радиус скругления */
  outline: none;
  margin-bottom: 1rem;
}

.select-box {
  position: relative;
}

.select-box::after {
  content: "\25BC";
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.heading {
  color: #f56c6c;
}
</style>
