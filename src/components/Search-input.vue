<template>
  <div class="search">
    <el-affix :offset="10">
      <el-input
        v-model="input"
        :underline="false"
        class="w-50 m-2 "
        size="large"
        placeholder="Найти дверь..."
        clearable
        :suffix-icon="Search"
        required
        style="border: none;"
      />
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const input = ref("");
</script>

<style scoped>
.custom-input {
  border-radius: 10px;
}

.custom-input input {
  border-radius: 10px;
}

.custom-input input:focus {
  border-color: transparent;
  box-shadow: none;
}

.affix-container {
  text-align: center;
  height: 400px;
  background: var(--el-color-primary-light-9);
}
</style>
