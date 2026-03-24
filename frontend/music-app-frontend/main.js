import Vue from 'vue'
import App from './App'
import store from './store'
import uView from '@/node_modules/uview-ui'

// #ifndef VUE3
import './uni.promisify.adaptor'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif