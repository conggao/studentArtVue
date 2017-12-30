// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {ElButton} from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'   // 默认主题

Vue.config.productionTip = false
Vue.use(ElButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
