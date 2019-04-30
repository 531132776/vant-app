import axios from 'axios'
// 创建axios实例

const service = axios.create({
  baseURL: 'http://114.55.72.164:8091/', // api的base_url
  timeout: 50000, // 请求超时时间
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['access_token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // config.headers['access_token'] = getToken()
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.resCode !== 200) {
      return Promise.reject('error')
    }else {
      console.log(response.data,"222")
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
