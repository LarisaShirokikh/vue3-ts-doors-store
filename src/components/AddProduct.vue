<template>
     <div>
    <h2 class="form-title">Добавить продукт</h2>
    <form
    @submit.prevent="sendProductData" 
    class="form-container">

      <label for="productName" class="">Название продукта:</label>
      <input v-model="productName" type="text" id="productName" class="" required />

      <label for="productPrice" class="">Старая цена:</label>
          <input v-model="productOldPrice" type="number" id="productPrice" class="" required />

      <label for="productPrice" class="">Новая цена:</label>
      <input v-model="productPrice" type="number" id="productPrice" class="" required />

      <div class="checkbox-container">
            <input v-model="availability" type="checkbox" id="availability" class="checkbox" />
            <label for="availability" class="checkbox-label">В наличии:</label>
          </div>

          <div class="checkbox-container">
                <input v-model="productOnSale" type="checkbox" id="availability" class="checkbox" />
                <label for="availability" class="checkbox-label">Акция:</label>
              </div>

              <div class="checkbox-container">
                <input v-model="productIsNew" type="checkbox" id="availability" class="checkbox" />
                <label for="availability" class="checkbox-label">Новинка:</label>
              </div>

      <label for="construction" class="">Конструкция:</label>
      <input v-model="construction" type="text" id="construction" class="" />

      <label for="sealingContours" class="">Контуры уплотнения:</label>
      <input v-model="sealingContours" type="text" id="sealingContours" class="" />

      <label for="thicknessWeight" class="">Толщина:</label>
      <input v-model="thicknessWeight" type="text" id="thicknessWeight" class="" />

      <label for="weight" class="">Вес:</label>
      <input v-model="weight" type="text" id="weight" class="" />

      <label for="insulation" class="">Утепление:</label>
      <input v-model="insulation" type="text" id="insulation" class="" />

      <label for="mainLock" class="">Основной замок:</label>
      <input v-model="mainLock" type="text" id="mainLock" class="" />

      <label for="additionalLock" class="">Дополнительный замок:</label>
      <input v-model="additionalLock" type="text" id="additionalLock" class="" />

      <label for="exteriorFinish" class="">Отделка снаружи:</label>
      <input v-model="exteriorFinish" type="text" id="exteriorFinish" class="" />

      <label for="interiorFinish" class="">Отделка внутри:</label>
      <input v-model="interiorFinish" type="text" id="interiorFinish" class="" />

      <label for="hinges" class="">Петли:</label>
      <input v-model="hinges" type="text" id="hinges" class="" />

      <label for="doorProtection" class="">Защита от снятия полотна:</label>
      <input v-model="doorProtection" type="text" id="doorProtection" class="" />

      <label for="description" class="">Описание:</label>
      <input v-model="description" type="text" id="description" class="" />
      

      <label for="productPhoto" class="">Загрузить фото:</label>
      <input 
      type="file" 
      multiple
      id="productPhoto" 
      @change="handleProductPhotoChange" 
      accept="image/*" 
      class="" />
      <img v-if="productPhotoPreview" 
      :src="productPhotoPreview" 
      alt="Product Preview" 
      class="" />

      <label for="selectedCatalog" class="">Выберите каталог:</label>
       <select v-model="selectedCatalog" id="selectedCatalog" class="select-box" required>
            <option v-for="catalog in catalogs" :key="catalog.id" :value="catalog.id">
              {{ catalog.name }}
            </option>
          </select>

      <button type="submit" class="submit-button">Добавить продукт</button>
    </form>
  </div>
</template>

