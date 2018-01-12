import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_USER_AVATAR,
    SET_USER_NICKNAME,
    SET_USER_TOKEN,
    CHOOSE_LOGIN
} from '../../mutation-types';

const initState = {
    nickname: '',
    avatar: '',
    token: '',
    
    //页面间切换login--register
    isLogin: 1,
};

const mutations = {
    [SET_USER_AVATAR](state, data){
        Vue.set(state, 'avatar', data);
    },
    [SET_USER_NICKNAME](state, data){
        Vue.set(state, 'nickname', data);
    },
    [SET_USER_TOKEN](state, data){
        Vue.set(state, 'token', data);
    },
    [CHOOSE_LOGIN](state, data){
        Vue.set(state, 'isLogin', data);
    }
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
