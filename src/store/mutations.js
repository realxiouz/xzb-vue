import {
    RECORD_USERINFO,
    GET_USERINFO,
    OUT_LOGIN,
    SET_MSG_COUNT,
    SET_CART_COUNT,
    SET_REG_DIALOG,
    SET_LOG_DIALOG,
} from './mutation-types.js'

// import {setStore, getStore} from '../config/mUtils'

// import {localapi, proapi} from 'src/config/env'

export default {
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.token = info.token;
        state.login = true;
        // setStore('user_id', info.user_id);
        sessionStorage.setItem('token', info.token);
    },
    //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        if (!state.login) {
            return
        }
        if (!info.message) {
            state.userInfo = {...info };
        } else {
            state.userInfo = null;
        }
    },
    //退出登录
    [OUT_LOGIN](state) {
        state.userInfo = {};
        state.login = false;
        state.token = '';
    },
    //未读消息
    [SET_MSG_COUNT](state, count) {
        state.msgCount = count;
    },
    //购物车商品数量
    [SET_CART_COUNT](state, count) {
        state.cartCount = count;
    },

    //控制注册dialog
    [SET_REG_DIALOG](state, show) {
        state.showRegDialog = show;
    },
    [SET_LOG_DIALOG](state, show) {
        state.showLogDialog = show;
    },
}