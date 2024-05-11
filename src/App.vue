<template>
  <div class="common-layout" id="app">
    <a-layout>
      <a-layout-sider
        v-if="showSidebars"
        style="
          border-radius: 15px;
          margin-left: 2px;
          background-color: white;
          margin-right: 5px;
          height: calc(100vh - 40px);
        "
      >
        <el-scrollbar>
          <menu-left></menu-left>
        </el-scrollbar>
      </a-layout-sider>

      <a-layout-content style="padding: 3px">
        <div class="nav-container" style="padding: 2px; weight: 100%">
          <nav-bar class="nav"></nav-bar>
        </div>

        <div
          class="content-container"
          style="
            border-radius: 15px;
            background-color: white;
            height: calc(100vh - 120px);
          "
        >
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import MenuLeft from "@/components/Menu-left.vue";
import NavBar from "@/components/NavBar.vue";

const screenWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const showSidebars = computed(() => {
  return screenWidth.value >= 768;
});
</script>

<style scoped>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.a-layout-sider {
  transition: width 0.3s ease;
}
.el-collapse-item__header {
  cursor: pointer;
}

.common-layout {
  height: 100%;
}

.el-scrollbar__wrap {
  height: calc(100vh - 120px);
}

.common-layout .nav-container {
  width: 100%;
  display: flex;
}

.common-layout .content-container {
  width: 100%;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
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

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

#app {
  font-family: Avenir, Helvetica, sans-serif;
  background-color: #f0f0f0;
  padding: 5px;
  min-height: 100%;
}
</style>
