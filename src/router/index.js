import Vue from 'vue';
import Router from 'vue-router';

// 下面是业务组件
import Layout from '@/pages/layout';
import Login from '@/pages/log/login';
import Register from '@/pages/log/register'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'login',
            name: 'Layout',
            component: Layout,
            meta: {
                requiresAuth: true,
                keepAlive: false,
            },
            children: [
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: 'register',
                    component: Register
                }
            ],
        },
    ],
    // mode: 'history',
});
