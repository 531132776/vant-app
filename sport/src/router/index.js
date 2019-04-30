import Vue from 'vue'
import Router from 'vue-router'
import { i18n, loadLanguageAsync, ComingSoon } from '../common/js/i18n-setup.js'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
// Router.prototype.togo = function (path) {
//   this.isleft = true
//   this.isright = false
//   this.push(path)
// }
// 需要右方向动画的路由用this.$router.goRight('****')
// Router.prototype.goRight = function (path) {
//   this.isright = true
//   this.isleft = false
//   this.push(path)
// }
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
// Router.prototype.goBack = function () {
//   this.isright = true
//   this.isleft = false
//   this.go(-1)
// }
// 点击浏览器返回按钮执行，此时不需要路由回退
// Router.prototype.togoback = function () {
//   this.isright = true
//   this.isleft = false
// }
// 点击浏览器前进按钮执行
// Router.prototype.togoin = function () {
//   this.isright = false
//   this.isleft = true
// }

const routes =[
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/share',
      children: [
        {
          path: '/share',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        
        {
          path: '/footprints',
          name: 'footprints',
          component: (resolve) => require(['@/pages/index/footprints'], resolve)
        },
        {
          path: '/day',
          name: 'day',
          component: (resolve) => require(['@/pages/index/day'], resolve)
        }
      ]
    },
    {
      path: '/detail',
      name: 'Detail',
      component: (resolve) => require(['@/pages/detail'], resolve)
    },
    {
      path: '/sport',
      name: 'sport',
      component: (resolve) => require(['@/pages/sport'], resolve)
    },
  ]
const router = new Router({
	routes
})
router.beforeEach ((to, from, next) => {
  if(window.navigator.language){
    if(window.navigator.language == 'zh-CN'){
      localStorage.setItem('__locale__','ch')
    }else if(window.navigator.language == 'en-US'){
      localStorage.setItem('__locale__','en')
    }
  }else{
    localStorage.setItem('__locale__','ch')
  }
  const lang = localStorage.getItem('__locale__')
	loadLanguageAsync(lang).then(() => next())
})
export default router