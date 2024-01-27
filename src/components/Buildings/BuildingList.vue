<template>
    <div class="title">
        <h2>Наши установки</h2>
    </div>
    <div class="building-list">
        <div class="horizontal-scroll">
            <building-item v-for="video in videos" 
            :key="video.id" :video="video" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BuildingItem from '@/components/Buildings/BuildingItem.vue';

export default defineComponent({
    name: 'BuildingList',
    components: {
        BuildingItem,
    },
    props: {
        videos: {
            type: Array,
            required: true,
        },
    },
});
</script>

<style scoped>
.building-list {
    padding: 20px 20px 20px;
    gap: 10px
}

.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    gap: 10px
}

.title {
    padding: 20px 30px 20px; 
    color: #333;
}

/* Добавьте стили по желанию для горизонтальной прокрутки */
</style>
