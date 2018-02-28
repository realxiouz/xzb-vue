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

/*
辅导
*/

//创建服务
export const addService = p => fetch.post('/api/service/release', p)

//辅导列表
export const tutorlist = p => fetch.get('/api/coachlist', { params: p })

//辅导详情top
export const tutortop = p => fetch.get('/api/coachtopinfo', { params: p })
    //辅导详情
export const tutordetail = p => fetch.get('/api/coachdetail', { params: p })
    //辅导班级
export const tutorclass = p => fetch.get('/api/service/classes', { params: p })

//辅导课程
export const tutorcourse = p => fetch.get('/api/serviceopenclass', { params: p })

//辅导系列
export const tutorchapter = p => fetch.get('/api/servicechapter', { params: p })

//辅导图书
export const tutorbook = p => fetch.get('/api/servicebooks', { params: p })


//根据阶段id查找课程计划
export const tutorstagecourse = p => fetch.get('/api/service/stagecourse', { params: p })

//辅导侧边栏---发布者
export const tutorseller = p => fetch.get('/api/service/serviceseller', { params: p })

//辅导侧边栏---主讲老师
export const tutorteachers = p => fetch.get('/api/service/teachers', { params: p })

//辅导侧边栏---班主任
export const tutoradvs = p => fetch.get('/api/service/advs', { params: p })

//辅导侧边栏---最新学员
export const tutorstus = p => fetch.get('/api/service/servicenewstu', { params: p })

//辅导侧边栏---班级群todo
export const tutorcols = p => fetch.get('/api/service/servicenewstu', { params: p })

//辅导上下架
export const tutorupordown = p => fetch.put('/api/serviceStatus', p)

//辅导推广
export const setextend = p => fetch.put('/api/setextend', p)


//新建班级
export const turornewclass = p => fetch.post('/api/service/createclass', p)

//教学中心班级信息
export const classinfo = p => fetch.get('/api/service/classinfo', { params: p })

//保存班级信息
export const classset = p => fetch.post('/api/service/setclass', p)

//新建班主任
export const addmaster = p => fetch.post('/api/service/addadviser', p)

//删除班主任
export const delmaster = p => fetch.delete('/api/service/deleteadv', { params: p })

//设置班主任权限
export const setmasterauth = p => fetch.post('/api/service/setadvauth', p)


//教学中心班级信息
export const getrole = p => fetch.get('/api/service/role', { params: p })

//人数信息
export const clsmembercount = p => fetch.get('/api/service/clsmembercount', { params: p })

//高端班学员列表
export const classstudent = p => fetch.get('/api/service/clsmembers', { params: p })

//转班学员列表
export const transedtudent = p => fetch.get('/api/service/transedmember', { params: p })

//阶段列表
export const periods = p => fetch.get('/api/service/periods', { params: p })

//转班列表
export const transclasses = p => fetch.get('/api/service/transclasses', { params: p })

//设置班主任权限
export const changeclass = p => fetch.post('/api/service/transmember', p)

//教学阶段信息
export const period = p => fetch.get('/api/service/period', { params: p })

//教学方案列表 
export const programs = p => fetch.get('/api/service/programs', { params: p })

//高端发布上课计划
export const plans = p => fetch.get('/api/service/planlists', { params: p })

//设置班主任权限
export const edittarget = p => fetch.post('/api/service/editperiod', p)

//发送教学方案
export const sendprogram = p => fetch.post('/api/service/sendprogram', p)

//删除教学方案
export const delprogram = p => fetch.delete('/api/service/deleteprogram', { params: p })

//添加教学方案
export const addprogram = p => fetch.post('/api/service/addprogram', p)

//编辑教学方案
export const editprogram = p => fetch.post('/api/service/editprogram', p)

//班级列表
export const classlist = p => fetch.get('/api/service/classeslist', { params: p })

//添加课程计划
export const addplan = p => fetch.post('/api/service/addplan', p)

//发送课程直播
export const sendplan = p => fetch.post('/api/service/sendplan', p)

//删除课程
export const delplan = p => fetch.delete('/api/service/deleteplan', { params: p })

//编辑课程
export const editplan = p => fetch.post('/api/service/editplan', p)

//班主任信息
export const clsadviser = p => fetch.get('/api/service/clsadviser', { params: p })

//教学中心班主任列表
export const advclasses = p => fetch.get('/api/service/advclasses', { params: p })

//小班课 学员列表
export const smallmembers = p => fetch.get('/api/service/smallmembers', { params: p })

//小班课 课程列表
export const smalllist = p => fetch.get('/api/service/smallplanlist', { params: p })

//小班课 课程列表
export const smallgroups = p => fetch.get('/api/service/smallgroups', { params: p })

//一对一 学员列表
export const onemembers = p => fetch.get('/api/service/onemembers', { params: p })

//一对一 课程列表
export const oneplanlist = p => fetch.get('/api/service/oneplanlist', { params: p })

//教学中心-高端班 学员购买的阶段
export const studyperiods = p => fetch.get('/api/service/studyperiods', { params: p })

//教学中心-高端班 学员购买的阶段
export const studycentre = p => fetch.get('/api/service/studycentre', { params: p })













