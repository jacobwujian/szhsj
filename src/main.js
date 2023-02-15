require('@babel/polyfill')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import { cPath } from '@/utils/constant'
import api from '@/api'
import '@/plugins'
import '@/styles/index.less'
import './permission'
//注入全局属性$message
import { message } from 'ant-design-vue'

Vue.prototype.$dayjs = moment
Vue.prototype.$api = api
Vue.prototype.$cPath = cPath
Vue.prototype.$message = message

Vue.config.productionTip = false
message.config({
  top: `60px` // 到页面顶部距离
})

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm
