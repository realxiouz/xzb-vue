import axios from 'axios'
import { Message } from 'element-ui'

import store from "../store";
const fetch = axios.create({

})

fetch.interceptors.request.use( config => Object.assign({}, config, {
    headers: {
        token: store.state.token,
    },
}))

fetch.interceptors.response.use( response => {

    if(response.data && response.data.success){
        //响应成功直接读取data对象
        return response.data.data;
    } else if( response.data && !response.data.success){
        //响应失败提示错误信息
        Message({
            message: response.data.message,
            type: 'error'
        })
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

//百家云房间 open_class_time class_hour 	description
export const createroom = p => fetch.post('/api/createroom', p);
//发布直播
export const liverelease = p => fetch.post('/api/liverelease', p);

//公共课
export const publicsubs = () => fetch.get('/api/publicsubs' )
//统考筛选
export const unidieds = p => fetch.get('/api/unidieds',{params: p})
//专业筛选
export const schools = p => fetch.get('/api/schools',{params: p})






