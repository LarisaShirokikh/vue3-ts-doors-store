<template>
  <div class="common-layout" id="app">
    
      <el-container >
        <el-aside
          v-if="showSidebars"
          width="auto"
          :span="4"
          style="
            border-radius: 15px;
            margin-left: 2px;
            background-color: white;
            margin-right: 5px;
            height: calc(100vh - 40px);
          "
        >
          <menu-left></menu-left>
        </el-aside>

        <el-main style="padding: 5px">
          <div style="width: auto">
            <nav-bar class="nav"></nav-bar>
          </div>

          <div
            style="
              
              border-radius: 15px;
              background-color: white;
              height: calc(100vh - 120px);
            "
          >
            <el-scrollbar>
              <router-view class="router"/>
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import MenuLeft from "@/components/Menu-left.vue";
import NavBar from "@/components/NavBar.vue";
//import FooterCom from "@/components/FuterCom.vue";
//import SearchInput from '@/components/Search-input.vue'

const screenWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const showSidebars = computed(() => {
  return screenWidth.value >= 1000;
});
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

.el-collapse-item__header {
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
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

@media screen and (min-width: 1000px) {
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


#app {
  font-family: Avenir, Helvetica, sans-serif;
  background-color: #f0f0f0;
  padding:  2px;
}
</style>