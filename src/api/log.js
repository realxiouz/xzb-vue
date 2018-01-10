import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const fetch = axios.create({
    // baseURL: '/spgoc/manage'
})

fetch.interceptors.request.use(config => {
    // if (config.method === 'post' && config.url.indexOf('/addFile') === -1) {
    //     config.data = qs.stringify(config.data)
    // }
    return config;
})

fetch.interceptors.response.use( response => {
    return response;
  }, error => {
    Message({
        message: '网络故障 请重试',
        type: 'error'
    })
    return Promise.reject(error);
  });




// export default login = p => axios.post('api/login', p);
// export default login = p => axios.post('api/login', p);
export const login = p => axios.post('/api/login', p);
export const telVal = p => fetch.get('/api/phoneValidate', {params: p});
export const nameVal = p => fetch.get('/api/nicknameValidate', {params: p});
export const emailVal = p => fetch.get('/api/emailValidate', {params: p});
export const sendPhoneCode = p => fetch.get('api/sendPhoneCode', {params: p});
export const register = p => fetch.post('/api/register', p);
export const emailCode = () => fetch.get('/api/code');




