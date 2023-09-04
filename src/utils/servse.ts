import axios from 'axios'
import router from '@/router'


let axiosurl = 'http://localhost:8001'
// if (process.env.NODE_ENV === 'development') {
//   axiosurl = process.env.VUE_APP_API
// }else {
//   axiosurl = process.env.VUE_APP_API
// }

// 拦截器

// 1、创建 axios 实例
const service = axios.create({
  baseURL: axiosurl,
})

// 设置超时时间
service.defaults.timeout = 8000

// 2、请求拦截和响应拦截
// 添加请求拦截器
// service.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   if (login.token){
//     return config;
//   }
//   router.push('/home')
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service