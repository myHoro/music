import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'


import * as utils from './utils/utils' //* as utils 把所有导出的对象存放到utiles对象
Vue.prototype.$utils = utils //不能在页面的script里使用

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
