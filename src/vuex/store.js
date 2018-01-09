import Vue from 'vue';
import Vuex from 'vuex';

import agentsStore from './biz/agents/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        agents: agentsStore,
    },
    strict: process.env.NODE_ENV !== 'production',
});
