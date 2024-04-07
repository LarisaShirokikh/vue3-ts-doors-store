<template>
  <div class="container">
    <div>
      <h2 class="heading">Добавить продукт</h2>
      <form @submit.prevent="sendProductData" class="form">
        <label for="productName" class="label">Название продукта:</label>
        <input
          v-model="productName"
          type="text"
          id="productName"
          class="input"
          required
        />

        <div class="price-product">

          <el-form-item label ="Старая цена:">
        
          <input
            v-model="productOldPrice"
            type="number"
            id="productPrice"
            class="input"
            required
          />
        </el-form-item>
  
          <el-form-item label ="Новая цена:">
          <input
            v-model="productPrice"
            type="number"
            id="productPrice"
            class="input"
            required
          />
          </el-form-item>
        </div>

        <div class="checkbox-container">
          <input
            v-model="availability"
            type="checkbox"
            id="availability"
            class="checkbox"
          />
          <label for="availability" class="checkbox-label">В наличии:</label>
        </div>

        <div class="checkbox-container">
          <input
            v-model="productOnSale"
            type="checkbox"
            id="availability"
            class="checkbox"
          />
          <label for="availability" class="checkbox-label">Акция:</label>
        </div>

        <div class="checkbox-container">
          <input
            v-model="productIsNew"
            type="checkbox"
            id="availability"
            class="checkbox"
          />
          <label for="availability" class="checkbox-label">Новинка:</label>
        </div>

        <label for="construction" class="label">Конструкция:</label>
        <input
          v-model="construction"
          type="text"
          id="construction"
          class="input"
        />

        <label for="sealingContours" class="label">Контуры уплотнения:</label>
        <input
          v-model="sealingContours"
          type="text"
          id="sealingContours"
          class="input"
        />

        <label for="thicknessWeight" class="label">Толщина:</label>
        <input
          v-model="thicknessWeight"
          type="text"
          id="thicknessWeight"
          class="input"
        />

        <label for="weight" class="label">Вес:</label>
        <input v-model="weight" type="text" id="weight" class="input" />

        <label for="insulation" class="label">Утепление:</label>
        <input v-model="insulation" type="text" id="insulation" class="input" />

        <label for="mainLock" class="label">Основной замок:</label>
        <input v-model="mainLock" type="text" id="mainLock" class="input" />

        <label for="additionalLock" class="label">Дополнительный замок:</label>
        <input
          v-model="additionalLock"
          type="text"
          id="additionalLock"
          class="input"
        />

        <label for="exteriorFinish" class="label">Отделка снаружи:</label>
        <input
          v-model="exteriorFinish"
          type="text"
          id="exteriorFinish"
          class="input"
        />

        <label for="interiorFinish" class="label">Отделка внутри:</label>
        <input
          v-model="interiorFinish"
          type="text"
          id="interiorFinish"
          class="input"
        />

        <label for="hinges" class="label">Петли:</label>
        <input v-model="hinges" type="text" id="hinges" class="input" />

        <label for="doorProtection" class="label"
          >Защита от снятия полотна:</label
        >
        <input
          v-model="doorProtection"
          type="text"
          id="doorProtection"
          class="input"
        />

        <label for="description" class="label">Описание:</label>
        <textarea
          v-model="description"
          rows="4"
          type="text"
          id="description"
          class="input"
        ></textarea>

        <div>
          <label for="photoLink" class="label">Ссылка на фото:</label>
          <div class="input-group">
            <input
              v-model="photoLink"
              id="photoLink"
              class="input"
              @input="loadPhotoFromLink"
            />
            <el-button
              style="
                width: 2em;
                height: 2em;
                margin-bottom: 15px;
                margin-left: 10px;
              "
              @click="addPhotoLink"
              :icon="Plus"
              circle
              size="default"
              type="info"
            ></el-button>
          </div>
        </div>

        <label for="productPhoto" class="label">Загрузить фото:</label>
        <input
          type="file"
          multiple
          id="productPhoto"
          @change="handleProductPhotoChange"
          accept="image/*, .png, .jpg, gif, .web,"
        />
        <div
          v-if="productPhotoPreview.length > 0"
          class="photo-preview-container"
        >
          <div v-for="(preview, index) in productPhotoPreview" :key="index">
            <img
              :src="preview"
              alt="`Product Preview ${index}`"
              class="catalog-preview"
              style="max-width: 80px; max-height: 80px"
            />
            <el-button
            style="
                width: 2em;
                height: 2em;
                margin-bottom: 15px;
                margin-left: 10px;
              "
              :icon="Delete"
              circle
              size="small"
              type="danger"
              @click="removePhoto(index)"
            ></el-button>
          </div>
        </div>

        <el-label
          for="selectedCatalog"
          style="margin-top: 20px; width: 100%"
          class="label"
          >Выберите каталог:
        </el-label>
        <el-select
          v-model="selectedCatalog"
          collapse-tags
          placeholder="Выбрать..."
          style="width: 100%; border-color: transparent !important; text-decoration: none;"
        >
        
          <el-option
            v-for="catalog in catalogs"
            :key="catalog.id"
            :value="catalog.id"
            :label="catalog.name "
          />
        </el-select>

        <button type="submit" class="button">Добавить продукт</button>
      </form>
    </div>

    <div>
      <h2 class="heading">Список продуктов</h2>

      <el-table :data="products" :key="index" style="width: 100%">
        <el-table-column prop="id" label="id" width="50" />
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
        <el-table-column label="Действия" width="100">
          <template v-slot="scope">
            <el-button
              v-if="!isEditing(scope.row.id)"
              @click="drawer = true"
              :icon="Edit"
              circle
              size="small"
              type="primary"
            ></el-button>
            <el-button
              v-if="isEditing(scope.row.id)"
              @click="saveChanges(scope.row.id)"
              :icon="Check"
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
              type="warning"
            ></el-button>
            <el-button
              @click="deleteProduct(scope.row.id)"
              :icon="Delete"
              circle
              size="small"
              type="danger"
            ></el-button>

            <el-drawer
              v-model="drawer"
              title=""
              :direction="direction"
              :before-close="handleClose"
            >
              <product-details></product-details>
            </el-drawer>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="totalProducts"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductDetails from "./ProductDetails.vue";
