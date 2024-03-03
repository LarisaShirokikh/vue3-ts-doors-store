<template>
  <div class="common-layout" id="app">
    <el-container style="height: 100%;">

      <el-container style="height: 100%;">
      <el-aside
        v-if="showSidebars"
        width="300px"
        :span="4"
        style="
          border-radius: 15px;
          margin-left: 5px;
          background-color: white;
          margin-right: 15px;
          height: calc(100vh - 40px);
          overflow-y: auto;
        "
      >
        <menu-left></menu-left>
      </el-aside>

      <el-main style="padding: 5px">
        <div style="width: auto">
          <nav-bar class="nav"></nav-bar>
        </div>

        <el-main
          style="
            padding: 5px;
            border-radius: 15px;
            background-color: white;
            overflow-y: auto;
            height: calc(100vh - 140px);
          "
        >
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
  <el-footer><FooterCom></FooterCom></el-footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import MenuLeft from "@/components/Menu-left.vue";
import NavBar from "@/components/NavBar.vue";
import FooterCom from "@/components/FuterCom.vue";
//import SearchInput from '@/components/Search-input.vue'

const screenWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const showSidebars = computed(() => {
  return screenWidth.value >= 1300;
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

:root {
  --el-color-primary: red;
}

.el-collapse-item__header {
  cursor: pointer;
}

@media screen and (max-width: 1300px) {
  .common-layout .el-aside,
  .common-layout .login-button {
    display: none;
  }

  .common-layout .login-button-main {
    display: flex;
  }

  .common-layout .el-main {
    width: 100%;
  }
}

@media screen and (min-width: 1300px) {
  .common-layout .login-button-main {
    display: none;
  }

  .common-layout .el-aside,
  .common-layout .login-button {
    display: flex;
  }
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  background-color: #f0f0f0;
  padding: 10px 10px 120px;
  
}
</style>
