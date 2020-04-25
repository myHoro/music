import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use( //请求拦截
  config => {
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token')
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use( //响应拦截操作
  response => {
    return response.data;
  },
  error => {
    return Promise.resolve(error.response);
  }
);
axios.defaults.timeout = 20000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['token'] = localStorage.getItem('token');
export default {
  post(url: string, param: any, headers?: any){
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(param), { headers }).then((res: any) => {
        if(res.code == 0){
          resolve(res)
        }else{
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  get(url: string, param?: any){
    return new Promise((resolve, reject) => {
      axios.get(url, {params:param}).then((res: any) => {
        if(res.code == 200){
          resolve(res)
        }else{
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
