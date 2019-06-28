import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'lib-flexible/flexible.js' //px转rem
import './assets/common/index.css'
import 'swiper/dist/css/swiper.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//判断是ios还是安卓
let u = navigator.userAgent;
// let app = navigator.appVersion;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 ;

Vue.prototype.isAndroid = isAndroid;
Vue.prototype.isiOS = isiOS;

//页面跳转从顶部开始显示
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

router.beforeEach((to, from, next) => {
        console.log(to, from)
            /* 路由发生变化修改页面title */
            // if (to.meta.title) {

        // }
        if (to.query.leagueStatus) {
            document.title = '团课详情';
        } else {
            document.title = to.meta.title
        }
        next()
    })
    // router.afterEach(route => {
    //     document.title = route.meta.title
    // })
    // function oc_to_js(){
    //     alert(2)
    // }
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')