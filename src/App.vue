<template>
  <div id="app">
    <navbar-view></navbar-view>
    <main-navbar></main-navbar>
    <navbar-catalog></navbar-catalog>
    <router-view />
    <futer-com />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarView from './components/Navbar.vue';
import MainNavbar from './components/MainNavbar.vue';
import NavbarCatalog from './components/NavbarCatalog.vue';
import FuterCom from './components/FuterCom.vue';

export default defineComponent({
  name: 'App',
  components: 
  {
    NavbarView,
    MainNavbar,
    NavbarCatalog,
    FuterCom
}
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
}


</style>

