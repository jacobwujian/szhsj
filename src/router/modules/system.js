export default {
  path: 'systerm',
  name: 'systemManagement',
  meta: {
    title: '系统管理',
    icon: 'setting',
    noTouch: true
  },
  order: 12,
  component: () => import('@/views/base/index.vue'),
  children: [
    {
      path: 'permission',
      component: () => import('@/views/systerm/permission.vue'),
      name: 'rolePermissionManagement',
      meta: { title: '角色权限' }
    },
    {
      path: 'account',
      component: () => import('@/views/systerm/account.vue'),
      name: 'accountManagement',
      meta: { title: '账户管理' }
    },
    {
      path: 'importdata',
      component: () => import('@/views/systerm/importData/index.vue'),
      name: 'importData',
      meta: { title: '数据导入' }
    },
    {
      path: 'menu',
      component: () => import('@/views/systerm/menuManagement2'),
      name: 'menuManagement',
      meta: { title: '菜单管理' }
    }
  ]
}
