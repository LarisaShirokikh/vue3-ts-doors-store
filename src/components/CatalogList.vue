<template>
    <div>
        <CatalogAccordionItem v-for="catalog in catalogs" :key="catalog.id" :catalog="catalog" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CatalogAccordionItem from '@/components/CatalogAccordionItem.vue';

export default defineComponent({
    name: 'CatalogList',
    components: {
        CatalogAccordionItem,
    },
    props: {
        catalogs: {
            type: Array,
            required: true,
        },
    },
});
</script>
