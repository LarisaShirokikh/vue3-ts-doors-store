<template>
  <footer class="footer">
    <div class="container">
      <p>{{ footerText }}</p>
    </div>
  </footer>
</template>

<script setup>
const footerText = 'Здесь может быть ваш футер';
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}
</style>