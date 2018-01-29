import axios from 'axios'
import { Message } from 'element-ui'

import store from "../store";
const fetch = axios.create({

})

fetch.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        token: store.state.token,
    },
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

//百家云房间 open_class_time class_hour 	description
export const createroom = p => fetch.post('/api/createroom', p);
//发布直播
export const liverelease = p => fetch.post('/api/liverelease', p);

//公共课
export const publicsubs = () => fetch.get('/api/publicsubs')
    //统考筛选
export const unidieds = p => fetch.get('/api/unidieds', { params: p })
    //专业筛选
export const schools = p => fetch.get('/api/schools', { params: p })



//直播发布者
export const getpublisher = p => fetch.get('/api/openclassseller', { params: p })
    //主讲老师
export const getteacher = p => fetch.get('/api/openclass/teacher', { params: p })
    //最新学员
export const getstu = p => fetch.get('/api/openclassnewstu', { params: p })

//关注 取消关注
export const actionfollow = p => fetch.get('/api/follow', { params: p })


//直播详情top
export const lvdetail = p => fetch.get('/api/openclass/show', { params: p })

//直播详情
export const ocdetail = p => fetch.get('/api/openclass/detail', { params: p })

//直播详情系列
export const occhapter = p => fetch.get('/api/openclass/chapter', { params: p })

//直播详情系列
export const ocbooks = p => fetch.get('/api/openclass/books', { params: p })

//直播详情系列
export const ocpost = p => fetch.get('/api/openclass/post', { params: p })

//直播附件下载
export const ocdownloadattach = p => fetch.get('api/openclass/attachment', { params: p })


//直播课列表
export const oclist = p => fetch.get('/api/openclasslist', { params: p })

//进入直播间
export const bjroom = p => fetch.get('/api/enterurl', { params: p })

//报名免费直播
export const liveapply = p => fetch.post('/api/liveapply', p);

//报名收费直播
export const livepay = p => fetch.post('/api/live/pay', p);

//wechat是否已付款
export const ispayed = p => fetch.get('/api/live/ispayed', { params: p });

//根据公共课选择圈子
export const getCircleByPS = p => fetch.get('/api/circle/publicsubject', { params: p })

//根据非统考专业课选择圈子
export const getCircleByMajor = p => fetch.get('/api/circle/major', { params: p })

//根据学校选择圈子
export const getCircleBySchool = p => fetch.get('/api/circle/schools', { params: p })


//获取直播信息
export const getlivevideo = p => fetch.get('/api/openinfo', { params: p })