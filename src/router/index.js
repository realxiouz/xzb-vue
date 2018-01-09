import Vue from 'vue';
import Router from 'vue-router';

// 下面是业务组件
import Layout from '@/pages/layout';
import HelloWorld from '@/pages/helloworld/hello-world';
import Register from '@/pages/log/register'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'index',
            name: 'Layout',
            component: Layout,
            meta: {
                requiresAuth: true,
                keepAlive: false,
            },
            children: [
                {
                    path: '/index',
                    component: HelloWorld,
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
