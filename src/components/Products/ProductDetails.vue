<template>
  <el-breadcrumb separator="/" style="margin-bottom: 40px; margin: 30px">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/category' }"
      >Категории</el-breadcrumb-item
    >
    <el-breadcrumb-item v-if="category" :to="{ path: '/category' }">{{
      category.name
    }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="product">{{ product.name }}</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="product-details">
    <div v-if="product">
    <a-image
      v-if="product.photo && product.photo.length > 0"
      :src="photoUrl(product.photo[0])"
      :alt="product.name"
      class="product-image"
    />
    <!-- <div class="additional-images">
      <a-image
        v-if="product.photo && product.photo.length > 1"
        :src="photoUrl(product.photo[1])"
        :alt="product.name"
        class=" small-image"
      />
      <a-image
        v-if="product.photo && product.photo.length > 2"
        :src="photoUrl(product.photo[2])"
        :alt="product.name"
        class=" small-image"
      />
    </div> -->
  </div>

    <div v-if="product" class="product-info">
      <a-space direction="vertical">
        <a-text style="font-size: 28px">{{ product.name }}</a-text>
      </a-space>
      <br />
      <br />
      <a-space direction="vertical">
        <p v-if="product.oldPrice" class="old-price">
          {{ product.oldPrice }} руб.
        </p>
        <p class="product-price">{{ product.newPrice }} руб.</p>
      </a-space>
      <a-space direction="vertical">
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
      </a-space>
      <br />
      <br />
      <a-space warp class="actions" style="align-items: center">
        <a-button danger size="large" @click="askQuestion">
          Задать вопрос
        </a-button>
        <a-button
          type="primary"
          size="large"
          danger
          @click="dialogFormVisible = true"
        >
          Вызвать замерщика
        </a-button>
      </a-space>
      <p class="product-description">{{ product.description }}</p>
      <div class="additional-info">
        <p><strong>Коллекция:</strong> {{ product.category }}</p>
        <p><strong>Конструкция:</strong> {{ product.construction }}</p>
        <p>
          <strong>Контуры уплотнения:</strong> {{ product.sealingContours }}
        </p>
        <p><strong>Толщина:</strong> {{ product.thicknessWeight }}</p>
        <p><strong>Вес:</strong> {{ product.weight }}</p>
        <p><strong>Утепление:</strong> {{ product.insulation }}</p>
        <p><strong>Основной замок:</strong> {{ product.mainLock }}</p>
        <p>
          <strong>Дополнительный замок:</strong> {{ product.additionalLock }}
        </p>
        <p><strong>Отделка снаружи:</strong> {{ product.exteriorFinish }}</p>
        <p><strong>Отделка внутри:</strong> {{ product.interiorFinish }}</p>
        <p><strong>Петли:</strong> {{ product.hinges }}</p>
        <p>
          <strong>Защита от снятия полотна:</strong>
          {{ product.doorProtection }}
        </p>
      </div>
    </div>
    <div v-else>Загрузка данных...</div>
  </div>

  <a-drawer v-model:open="dialogFormVisible" title="Заявка на замер" centered>
    <modal-window />
  </a-drawer>

  <products-new />
  <div class="footer">
    <FooterCom class="footer"></FooterCom>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getProductById } from "@/server/product";
import { useRouter } from "vue-router";
import ProductsNew from "@/components/ProductsNew.vue";
import FooterCom from "@/components/FuterCom.vue";
import ModalWindow from "../ModalWindow.vue";
import { photoUrl } from "@/utils/utils";
const dialogFormVisible = ref(false);

const router = useRouter();
if (!router) {
  throw new Error("Router not found. Make sure to provide the router.");
}

const product = ref(null);
const value = ref(4.7);

const fetchDataForProduct = async () => {
  try {
    const routeParams = router.currentRoute.value.params;
    const productId = routeParams ? routeParams.id : null;

    if (!productId) {
      throw new Error("Product ID not found in the route parameters.");
    }
    console.log("Product productId:", productId);
    const productData = await getProductById(productId);
    console.log("Product data:", productData);
    product.value = productData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

onMounted(() => {
  fetchDataForProduct();
});
</script>

<style scoped>

.old-price {
  font-size: 1.6rem;
  color: #777;
  text-decoration: line-through;
  margin-bottom: 10px;
}

.checked {
  color: #f56c6c;
}

.actions {
  margin-top: 20px;
}

.action-button {
  font-size: 1.4rem;
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #89bbf8;
}
.product-details {
  display: flex;
  margin: 20px;
}

.product-image {
  width: 50%; 
  height: auto;
  border-radius: 8px; 
}



.product-image-container {
  max-width: 50%;
}



.product-info {
  max-width: 50%;
  padding-left: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  font-size: 1.8rem;
  color: #f56c6c;
  margin: 20px;
}

.product-description {
  font-size: 1.4rem;
  color: #555;
  margin: 30px;
}

.additional-info {
  font-size: 1.2rem;
  color: #333;
}

.additional-info p {
  margin-bottom: 8px;
}
</style>
