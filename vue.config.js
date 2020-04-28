module.exports = {
  devServer:{
    hot: true,
    proxy: 'http://localhost:3000'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/css/variables.scss';`
      }
    }
  }
}