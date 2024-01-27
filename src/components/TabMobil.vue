<template>
    <div class="tabs-container">
        <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
            :class="{ 'active-tab': selectedTabIndex === index }" class="tab">
            {{ tab }}
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TabMobil',
    data() {
        return {
            tabs: ['Для квартиры', 'Для дома'],
            selectedTabIndex: 0,
        };
    },
    methods: {
       async selectTab(index) {
            this.selectedTabIndex = index;
            this.$emit('tab-selected', this.selectedTabIndex);
            console.log(`Отправить запрос на сервер для таба с индексом ${index}`);
            },
    },
});
</script>

<style scoped>

.tab:focus {
    outline: none;
}
.tabs-container {
    outline: none;
    display: flex;
    justify-content: center;
    background-color: #fff;
}

.tab {
    width: 40%;
    /* каждый таб занимает 40% ширины (половину от 80%) */
    padding: 15px;
    cursor: pointer;
    border: 1px solid #f7f7f7;
    border-radius: 1px;
    text-align: center;
    font-size: 1.6rem;
    transition: background-color 0.5s;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    outline: none;
}

.active-tab {
    outline: none;
    background-color: #c9c9c9;
    /* белый фон для активного таба */
    color: #fff;
    /* черный цвет текста для активного таба */
}</style>
