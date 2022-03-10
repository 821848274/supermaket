import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import ToastComponent from "@/components/common/Toast/ToastComponent";

Vue.config.productionTip = false

Vue.use(ToastComponent)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
