export default {
  path: 'internalControl',
  name: 'internalControlMent',
  meta: {
    title: '内控管理',
    icon: 'setting',
    noTouch: true
  },
  order: 4,
  component: () => import('@/views/base/index.vue'),
  children: [
    {
      path: 'approvalExamination',
      component: () => import('@/views/internalControl/approvalProcedure/approvalProcedureExceptionList.vue'),
      name: 'approvalProcedureExceptionList',
      meta: { title: '审批程序异常清单（测试）' }
    }
  ]
}
