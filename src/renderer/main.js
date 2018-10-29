import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/scss/index.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('./common/images/default.png')
})

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')