<template>
  <div id="app">
    <navbar-view></navbar-view>
    <main-navbar></main-navbar>
    <navbar-catalog></navbar-catalog>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarView from './components/Navbar.vue';
import MainNavbar from './components/MainNavbar.vue';
import NavbarCatalog from './components/NavbarCatalog.vue';

export default defineComponent({
  name: 'App',
  components: 
  {
    NavbarView, 
    MainNavbar,
    NavbarCatalog
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
}


</style>

