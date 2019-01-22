// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import ScanCode from './components/ScanCode'
import CodeParsing from './components/CodeParsing'
import Contract from './components/Contract'
import { AjaxPlugin, ToastPlugin } from 'vux'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)

const routes = [
  {
    path: '/',
    component: ScanCode,
    meta: {
      title: '码上详情'
    }
  }, {
    path: '/detail',
    component: CodeParsing,
    meta: {
      title: '详情信息'
    }
  }, {
    path: '/contract',
    component: Contract,
    meta: {
      title: '恋爱合约'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
