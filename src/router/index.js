import Vue from 'vue';
import Router from 'vue-router';

// 下面是业务组件
import Layout from '@/pages/layout';
import Login from '@/pages/log/login';
import Register from '@/pages/log/register';
import ForgetPW from '@/pages/log/forgetpassword';
//添加服务
import ServiceLO from '@/pages/addservice/serviceLayout';

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
                },
                {
                    path: 'forgetpassword',
                    component: ForgetPW
                },
                //添加服务
                {
                    path: 'addservice',
                    component: ServiceLO
                }
            ],
        },
    ],
    // mode: 'history',
});
