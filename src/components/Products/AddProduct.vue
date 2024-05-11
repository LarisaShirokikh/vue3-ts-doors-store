<template>
  <div class="container">
    <div>
      <a-text>Добавить продукт</a-text>
      <a-form
        :model="formState"
      >
        <a-form-item>
          <label for="name" class="label">Название продукта:</label>
          <a-input v-model:value="formState.name" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="description" class="label">Основное:</label>
          <a-textarea
            v-model:value="formState.description"
            :autosize="{ minRows: 2 }"
            allow-clear
            required
          ></a-textarea>
        </a-form-item>

        <a-form-item label="Старая цена:">
          <a-input
            v-model:value="formState.productOldPrice"
            type="number"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item label="Новая цена:">
          <a-input v-model:value="formState.productPrice" type="number" allow-clear required />
        </a-form-item>

        <a-form-item name="availability" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.availability"
            >Скидка:</a-checkbox
          >
        </a-form-item>

        <a-form-item name="productIsNew" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.productIsNew"
            >Новинка:</a-checkbox
          >
        </a-form-item>

        <a-form-item>
          <label for="construction" class="label">Конструкция:</label>
          <a-input
            v-model:value="formState.construction"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="sealingContours" class="label">Контуры уплотнения:</label>
          <a-input
            v-model:value="formState.sealingContours"
            allow-clear
            required
          />
        </a-form-item>


        <a-form-item>
          <label for="thicknessWeight" class="label">Толщина:</label>
          <a-input
            v-model:value="formState.thicknessWeight"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="weight" class="label">Вес:</label>
          <a-input v-model:value="formState.weight" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="insulation" class="label">Утепление:</label>
          <a-input v-model:value="formState.insulation" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="mainLock" class="label">Основной замок:</label>
          <a-input v-model:value="formState.mainLock" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="additionalLock" class="label"
            >Дополнительный замок:</label
          >
          <a-input
            v-model:value="formState.additionalLock"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="exteriorFinish" class="label">Отделка снаружи:</label>
          <a-input
            v-model:value="formState.exteriorFinish"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="interiorFinish" class="label">Отделка внутри:</label>
          <a-input
            v-model:value="formState.interiorFinish"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="hinges" class="label">Петли:</label>
          <a-input v-model:value="formState.hinges" allow-clear required />
        </a-form-item>

        <a-form-item>
          <label for="doorProtection" class="label"
            >Защита от снятия полотна:</label
          >
          <a-input
            v-model:value="formState.doorProtection"
            allow-clear
            required
          />
        </a-form-item>

        <a-form-item>
          <label for="photoLink" class="label">Ссылка на фото: </label>
            <a-input
              v-model:value="formState.photoLink"
              @input="loadPhotoFromLink"
              allow-clear
            />
            <Plus style="
                width: 2em;
                height: 2em;
                margin-bottom: 15px;
                margin-left: 10px;" 
                @click="addPhotoLink"
                />
        </a-form-item>
          
       

        <label for="photo" class="label">Загрузить фото:
          <input
            type="file"
            multiple
            id="photo"
            @change="handleProductPhotoChange"
            style="display: none"
            accept="image/*, .png, .jpg, gif, .web,"
          />
          <a-button>
            <upload-outlined></upload-outlined>
            Загрузить...
          </a-button>
        </label>


        <div v-if="productPhotoPreview.length > 0">
          <div v-for="(preview, index) in productPhotoPreview" :key="index">
            <img
              :src="preview"
              alt="`Product Preview ${index}`"
              class="catalog-preview"
              style="max-width: 80px; max-height: 80px"
            />
            <Trash2 style="
                width: 2em;
                height: 2em;
                margin-bottom: 15px;
                margin-left: 10px;
              "
              @click="removePhoto(index)"
              />
          </div>
        </div>

        <a-label class="label">Выберите каталог:</a-label>
        <a-select
          v-model:value="formState.selectedCatalog"
          show-search
          placeholder="Выбрать..."
          style="width: 100%;"
          allow-clear
          :rules="[
            { required: true, message: 'Выберите один каталог!' },
          ]"
        >
          <a-select-option
            v-for="catalog in catalogs"
            :key="catalog.id"
            :value="catalog.name"
            :label="catalog.id"
          />
        </a-select>

        <a-button danger @click="sendProductData" class="button">Добавить продукт</a-button>
      </a-form>
    </div>

    <product-list :product-added-count="productAddedCount"></product-list>
  </div>
