const AdminLayout = () =>
    import ('@/pages/admin')

export const adminRoutes = [{
        path: '/manage/service/type1',
        name: 'ServiceLayout1',
        component: AdminLayout,
        meta: { title: '服务管理', icon: 'qq', type: 'service' },
        children: [{
                path: 'res',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '服务', icon: 'qq' }
            },
            {
                path: 'lv',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '资料', icon: 'qq' }
            }
        ]
    },
    {
        path: '/manage/service/type2',
        name: 'ServiceLayout2',
        component: AdminLayout,
        meta: { title: '需求管理', icon: 'qq', type: 'service' },
        children: [{
                path: 'res',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '服务', icon: 'qq' }
            },
            {
                path: 'lv',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '资料', icon: 'qq' }
            }
        ]
    },
    {
        path: '/manage/message/type2',
        name: 'MessageLayout1',
        component: AdminLayout,
        meta: { title: '需求管理', icon: 'qq', type: 'message' },
        children: [{
                path: 'res',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '服务', icon: 'qq' }
            },
            {
                path: 'lv',
                component: () =>
                    import ('@/pages/admin/pages/service/res'),
                meta: { title: '资料', icon: 'qq' }
            }
        ]
    }
];