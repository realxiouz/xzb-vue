import Vue from 'vue';
import Router from 'vue-router';

// 下面是业务组件
import Layout from '@/pages/layout';
import Login from '@/pages/log/login';
import Register from '@/pages/log/register';
import ForgetPW from '@/pages/log/forgetpassword';
//添加服务
import ServiceLO from '@/pages/addservice/serviceLayout';
import AddLiveVideo from "@/pages/addservice/component/livevideo"; //直播
import AddTutor from "@/pages/addservice/component/tutor"; //辅导
import AddReference from "@/pages/addservice/component/reference";// 资料
import AddPackage from "@/pages/addservice/component/package"; //打包课

//直播详情
import Livevideo from '@/pages/livevideodetail/livevideo';
import LVDetail from '@/pages/livevideodetail/components/detail';
import LVChapter from '@/pages/livevideodetail/components/chapter';
import LVBooks from '@/pages/livevideodetail/components/books';
import LVPost from '@/pages/livevideodetail/components/post';

//list
import List from '@/pages/list/listlayout';
import ListLiveVideo from '@/pages/list/components/livevideo';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: 'login',
        name: 'Layout',
        component: Layout,
        meta: {
            requiresAuth: true,
            keepAlive: false,
        },
        children: [{
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
                component: ServiceLO,
                redirect: 'addservice/reference',
                children: [{
                    path:'reference',
                    name: "AddReference",
                    component: AddReference
                },{
                    path:'tutor',
                    name: "AddTutor",
                    component: AddTutor
                },
                {
                    path:'livevideo',
                    name: "AddLiveVideo",
                    component: AddLiveVideo
                },
                {
                    path:'package',
                    name: "AddPackage",
                    component: AddPackage
                }
            ]
            },
            //直播详情
            {
                path: 'livevideo/:id',
                component: Livevideo,
                name:'Livevideo',
                redirect: 'livevideo/:id/detail',
                children: [{
                        path: 'detail',
                        component: LVDetail
                    },
                    {
                        path: 'chapter',
                        component: LVChapter
                    },
                    {
                        path: 'books',
                        component: LVBooks
                    },
                    {
                        path: 'post',
                        component: LVPost
                    }
                ]
            },
            {
                path: 'list',
                component: List,
                children: [{
                    path:'livevideo',
                    component: ListLiveVideo
                }]
            }
        ],
    }, ],
    // mode: 'history',
});