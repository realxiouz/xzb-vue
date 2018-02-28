import axios from 'axios'
import { Message } from 'element-ui'

import store from "../store";
const fetch = axios.create({

})

fetch.interceptors.request.use(config => Object.assign({}, config, {
    // headers: {
    //     token: store.state.token,
    // },
}))

fetch.interceptors.response.use(response => {

    if (response.data && response.data.success) {
        //响应成功直接读取data对象
        return response.data.data;
    } else if (response.data && !response.data.success) {
        //需要权限直接去登陆
        if (response.data.message === "token错误或失效") {
            store.commit("SET_LOG_DIALOG", true);
        } else {
            //响应失败提示错误信息
            Message({
                message: response.data.message,
                type: 'error'
            })
        }
        return Promise.reject(response.data.message);
    }
    return response;
}, error => {
    Message({
        message: '网络故障 请重试',
        type: 'error'
    })
    return Promise.reject(error);
});

export default fetch;