<script lang="ts">
import { getCatalogs } from '@/server/catalog';
import { sendProductToServer } from '@/server/product';
import { defineComponent, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
    setup() {
        const addProduct = ref('')
        const productName = ref('')
        const productPrice = ref('')
        const productOldPrice = ref('')
        const availability = ref(true)
        const productOnSale = ref(false)
        const productIsNew = ref(false)
        const construction = ref('')
        const sealingContours = ref('')
        const thicknessWeight = ref('')
        const weight = ref('')
        const insulation = ref('')
        const mainLock = ref('')
        const additionalLock = ref('')
        const exteriorFinish = ref('')
        const interiorFinish = ref('')
        const hinges = ref('')
        const doorProtection = ref('')
        const description = ref('')
        const productPhotoPreview = ref<string | null>(null);
        const productPhoto = ref<File | null>(null);
        const selectedCatalog = ref('');
        const catalogs = ref([]);

    const handleProductPhotoChange = (event: Event) => {
            const fileInput = event.target as HTMLInputElement;
            const file = fileInput.files?.[0];

            if (file) {
                productPhoto.value = file;

                const reader = new FileReader();
                reader.onload = (e) => {
                    productPhotoPreview.value = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            }
        };

        const photoUrl = (path: string) => {
            if (path.startsWith('/doorsPhoto/')) {
                return `http://localhost:3000${path}`;
            }
            return path;
        }

        const sendProductData = async () => {
            try {
                if (!productName.value || !productPhoto.value || !productPrice.value) {
                    return;
                }

                const formData = new FormData();
                formData.append('name', productName.value);
                formData.append('newPrice', productPrice.value);
                formData.append('oldPrice', productOldPrice.value);
                formData.append('isOnSale', productOnSale.value ? 'true' : 'false');
                formData.append('isNew', productIsNew.value ? 'true' : 'false');
                formData.append('inStock', availability.value ? 'true' : 'false');
                formData.append('construction', construction.value || '');
                formData.append('sealingContours', sealingContours.value || '');
                formData.append('thicknessWeight', thicknessWeight.value || '');
                formData.append('weight', weight.value || '');
                formData.append('insulation', insulation.value || '');
                formData.append('mainLock', mainLock.value || '');
                formData.append('additionalLock', additionalLock.value || '');
                formData.append('exteriorFinish', exteriorFinish.value || '');
                formData.append('interiorFinish', interiorFinish.value || '');
                formData.append('hinges', hinges.value || '');
                formData.append('doorProtection', doorProtection.value || '');
                formData.append('description', description.value || '');
                formData.append('category', selectedCatalog.value);

                const photo = productPhoto.value;
                if (photo) {
                    formData.append('photo', photo, photo.name);
                }

                const response = await sendProductToServer(formData);

                console.log('Server Response:', response);

                if (response) {
                    toast.success('Успешное добавление продукта', { theme: 'colored' });
                    // Reset form fields if needed
                } else {
                    toast.error('Ошибка при добавлении продукта', { theme: 'colored' });
                }
            } catch (error) {
                console.error('Ошибка при отправке продукта:', error);
            }
        };

        const fetchCatalogs = async () => {
            try {
                // Fetch the list of catalogs from the server
                catalogs.value = await getCatalogs();
            } catch (error) {
                console.error('Ошибка при получении списка каталогов:', error);
            }
        };

       onMounted(fetchCatalogs)

        return {
            addProduct,
            productName,
            productPrice,
            productOldPrice,
            availability,
            productOnSale,
            productIsNew,
            construction,
            sealingContours,
            thicknessWeight,
            weight,
            insulation,
            mainLock,
            additionalLock,
            exteriorFinish,
            interiorFinish,
            hinges,
            doorProtection,
            description,
            productPhotoPreview,
            productPhoto,
            catalogs,
            handleProductPhotoChange,
            photoUrl,
            sendProductData,
            fetchCatalogs,
            selectedCatalog
        }

    }

})
</script>

<style scoped>
    .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 8px;
        background-color: #f4f4f4;
        /* Add a light background color */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        /* Add a subtle box shadow */
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
  border: 2px solid #ffcc00;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
}

.checkbox:checked {
  background-color: #ffcc00;
}

.checkbox-label {
  font-size: 1rem;
}
.select-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}
.select-box::after {
  content: '\25BC'; /* Unicode character for down arrow */
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.select-box:focus {
  outline: none;
  border-color: #555;
}
.select-box:hover {
  border-color: #555;
}

.form-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
    /* Darken the title color */
}

label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    /* Dim the label color */
}

input,
select,
button {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    /* Add a border to input and select */
    border-radius: 4px;
    /* Add border-radius for a rounded look */
}

input[type="file"] {
    border: none;
    /* Remove border for file input */
}

.submit-button {
  margin-top: 10px; /* Add some space between the select box and the button */
}

button {
    background-color: #ffcc00;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    border: none;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #ffa500;
    /* Darken the background color on hover */
}

.product-photo-preview {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 4px;
}

/* Add some spacing between form elements */
.form-container label+input,
.form-container label+select,
.form-container label+button {
    margin-top: 10px;
}

/* Adjust the select dropdown arrow color */
select {
    appearance: none;
    padding-right: 30px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><polygon fill="%23555" points="0,0 12,0 6,6"/></svg>') no-repeat;
    background-position: 100% 50%;
}</style>