<template>
    <div class="accordion-item">
        <button class="accordion" @click="toggleAccordion">
            <span class="arrow-icon" :class="{ 'arrow-rotated': isOpen }">
                <i class="fas fa-chevron-down"></i>
            </span>
            <div class="text-container">
                <h3>{{ catalog.name }}</h3>
                <h4 class="price">цена от {{ catalog.price }} руб.</h4>
            </div>
        </button>
        <div class="panel" :class="{ 'panel-open': isOpen }">
            <img :src="photoUrl(catalog.photo[0])" :alt="catalog.name" class="catalog-image" />
            <p class="description">{{ catalog.description }}</p>
            <button @click="viewDoors" class="view-catalog-button">Смотреть двери</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CatalogAccordionItem',
    props: {
        catalog: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggleAccordion() {
            this.isOpen = !this.isOpen;
        },
        viewDoors() {
            console.log('View doors for catalog:', this.catalog.name);
        },
        photoUrl(path) {
            return path.startsWith('/uploads/') ? `http://localhost:3000${path}` : path;
        },
    },
});
</script>

<style scoped>
.view-catalog-button {
    padding: 10px 20px;
    background-color: transparent; /* Задаем прозрачный фон */
    color: #d97c11;
    border: 1px solid #d97c11; /* Тонкий оранжевый бордер */
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
}

.view-catalog-button:hover {
    background-color: #e67e22; /* Цвет фона при наведении */
    color: #fff; 
}

.description {
    font-size: 1.2rem;
    color: #555;
}

.price {
    color: #d97c11;
    text-align: right;
}

.accordion {
    padding: 20px 30px 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border: none;
    outline: none;
    transition: background-color 0.3s;
    color: #333;
    border-bottom: 1px solid #ccc;
    font-size: 1.4rem;
}

.accordion:hover {
    background-color: #f0f0f0;
}

.arrow-icon {
    font-size: 20px;
    color: #555;
}

.arrow-rotated {
    transform: rotate(180deg);
}

.panel {
    padding: 30px;
    display: none;
    background-color: #fff;
}

.panel-open {
    display: block;
}

.catalog-image {
  max-width: 100%;/* Выберите желаемую высоту */
  height: auto;
  margin-right: 10px;
}
</style>
