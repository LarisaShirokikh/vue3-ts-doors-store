<template>
    <div class="product-details">
        <div v-if="product" class="product-image-container">
            <img v-if="product.photo && product.photo.length > 0" :src="photoUrl(product.photo[0])" :alt="product.name"
                class="product-image" />
        </div>
        <div v-if="product" class="product-info">
            <h1>{{ product.name }}</h1>
            <p v-if="product.oldPrice" class="old-price"> {{ product.oldPrice }} руб. </p>
            <p class="product-price">{{ product.newPrice }} руб.</p>
            <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
            <div class="actions">
                <button class="action-button" @click="askQuestion">Задать вопрос</button>
                <button class="action-button" @click="callSpecialist">Вызвать замерщика</button>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <div class="additional-info">
                <p><strong>Коллекция:</strong> {{ product.category }}</p>
                <p><strong>Конструкция:</strong> {{ product.construction }}</p>
                <p><strong>Контуры уплотнения:</strong> {{ product.sealingContours }}</p>
                <p><strong>Толщина:</strong> {{ product.thicknessWeight }}</p>
                <p><strong>Вес:</strong> {{ product.weight }}</p>
                <p><strong>Утепление:</strong> {{ product.insulation }}</p>
                <p><strong>Основной замок:</strong> {{ product.mainLock }}</p>
                    <p><strong>Дополнительный замок:</strong> {{ product.additionalLock }}</p>
                    <p><strong>Отделка снаружи:</strong> {{ product.exteriorFinish }}</p>
                    <p><strong>Отделка внутри:</strong> {{ product.interiorFinish }}</p>
                    <p><strong>Петли:</strong> {{ product.hinges }}</p>
                        <p><strong>Защита от снятия полотна:</strong> {{ product.doorProtection }}</p>
            </div>
            
        </div>
        <div v-else>
            Загрузка данных...
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getProductById } from '@/server/product';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter();
        if (!router) {
            throw new Error("Router not found. Make sure to provide the router.");
        }

        const product = ref(null);

        const photoUrl = (path) => {
            if (path.startsWith('/doorsPhoto/')) {
                return `http://localhost:3000${path}`;
            }
            return path;
        };

        const fetchDataForProduct = async () => {
            try {
                const routeParams = router.currentRoute.value.params;
                const productId = routeParams ? routeParams.id : null;

                if (!productId) {
                    throw new Error("Product ID not found in the route parameters.");
                }
                console.log('Product productId:', productId);
                const productData = await getProductById(productId);
                console.log('Product data:', productData);
                product.value = productData;
            } catch (error) {
                console.error('Error fetching product data:', error);
                throw error;
            }
        };

        onMounted(() => {
            fetchDataForProduct();
        });

        return {
            product,
            photoUrl,
        };
    },
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
    color: orange;
}

.actions {
    margin-top: 20px;
}

.action-button {
    font-size: 1.4rem;
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.action-button:hover {
    background-color: #217dbb;
}
.product-details {
    display: flex;
    margin: 20px;
}

.product-image-container {
    max-width: 50%;
}

.product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
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
    color: #d91111;
    margin-bottom: 10px;
}

.product-description {
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 20px;
}

.additional-info {
    font-size: 1.2rem;
    color: #333;
}

.additional-info p {
    margin-bottom: 8px;
}

.loading-message {
    font-size: 1.6rem;
    color: #555;
    text-align: center;
    margin-top: 20px;
}
</style>
