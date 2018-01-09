const menus = [
    {
        displayName: '报表导入',
        key: 'report-import',
        subMenu: [
            {
                displayName: '销售记录查询',
                key: 'saleorder-searchlist',
                auth: [],
            },
            {
                displayName: '销售报表导入',
                key: 'salerecord-import',
                auth: [],
            },
            {
                displayName: '当日未销售综合体查询',
                key: 'unsaleordersearch',
                auth: [],
            },
            {
                displayName: '要货单导入',
                key: 'require-import',
                auth: [],
            },
            {
                displayName: '要货单查询',
                key: 'require-shop-search',
                auth: [],
            },
        ],
    },
];

module.exports = menus;
