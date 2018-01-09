// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';

// import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from './utilities/custom-axios';
import router from './router';
import store from './vuex/store';
import * as GlobalDirectives from './directives';

import IconSvg from '@/components/svg-icon'

Vue.component('icon-svg', IconSvg)

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./icons', false, /\.svg$/);
requireAll(req);

// axios interceptors
Vue.axios.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        token: store.getters.token,
    },
}));

Vue.axios.interceptors.response.use((res) => {
    if (res.status === 401) {
        store.dispatch('signOut').then(() => {
            router.replace('/login');
        });
    }
    if (res.status === 403) {
        router.replace('/index');
        return Promise.reject('无权限！');
    }
    if (res.status === 404) {
        return Promise.reject('页面不存在！');
    }
    if (res.status >= 500) {
        return Promise.reject('服务器错误！');
    }
    if (res.status >= 400) {
        return Promise.reject(res.data);
    }
    return res.data;
}, (err) => {
    if (String(err).indexOf('Network Error') !== -1) {
        return Promise.reject('网络错误！');
    }
    return Promise.reject('网络连接超时！');
});

Vue.config.productionTip = false;

// directives
Object.keys(GlobalDirectives.default).forEach((name) => {
    const config = GlobalDirectives.default[name];
    Vue.directive(config.name, config.directive);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view></router-view>',
});
