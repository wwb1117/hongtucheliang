import axios from 'axios'
import Promise from 'es6-promise'
import qs from 'qs'
import { Message } from 'element-ui';
import router from 'router/index'
import store from 'store'
import base from 'utils/base'

// axios 配置
axios.defaults.withCredentials = true;
axios.defaults.timeout = 50000;
// 根据实际情况，调整为服务器地址
axios.defaults.baseURL = "/api";

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
store.commit('setBaseUrl', axios.defaults.baseURL);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
);

function checkStatus(response) {
    return new Promise((resolve, reject) => {
        var timerArr = base.timerArr

        if (response.status === 200) {
            if(response.data.code === 401){
                Message.warning({
                    'message':'会话失效,请重新登录',
                    'duration': 1500,
                    'onClose':function(){
                        router.push({path:'/login'})
                    }
                })
                console.log(timerArr)
                for(var item of timerArr){
                    if(item){
                        clearInterval(item)
                    }
                }
            }
            if(response.data.code){
                if(response.data.code == 200){
                    resolve(response.data)
                }else{
                    reject(response.data)
                    console.log(timerArr)
                    for(var item1 of timerArr){
                        if(item1){
                            clearInterval(item1)
                        }
                    }
                }
            }else{
                resolve(response.data)
            }
        }else{
            reject(response.data)
            for(var item2 of timerArr){
                if(item1){
                    clearInterval(item2)
                }
            }
        }

    })
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    },
    put(url, params) {
        return axios({
            method: 'put',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    }

}
