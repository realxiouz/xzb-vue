import Vue from 'vue';
import Router from 'vue-router';

// 下面是业务组件
import Layout from '@/pages/layout';
import Register from '@/pages/log/register'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'logAndReg',
            name: 'Layout',
            component: Layout,
            meta: {
                requiresAuth: true,
                keepAlive: false,
            },
            children: [
                {
                    path: 'logAndReg',
                    component: Register
                }
            ],
        },
    ],
    // mode: 'history',
});
