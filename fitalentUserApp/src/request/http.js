/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { Toast } from 'vant';
import store from '../store.js'
import baseUrls from './setBaseUrl'


console.log(baseUrls, '===>>')
    //环境的切换
    // if (process.env.NODE_ENV == 'development') {

// axios.defaults.baseURL = 'http://192.168.10.203:8769/';
// axios.defaults.baseURL = 'http://192.168.10.121:8769/';
// axios.defaults.baseURL = 'https://test.gateway.fitalent.com.cn/test';

// } else if (process.env.NODE_ENV == 'production') {

// axios.defaults.baseURL = 'http://192.168.10.203:8769/';
// axios.defaults.baseURL = 'http://192.168.10.121:8769/';
// axios.defaults.baseURL = 'https://test.gateway.fitalent.com.cn/pro';

// }

// const service = axios.create({
//     baseURL: "https://test.gateway.fitalent.com.cn/", // api的base_url
//     timeout: 50000, // 请求超时时间
// })
axios.defaults.baseURL = baseUrls;
// 请求超时时间
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
        console.log(config, '===>>>>>')
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 2000) {
            return Promise.resolve(response);
        } else {
            Toast({
                message: response.data.message,
                duration: 3000,
                forbidClick: true
            });
        }
        console.log(response, '>>>.')
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                // case 401:
                //     router.replace({
                //         path: '/login',
                //         query: { redirect: router.currentRoute.fullPath }
                //     });
                //     break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                // case 403:
                //     Toast({
                //         message: '登录过期，请重新登录',
                //         duration: 1000,
                //         forbidClick: true
                //     });
                // 清除token                    
                // localStorage.removeItem('token');
                // store.commit('loginSuccess', null);
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                // setTimeout(() => {
                //     router.replace({
                //         path: '/login',
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         }
                //     });
                // }, 1000);
                // break;
                // 404请求不存在
                case 500:
                    Toast({
                        message: '服务器异常',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                    // 其他错误，直接抛出错误提示               
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                    // 其他错误，直接抛出错误提示                
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

export default axios