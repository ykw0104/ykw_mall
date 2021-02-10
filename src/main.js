import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = true   //游览器vue devtools不显示的问题

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
