import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
import './index.css'
import '../static/css/aimate.css'
import store from './assets/store/store'
import router from './router';
import VueWechatTitle from 'vue-wechat-title';
import { Lazyload,Dialog  } from 'vant';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
Vue.use(VueWechatTitle)
Vue.use(Lazyload)
Vue.use(Vant)
Vue.use(Dialog)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
