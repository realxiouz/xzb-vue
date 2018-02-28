import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    os: '',
    responsiveMode: false,
    userInfo: null, //用户信息
    login: false, //是否登录,
    token: '', //
    msgCount: 0, //未读消息
    cartCount: 0,
    showRegDialog: false,
    showLogDialog: false,
    classId: 0, //选择的班级id
    periodId: 0, //选择阶段
    classes: [], //某一服务下的全部班级
    adviserAuthority: [], //班主任权限
    tutorType: 0, //辅导类型 3:1对1 4:小班 5:高端班
    orderId: 0, //1to1 订单id

    topType: 'service', //后台管理首部类型
    typeRoutes: [], //后台类型选择路由
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})