
import axios from 'axios';
import authHeader from './auth/auth-header.js';
import {
    removeUserToken
} from './auth/auth-token.js';
import router from '../router/index';




let dev = process.env.VUE_APP_BASE_API + ':8888/api'
const service = axios.create({
    baseURL: dev,
    timeout: 5000
})


const methods = ['get', 'post', 'put', 'delete'];
const reqFunc = {};
methods.forEach(item => {
    let reqParams
    if(item === 'get' || item === 'delete') {
        reqParams =  'params'
    } else {
        reqParams = 'data'
    }
    reqFunc[item] = (url, data, progress = {},responseType = '') => {
        return service({
            url: url,
            method: item,
            [reqParams]: data,
            headers: authHeader.headers(),
            onUploadProgress: progress,
            responseType: responseType
        })
    }
});

/** 
 * @request 请求
 **/
service.interceptors.request.use(config => {
    
    return config
}, err => {
    return Promise.reject(err)
})
/**
 * @response 拦截
 **/
service.interceptors.response.use(res => {
    let {
        data
    } = res;
    let responseData = {
        ...data,
    }
    // let responseData = data instanceof Blob ? {
    //     data,
    //     status,
    //     headers
    // } : {
    //     ...data,
    //     status,
        
    // }
    return responseData
}, err => {
    if (err.message.includes('timeout')) {
        let errData = {
            data: {
                message: 'Timeout'
            },
            status: 500
        }
        return Promise.reject(errData)
    }
    if (err.message.includes('Network Error')) {
        let errData = {
            data: {
                message: 'NetworkError'
            },
            status: 500
        }
        return Promise.reject(errData)
    }
    if (err.response) {
        console.log(router.currentRoute.value.fullPath);
        if (err.response.status === 401 && !(router.currentRoute.value.fullPath).includes('/login')) {
            //去掉token
            removeUserToken('token')
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.value.fullPath
                }
            })
        }
    }
    const errData = {
        data: err.response.data,
        status: err.response.status
    }
    return Promise.reject(errData)
})
export default reqFunc;