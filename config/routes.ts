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
