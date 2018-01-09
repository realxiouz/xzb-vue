import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_AGENTS_BASE_LIST,
} from '../../mutation-types';

const initState = {
    agentsbaseList: [],
};

const mutations = {
    [SET_AGENTS_BASE_LIST](state, data) {
        Vue.set(state, 'agentsbaseList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
