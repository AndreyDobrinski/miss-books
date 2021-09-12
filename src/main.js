import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/global.scss'



Vue.config.productionTip = false

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // Focus the element
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