</template>

<script lang="ts" setup>
import ProductList from "./ProductList.vue";
import {  Plus, Trash2  } from "lucide-vue-next";
import { UploadOutlined } from "@ant-design/icons-vue";
import { getCatalogs } from "@/server/catalog";
import { sendProductToServer } from "@/server/product";
import { onMounted, reactive, ref } from "vue";
import { toast } from "vue3-toastify";
const productAddedCount = ref(0);

const formState = reactive({
  name: "",
  description: "",
  productPrice: "",
  productOldPrice: "",
  availability: false,
  productIsNew: false,
  construction: "",
  sealingContours: "",
  thicknessWeight: "",
  weight: "",
  insulation: "",
  mainLock: "",
  additionalLock: "",
  exteriorFinish: "",
  interiorFinish: "",
  hinges: "",
  doorProtection: "",
  photoLink: "",
  photoLinks: [],
  photo: null,
  selectedCatalog: null,
});


const productPhotoPreview = ref<string[]>([]);
const productPhoto = ref<File | null>(null);
const catalogs = ref([]);
const photoLinks = ref<string[]>([]);

const addPhotoLink = () => {
  if (formState.photoLink.trim() !== "") {
    photoLinks.value.push(formState.photoLink.trim());
    loadPhotoPreviews();
    formState.photoLink = ""; 
  }
};

const loadPhotoPreviews = () => {
  productPhotoPreview.value = photoLinks.value.map((link) => link.trim());
};

const loadPhotoFromLink = () => {
  loadPhotoPreviews();
};

const removePhoto = (index: number) => {
  productPhotoPreview.value.splice(index, 1);
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

const sendProductData = async () => {
  console.log("Отправка данных продукта на сервер...");
  try {
    if (
      !formState.name ||
      (!formState.name && photoLinks.value.length === 0) ||
      !formState.productPrice
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("newPrice", formState.productPrice);
    formData.append("oldPrice", formState.productOldPrice);
    formData.append("isNew", formState.productIsNew ? "true" : "false");
    formData.append("isOnSale", formState.availability ? "true" : "false");
    formData.append("construction", formState.construction || "");
    formData.append("sealingContours", formState.sealingContours || "");
    formData.append("thicknessWeight", formState.thicknessWeight || "");
    formData.append("weight", formState.weight || "");
    formData.append("insulation", formState.insulation || "");
    formData.append("mainLock", formState.mainLock || "");
    formData.append("additionalLock", formState.additionalLock || "");
    formData.append("exteriorFinish", formState.exteriorFinish || "");
    formData.append("interiorFinish", formState.interiorFinish || "");
    formData.append("hinges", formState.hinges || "");
    formData.append("doorProtection", formState.doorProtection || "");
    formData.append("description", formState.description || "");
    formData.append("categoryId", formState.selectedCatalog);

    // Добавляем фото в formData
    if (productPhoto.value) {
      formData.append("photo", productPhoto.value, productPhoto.value.name);
    } else if (photoLinks.value.length > 0) {
      photoLinks.value.forEach((link) => formData.append("photo[]", link));
    }

    const response = await sendProductToServer(formData);

    if (response) {
      productAddedCount.value++;
      toast.success("Успешное добавление продукта", { theme: "colored" });
    } else {
      toast.error("Ошибка при добавлении продукта", { theme: "colored" });
    }
  } catch (error) {
    console.error("Ошибка при отправке продукта:", error);
  }
};


const fetchCatalogs = async () => {
  try {
    catalogs.value = await getCatalogs();
  } catch (error) {
    console.error("Ошибка при получении списка каталогов:", error);
  }
};


onMounted(async () => {
  fetchCatalogs();
});
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: auto;
}

.label {
  display: block;
  color: #495057;
  font-size: 0, 5rem;
  margin: 0.5rem;
}

.button {
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1rem;
}

</style>
