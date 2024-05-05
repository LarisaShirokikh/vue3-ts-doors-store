const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  env: {
    API_URL: process.env.API_URL
  },
});
