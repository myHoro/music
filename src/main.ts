import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'


import * as utils from './utils/utils' //* as utils 把所有导出的对象存放到utiles对象
Vue.prototype.$utils = utils //需要另外在x.d.ts文件声明类型，否则直接 this.$utils 使用时无法识别（虽然可以正常使用，但会抛红。配置types文件夹下vue.d.ts）

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
