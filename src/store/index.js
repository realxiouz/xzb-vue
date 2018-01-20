import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userInfo: null, //用户信息
    login: false, //是否登录,
    token: '', //
    msgCount: 0, //未读消息
    cartCount: 0,
    showRegDialog: false,
    showLogDialog: false,
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})