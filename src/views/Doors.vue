<template>
    <div>
      <h2>Doors Catalog</h2>
      <ul>
        <li v-for="door in doors" :key="door.id">
          {{ door.name }} - {{ door.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'DoorsCatalog',
    computed: {
      doors() {
        const store = useStore();
        return store.state.doors;
      },
    },
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  
  