<template>
    <div>
        <el-affix  :offset="10">
            <el-input
            v-model="input"
            :underline="false"
            style="{ 'round': isRound, 'active': input }"
            active-border-color="#ccc"
            class="custom-input fa-solid fa-magnifying-glass"
            placeholder="Найти дверь..."
            clearable
            :prefix-icon="Search"
            type="info"
            >
            
          </el-input>
        </el-affix>
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input = ref('')
</script>


<style scoped>
.round {
    border-radius: 20px; /* Измените значение радиуса, чтобы подогнать под ваши требования */
}

.active {
    border: 2px solid #ccc; /* Измените цвет подсветки при активном состоянии */
}
.affix-container {
  text-align: center;
  height: 400px;
  background: var(--el-color-primary-light-9);
}
.el-input {
  border: none;
}

.custom-input .el-input__inner:focus {
  border-color: transparent;
  box-shadow: none;
  background: var(--el-color-success-light-9) !important;
}

.custom-input .el-input__icon {
  color: #c0c4cc; /* цвет иконки, если нужно */
}
</style>