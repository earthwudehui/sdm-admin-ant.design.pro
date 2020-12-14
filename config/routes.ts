export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/DashboardAnalysis',
    name: 'DashboardAnalysis',
    icon: 'smile',
    component: './DashboardAnalysis',
  },
  {
    path: '/FzBrandAdManage',
    name: '分众广告投放管理',
    icon: 'TeamOutlined',
    access: 'canAdmin',
    routes: [
      {
        path: '/FzBrandAdManage/FzBrandProject',
        name: '品牌投放项目管理',
        routes: [
          { path: '/FzBrandAdManage/FzBrandProject', redirect: '/FzBrandAdManage/FzBrandProject/list' },
          {
            path: '/FzBrandAdManage/FzBrandProject/list',
            component: './FzBrandAdManage/FzBrandProject/list',
            name: '列表',
            hideInMenu: true,
          },
        ]
      },
      {
        path: '/FzBrandAdManage/FzProjectAd',
        name: '项目广告管理',
        routes: [
          { path: '/FzBrandAdManage/FzProjectAd', redirect: '/FzBrandAdManage/FzProjectAd/list' },
          {
            path: '/FzBrandAdManage/FzProjectAd/list',
            component: './FzBrandAdManage/FzProjectAd/list',
            name: '列表',
            hideInMenu: true,
          },
          {
            path: '/FzBrandAdManage/FzProjectAd/add',
            component: './FzBrandAdManage/FzProjectAd/add',
            hideInMenu: true,
            name: '新增',
            parentKeys: ['/FzBrandAdManage/FzBrandProject/list'],
          },
        ]
      },

    ],
  },
  {
    path: '/sysmanage',
    name: '系统管理',
    icon: 'TeamOutlined',
    access: 'canAdmin',
    routes: [
      {
        path: '/sysmanage/resmanage',
        name: '资源管理',
        icon: 'TeamOutlined',
        routes: [
            {
              path: '/sysmanage/resmanage/usermanage',
              name: '用户管理',
              routes: [
                { path: '/sysmanage/resmanage/usermanage', redirect: '/sysmanage/resmanage/usermanage/list' },
                {
                  path: '/sysmanage/resmanage/usermanage/list',
                  component: './sysmanage/resmanage/usermanage/list',
                  name: '列表',
                  hideInMenu: true,
                },
                {
                  path: '/sysmanage/resmanage/usermanage/add',
                  component: './sysmanage/resmanage/usermanage/add',
                  hideInMenu: true,
                  name: '新增',
                  parentKeys: ['/sysmanage/resmanage/usermanage/list'],
                },
              ]
            },
            {
              path: '/sysmanage/resmanage/rolemanage',
              name: '角色管理',
              component: './sysmanage/resmanage/usermanage/list',
            },   {
              path: '/sysmanage/resmanage/menumanage',
              name: '菜单管理',
              component: './ListTableListTwo',
            },
        ]
      },

    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
