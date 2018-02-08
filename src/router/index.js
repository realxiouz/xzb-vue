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
import AddReference from "@/pages/addservice/component/reference"; // 资料
import AddPackage from "@/pages/addservice/component/package"; //打包课

//直播详情
import Livevideo from '@/pages/livevideodetail/livevideo';
import LVDetail from '@/pages/livevideodetail/components/detail';
import LVChapter from '@/pages/livevideodetail/components/chapter';
import LVBooks from '@/pages/livevideodetail/components/books';
import LVPost from '@/pages/livevideodetail/components/post';

//辅导详情
import Tutor from '@/pages/tutordetail/tutor';
import TutorDetail from '@/pages/tutordetail/components/detail';
import TutorClass from '@/pages/tutordetail/components/class';
import TutorCourse from '@/pages/tutordetail/components/course';
import TutorBook from '@/pages/tutordetail/components/books';
import TutorChapter from '@/pages/tutordetail/components/chapter';
// import LVDetail from '@/pages/livevideodetail/components/detail';
// import LVDetail from '@/pages/livevideodetail/components/detail';

//教学中心
import TeachCenter from '@/pages/teachcenter/teachcenterlayout';

import ClassManage from '@/pages/teachcenter/components/classmanage';
import StudentManage from '@/pages/teachcenter/components/studentmanage';
import Plan from '@/pages/teachcenter/components/plan';

//list
import List from '@/pages/list/listlayout';
import ListLiveVideo from '@/pages/list/components/livevideo';
import ListTutor from '@/pages/list/components/tutor';

//个人中心
import UserCenter from '@/pages/usercenter/uclayout';
import Study from '@/pages/usercenter/components/study';
import Teach from '@/pages/usercenter/components/study';

//他人中心
import OtherCenter from '@/pages/othercenter/oclayout';
import OCLiveVideo from '@/pages/othercenter/components/livevideo';

//编辑服务
import EditLO from '@/pages/editservice/editlayout';
import EditLiveVideo from "@/pages/editservice/component/livevideo";


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
                path: 'reference',
                name: "AddReference",
                component: AddReference
            }, {
                path: 'tutor',
                name: "AddTutor",
                component: AddTutor
            },
            {
                path: 'livevideo',
                name: "AddLiveVideo",
                component: AddLiveVideo
            },
            {
                path: 'package',
                name: "AddPackage",
                component: AddPackage
            }
            ]
        },
        //编辑服务
        {
            path: 'editservice',
            component: EditLO,
            // redirect: 'addservice/reference',
            children: [
                // {
                //     path: 'reference',
                //     name: "AddReference",
                //     component: AddReference
                // }, 
                // {
                //     path: 'tutor',
                //     name: "AddTutor",
                //     component: AddTutor
                // },
                {
                    path: 'livevideo/:id',
                    name: "EditLiveVideo",
                    component: EditLiveVideo
                },
                // {
                //     path: 'package',
                //     name: "AddPackage",
                //     component: AddPackage
                // }
            ]
        },
        //直播详情
        {
            path: 'livevideo/:id',
            component: Livevideo,
            name: 'Livevideo',
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
        //辅导详情
        {
            path: 'tutor/:id',
            component: Tutor,
            name: 'Tutor',
            redirect: 'tutor/:id/detail',
            children: [{
                path: 'detail',
                component: TutorDetail
            },
            {
                path: 'class',
                component: TutorClass
            },
            {
                path: 'course',
                component: TutorCourse
            },
            {
                path: 'chapter',
                component: TutorChapter
            },
            {
                path: 'books',
                component: TutorBook
            }
            ]
        },
        //教学中心
        {
            path: 'teachcenter/:id',
            component: TeachCenter,
            name: 'TeachCenter',
            redirect: 'teachcenter/:id/classmanage',
            children: [
                {
                    path: 'classmanage',
                    component: ClassManage
                },
                {
                    path: 'studentmanage',
                    component: StudentManage
                },
                {
                    path: 'plan',
                    component: Plan
                },
            ]
        },
        //列表展示
        {
            path: 'list',
            component: List,
            children: [
                {
                    path: 'livevideo',
                    component: ListLiveVideo
                },
                {
                    path: 'tutor',
                    component: ListTutor
                }

            ]
        },
        //个人中心
        {
            path: 'usercenter',
            component: UserCenter,
            children: [{
                component: Study,
                path: 'studying',
            },
            {
                component: Teach,
                path: 'teaching',
            }
            ]

        },
        //他人中心
        {
            path: 'othercenter/:id',
            component: OtherCenter,
            name: 'OtherCenter',
            redirect: 'othercenter/:id/livevideo',
            children: [{
                component: OCLiveVideo,
                path: 'liveVideo',
            },
                // {
                //     component: Teach,
                //     path: 'teaching',
                // }
            ]

        }
        ],
    },],
    // mode: 'history',
});