// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import { i18n } from './common/js/i18n-setup'
import '../static/js/flexible.js'
import VueScroller from 'vue-scroller'
import { Tab, TabItem } from 'vux'
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: '863dd3819b5246e57e6641b35ec77503',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   v: '1.4.4'
// });
import axios from 'axios'
import  { ConfirmPlugin } from 'vux'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(VueScroller )
Vue.use(ConfirmPlugin)
axios.defaults.baseURL = 'https://api.mini-banana.com'
/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
// let init = 0
// window.addEventListener('popstate', function(e) {
//   init++
//   if (init < 2) {
//     router.beforeEach((to, from, next) => {
//       let arr1 = to.path.split('/')
//       let arr2 = from.path.split('/')
//       if (arr1.length === 2) {
//         if (arr1[1].length === 0) {
//           arr1.splice(1, 1)
//         }
//       }
//       if (arr2.length === 2) {
//         if (arr2[1].length === 0) {
//           arr2.splice(1, 1)
//         }
//       }
//       if (arr1.length < arr2.length) {
//         router.togoback()
//       } else {
//         router.togoin()
//       }
//       next()
//     })
//   }
// }, false)

// app 修改状态栏颜色
// document.addEventListener('plusready', function () {
//   let System = window.plus.os.name
//   if (System === 'iOS') {
//     window.plus.navigator.setStatusBarBackground('#d81e06')
//   }
// })

Vue.use(Mint)
Vue.use(Vuex)
Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