import { getCatalogs } from "@/server/catalog";
import {
  sendProductToServer,
  getProductsWithPagination,
  //getProducts
} from "@/server/product";
import { onMounted, Ref, ref } from "vue";
import { toast } from "vue3-toastify";
import { Check, Plus, Delete, Edit } from "@element-plus/icons-vue";

let photoLink = ref("");
const direction = ref("rtl");
const drawer = ref(false);
const productName = ref("");
const productPrice = ref("");
const productOldPrice = ref("");
const availability = ref(true);
const productOnSale = ref(false);
const productIsNew = ref(false);
const construction = ref("");
const sealingContours = ref("");
const thicknessWeight = ref("");
const weight = ref("");
const insulation = ref("");
const mainLock = ref("");
const additionalLock = ref("");
const exteriorFinish = ref("");
const interiorFinish = ref("");
const hinges = ref("");
const doorProtection = ref("");
const description = ref("");
const productPhotoPreview = ref<string[]>([]);
const productPhoto = ref<File | null>(null);
const selectedCatalog = ref("");
const catalogs = ref([]);
const photoLinks = ref<string[]>([]);
const products = ref<Array<any>>([]);
const editedProductId = ref<number | null>(null);
const currentPage = ref(1);
const pageSize = ref(10);
const totalProducts: Ref<number> = ref(0);
// const editedProductName = ref<string>("");
// const editedProductPhoto = ref<File | null>(null);

const isEditing = (productId: number) => productId === editedProductId.value;

// const startEditing = (productId: number) => {
//   editedProductId.value = productId;
//   editedProductName.value =
//     products.value.find((product) => product.id === productId)?.name || "";
// };
const addPhotoLink = () => {
  if (photoLink.value.trim() !== "") {
    photoLinks.value.push(photoLink.value.trim());
    loadPhotoPreviews();
    photoLink.value = ""; // Очищаем поле ввода
  }
};

const loadPhotoPreviews = () => {
  productPhotoPreview.value = photoLinks.value.map((link) => link.trim());
};

