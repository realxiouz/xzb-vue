import Vue from 'vue';
import Router from 'vue-router';

import store from "../store";

// 
const Layout = () => import('@/pages/layout')
const Login = () => import('@/pages/log/login')
const Register = () => import('@/pages/log/register')
const ForgetPW = () => import('@/pages/log/forgetpassword')

//添加服务
const ServiceLO = () => import('@/pages/addservice/serviceLayout')
const AddLiveVideo = () => import('@/pages/addservice/component/livevideo')
const AddTutor = () => import('@/pages/addservice/component/tutor')
const AddReference = () => import('@/pages/addservice/component/reference')
const AddPackage = () => import('@/pages/addservice/component/package')

//直播详情
const Livevideo = () => import('@/pages/livevideodetail/livevideo')
const LVDetail = () => import('@/pages/livevideodetail/components/detail')
const LVChapter = () => import('@/pages/livevideodetail/components/chapter')
const LVBooks = () => import('@/pages/livevideodetail/components/books')
const LVPost = () => import('@/pages/livevideodetail/components/post')

//辅导详情
const Tutor = () => import('@/pages/tutordetail/tutor')
const TutorDetail = () => import('@/pages/tutordetail/components/detail')
const TutorClass = () => import('@/pages/tutordetail/components/class')
const TutorCourse = () => import('@/pages/tutordetail/components/course')
const TutorBook = () => import('@/pages/tutordetail/components/books')
const TutorChapter = () => import('@/pages/tutordetail/components/chapter')
const TutorStudyCenter = () => import('@/pages/tutordetail/components/studycenter')

//教学中心 高端班(发布者)
const TeachCenter = () => import('@/pages/teachcenter/teachcenterlayout')
const ClassManage = () => import('@/pages/teachcenter/components/classmanage')
const StudentManage = () => import('@/pages/teachcenter/components/studentmanage')
const Plan = () => import('@/pages/teachcenter/components/plan')

//教学中心 高端班(班主任)
const TeachCenterAdviser = () => import('@/pages/teachcenter/teachcenterlayoutadviser')
const StudentManageAdviser = () => import('@/pages/teachcenter/components/studentmanageadviser')
const PlanAdviser = () => import('@/pages/teachcenter/components/planadviser')

//教学中心 小班课
const TeachCenterSmallClass = () => import('@/pages/teachsmallclass/smallclasslayout')
const StudentManageSmallClass = () => import('@/pages/teachsmallclass/components/studentmanage')
const PlanSmallClass = () => import('@/pages/teachsmallclass/components/plan')

//教学中心 1对1
const TeachCenterOneToOne = () => import('@/pages/teachonetoone/onetoonelayout')
const PlanOneToOne = () => import('@/pages/teachonetoone/components/plan')

//list
const List = () => import('@/pages/list/listlayout')
const ListLiveVideo = () => import('@/pages/list/components/livevideo')
const ListTutor = () => import('@/pages/list/components/tutor')


//个人中心
const UserCenter = () => import('@/pages/usercenter/uclayout')
const Study = () => import('@/pages/usercenter/components/study')
const Teach = () => import('@/pages/usercenter/components/study')


//他人中心
const OtherCenter = () => import('@/pages/othercenter/oclayout')
const OCLiveVideo = () => import('@/pages/othercenter/components/livevideo')


//编辑服务
const EditLO = () => import('@/pages/editservice/editlayout')
const EditLiveVideo = () => import('@/pages/editservice/component/livevideo')

//home
const Home = () => import('@/pages/home')

//admin login
const AdminLogin = () => import('@/pages/admin/login')


Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'home',
            name: 'Layout',
            component: Layout,
            meta: {
                requiresAuth: true,
                keepAlive: false,
            },
            children: [{
                path: 'home',
                component: Home,
            },
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
                },
                {
                    path: 'study',
                    component: TutorStudyCenter,
                    meta: {
                        requireRole: 'student'
                    }
                },
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
                        component: ClassManage,
                        name: 'ClassManage'
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
            {
                path: 'teachcenteradviser/:id',
                component: TeachCenterAdviser,
                name: 'TeachCenterAdviser',
                redirect: 'teachcenteradviser/:id/studentmanage',
                children: [
                    {
                        path: 'studentmanage',
                        component: StudentManageAdviser
                    },
                    {
                        path: 'plan',
                        component: PlanAdviser
                    },
                ]
            },
            //小班课
            {
                path: 'smallclass/:id',
                component: TeachCenterSmallClass,
                name: 'TeachCenterSmallClass',
                redirect: 'smallclass/:id/studentmanage',
                children: [
                    {
                        path: 'studentmanage',
                        component: StudentManageSmallClass
                    },
                    {
                        path: 'plan',
                        component: PlanSmallClass
                    },
                ]
            },
            // 1对1
            {
                path: 'onetoone/:id',
                component: TeachCenterOneToOne,
                name: 'TeachCenterOneToOne',
                redirect: 'onetoone/:id/plan',
                children: [
                    {
                        path: 'plan',
                        component: PlanOneToOne
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
        },
        { path:'/admin', component: AdminLogin}
    ],
    scrollBehavior: () => ({ y: 0 }),
    // mode: 'history',
});

import {adminRoutes}  from './admin';
router.addRoutes(adminRoutes);

router.beforeEach((to, from, next) => {
    // if(to.meta.requireRole != store.state.role){
    //     next('/');
    // }
    next();
})

export default router;