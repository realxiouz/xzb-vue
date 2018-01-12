import Vue from 'vue';
import Vuex from 'vuex';

import agentsStore from './biz/agents/store';
import userStore from './biz/user/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        agents: agentsStore,
        user: userStore
    },
    strict: process.env.NODE_ENV !== 'production',
});