const loadPhotoFromLink = () => {
  loadPhotoPreviews();
};

const removePhoto = (index: number) => {
  productPhotoPreview.value.splice(index, 1); // Удаляем превью по индексу из массива
};

const handleProductPhotoChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const files = fileInput.files;

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        productPhotoPreview.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
};

const photoUrl = (path: string) => {
  if (path.startsWith("/doorsPhoto/")) {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const sendProductData = async () => {
  console.log("Отправка данных продукта на сервер...");
  try {
    if (
      !productName.value ||
      (!productPhoto.value && photoLinks.value.length === 0) ||
      !productPrice.value
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", productName.value);
    formData.append("newPrice", productPrice.value);
    formData.append("oldPrice", productOldPrice.value);
    formData.append("isOnSale", productOnSale.value ? "true" : "false");
    formData.append("isNew", productIsNew.value ? "true" : "false");
    formData.append("inStock", availability.value ? "true" : "false");
    formData.append("construction", construction.value || "");
    formData.append("sealingContours", sealingContours.value || "");
    formData.append("thicknessWeight", thicknessWeight.value || "");
    formData.append("weight", weight.value || "");
    formData.append("insulation", insulation.value || "");
    formData.append("mainLock", mainLock.value || "");
    formData.append("additionalLock", additionalLock.value || "");
    formData.append("exteriorFinish", exteriorFinish.value || "");
    formData.append("interiorFinish", interiorFinish.value || "");
    formData.append("hinges", hinges.value || "");
    formData.append("doorProtection", doorProtection.value || "");
    formData.append("description", description.value || "");
    formData.append("categoryId", selectedCatalog.value);

    // Добавляем фото в formData
    if (productPhoto.value) {
      formData.append("photo", productPhoto.value, productPhoto.value.name);
    } else if (photoLinks.value.length > 0) {
      photoLinks.value.forEach((link) => formData.append("photo[]", link));
    }

    const response = await sendProductToServer(formData);
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

const fetchData = async () => {
  try {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = currentPage.value * pageSize.value;
    const response = await getProductsWithPagination(startIndex, endIndex);
    products.value = response.data;
    totalProducts.value = response.total;
  } catch (error) {
    console.error("Ошибка при получении списка продуктов:", error);
  }
};

const fetchCatalogs = async () => {
  try {
    // Fetch the list of catalogs from the server
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchData();
};

onMounted(async () => {
  fetchCatalogs();
  fetchData();
});
</script>

<style scoped>
*:focus {
    outline: none;
}
[contenteditable="true"]:focus {
    outline: none;
}
.price-product {
  display: flex;
  align-items: center;
  margin-left: 10px;
  gap: 10px
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
}
.input {
  flex: 1;
}

.foto-botton {
  margin-left: 10px;
  height: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  margin: 10px;
}

.photo-preview-container {
  display: flex;
  flex-wrap: nowrap; /* Чтобы изображения не переносились на новую строку */
  overflow-x: auto;
  border: none; /* Добавление горизонтального скролла, если изображения не помещаются в контейнер */
}

.form {
  max-width: 100%;
  margin: auto;
  background-color: #f8f9fa; /* Цвет фона */
  padding: 2rem;
  border-radius: 8px; /* Радиус скругления углов */
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

.button {
  background-color: #f56c6c; /* Цвет фона кнопки */
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Анимация при наведении */
}

.button:hover {
  background-color: #f56c6c; /* Цвет фона при наведении */
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #f56c6c; /* Цвет рамки */
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}

.checkbox:checked {
  background-color: #f56c6c; /* Цвет фона при активации */
}

.checkbox:checked::after {
  content: "\2714"; /* Галочка */
  font-size: 14px;
  color: #fff; /* Цвет галочки */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  font-size: 1rem;
  color: #495057; /* Цвет текста */
}

.pagination {
  margin-top: 20px; /* Отступ сверху */
  margin-bottom: 20px; /* Отступ снизу */
  display: flex;
  justify-content: flex-end; /* Выравнивание пагинации вправо */
}

.heading {
  color: #f56c6c;
}
</style>
