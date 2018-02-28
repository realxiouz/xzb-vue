import {
    RECORD_USERINFO,
    GET_USERINFO,
    OUT_LOGIN,
    SET_MSG_COUNT,
    SET_CART_COUNT,
    SET_REG_DIALOG,
    SET_LOG_DIALOG,
    SET_CLASS_ID,
    SET_PERIOD_ID,
    SET_CLASSES,
    SET_OS,
    SET_RESPONSIVE_MODE,
    SET_ADVISER_AUTHORITY,
    SET_TUTOR_TYPE,
    SET_ORDER_ID,
    SET_TOP_TYPE,
    SET_TYPE_ROUTES
} from './mutation-types.js'

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

    //
    [SET_CLASS_ID](state, id) {
        state.classId = id;
    },
    [SET_PERIOD_ID](state, id) {
        state.periodId = id;
    },
    [SET_CLASSES](state, classes) {
        state.classes = classes;
    },
    [SET_OS](state, os) {
        state.os = os;
    },
    [SET_RESPONSIVE_MODE](state, mode) {
        state.responsiveMode = mode;
    },
    [SET_ADVISER_AUTHORITY](state, authority) {
        state.adviserAuthority = authority;
    },
    [SET_TUTOR_TYPE](state, type) {
        state.tutorType = type;
    },
    [SET_ORDER_ID](state, id) {
        state.orderId = id;
    },
    [SET_TOP_TYPE](state, type) {
        state.topType = type;
    },
    [SET_TYPE_ROUTES](state, routes) {
        state.typeRoutes = routes;
    },
}