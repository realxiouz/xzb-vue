import axios from 'axios'
import { Message } from 'element-ui'

import store from "../store";
const fetch = axios.create({
    // baseURL: '/spgoc/manage'
})

fetch.interceptors.request.use( config => Object.assign({}, config, {
    headers: {
        token: store.state.token,
    },
}))

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
export const telVal = p => fetch.get('/api/phoneValidate', {params: p});
export const nameVal = p => fetch.get('/api/nicknameValidate', {params: p});
export const emailVal = p => fetch.get('/api/emailValidate', {params: p});
export const sendPhoneCode = p => fetch.get('api/sendPhoneCode', {params: p});
export const register = p => fetch.post('/api/register', p);
export const emailCode = () => fetch.get('/api/code');
export const login = p => fetch.post('/api/login', p);
export const logout = () => fetch.get('/api/logout');

export const unreadmsg = () => fetch.get('/api/unmessages')
export const shoppingCart = () => fetch.get('/api/cartnum')

//验证手机，用于修改密码
export const verifyphone = p => fetch.get('/api/verifyphone',{params: p})
export const changepwd = p => fetch.put('/api/changepwd', p)

//直播相关






