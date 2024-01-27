<template>
  <el-carousel :interval="5000" arrow="always" style="width: 300px; height: 600px" >
    <el-carousel-item v-for="item in 3" :key="item" style="height: 600px">
      <h3 text="xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>

</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>