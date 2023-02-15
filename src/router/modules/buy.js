export default {
  path: 'buy',
  component: () => import('@/views/base/index'),
  name: 'purchasePayment',
  meta: {
    title: '采购与付款',
    noLayout: true,
    noTouch: true,
    icon: 'shopping-cart'
  },
  order: 1,
  children: [
    // {
    //   path: 'buy1',
    //   component: () => import('@/views/base/index'),
    //   name: 'buy1',
    //   meta: {
    //     noTouch: true,
    //     title: '供应商管理'
    //   },
    //   noTouch: true,
    //   children: [
    //     {
    //       path: 'buy1c1',
    //       component: () => import('@/views/base/index'),
    //       name: 'buy1c1',
    //       meta: {
    //         title: '资料不完整供应商清单'
    //       }
    //     },
    //     {
    //       path: 'buy1c2',
    //       component: () => import('@/views/base/index'),
    //       name: 'buy1c2',
    //       meta: {
    //         title: '资质审核不合规客户清单'
    //       }
    //     },
    //     {
    //       path: 'buy1c3',
    //       component: () => import('@/views/base/index'),
    //       name: 'buy1c3',
    //       meta: {
    //         title: '供应商业务量异常分析'
    //       }
    //     }
    //   ]
    // },
    {
      path: 'buy2',
      component: () => import('@/views/base/index'),
      name: 'buyCreditManagement',
      meta: {
        noTouch: true,
        title: '授信管理'
      },
      noTouch: true,
      children: [
        // {
        //   path: 'buy2c1',
        //   component: () => import('@/views/base/index'),
        //   name: 'buy2c1',
        //   meta: {
        //     title: '授信额度审核不合规客户清单'
        //   }
        // },
        {
          path: 'buy2c2',
          component: () => import('@/views/buy/buy2/buy2c2/buy2c2.vue'),
          name: 'listOfSuppliersWhAayECreditLimit',
          meta: {
            title: '预付款金额超授信额度供应商清单'
          }
        }
      ]
    },
    {
      path: 'buy3',
      component: () => import('@/views/base/index'),
      name: 'buyContractManagement',
      meta: {
        noTouch: true,
        title: '合同管理'
      },
      noTouch: true,
      children: [
        // {
        //   path: 'temp',
        //   component: () => import('@/views/buy/buy3/temp/buy3c2.vue'),
        //   name: 'temp',
        //   meta: {
        //     title: '临时'
        //   }
        // },
        // {
        //   path: 'buy3c2',
        //   component: () => import('@/views/buy/buy3/buy3c2/buy3c2.vue'),
        //   name: 'buy3c2',
        //   meta: {
        //     title: '临时1'
        //   }
        // },
        {
          path: 'buy3c3',
          component: () => import('@/views/buy/buy3/buy3c3/buy3c3.vue'),
          name: 'purchaseUnitPriceAbnormalList',
          meta: {
            title: '采购单价异常清单'
          }
        },
        {
          path: 'buy3c4',
          component: () => import('@/views/buy/buy3/buy3c4/buy3c4.vue'),
          name: 'overduePurchaseContract',
          meta: {
            title: '采购合同逾期'
          }
        }
      ]
    }
    // ,
    // {
    //   path: 'buy4',
    //   component: () => import('@/views/base/index'),
    //   name: 'buy4',
    //   meta: {
    //     noTouch: true,
    //     title: '履约管理'
    //   },
    //   noTouch: true,
    //   children: [
    //     {
    //       path: 'buy4c1',
    //       component: () => import('@/views/base/index'),
    //       name: 'buy4c1',
    //       meta: {
    //         title: '履约不及时交货记录清单'
    //       }
    //     }
    //   ]
    // }
  ]
}
