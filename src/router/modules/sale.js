export default {
	path: 'sale',
	component: () => import('@/views/base/index'),
	name: 'salesCollection',
	meta: {
		title: '销售与收款',
		noLayout: true,
		noTouch: true,
		icon: 'account-book'
	},
	order: 0,
	children: [
		// {
		// 	path: 'sale1',
		// 	component: () => import('@/views/base/index'),
		// 	name: 'sale1',
		// 	meta: {
		// 		noTouch: true,
		// 		title: '销售与客户管理'
		// 	},
		// 	children: [
		// 		{
		// 		path: 'sale1c1',
		// 		component: () => import('@/views/base/index'),
		// 		name: 'sale1c1',
		// 		meta: {
		// 			title: '资料不完整销售客户清单'
		// 		}
		// 	}, {
		// 		path: 'sale1c2',
		// 		component: () => import('@/views/base/index'),
		// 		name: 'sale1c2',
		// 		meta: {
		// 			title: '销售客户基础信息查询'
		// 		}
		// 	}, {
		// 		path: 'sale1c3',
		// 		component: () => import('@/views/base/index'),
		// 		name: 'sale1c3',
		// 		meta: {
		// 			title: '资质审核不合规客户清单'
		// 		}
		// 	}, {
		// 		path: 'sale1c4',
		// 		component: () => import('@/views/base/index'),
		// 		name: 'sale1c4',
		// 		meta: {
		// 			title: '销售客户业务量异常分析'
		// 		}
		// 	}, {
		// 		path: 'sale1c5',
		// 		component: () => import('@/views/base/index'),
		// 		name: 'sale1c5',
		// 		meta: {
		// 			title: '销售客户欠款时长分析'
		// 		}
		// 	}
		// ]
		// },
		{
			path: 'sale2',
			component: () => import('@/views/base/index'),
			name: 'saleCreditManagement',
			meta: {
				noTouch: true,
				title: '授信管理'
			},
			children: [
				// {
				// 	path: 'sale2c1',
				// 	component: () => import('@/views/sale/sale2/sale2c1/sale2c1.vue'),
				// 	name: 'sale2c1',
				// 	meta: {
				// 		title: '授信额度审核不合规客户清单'
				// 	}
				// },
				{
					path: 'sale2c2',
					component: () => import('@/views/sale/sale2/sale2c2/sale2c2.vue'),
					name: 'creditLineSetAbnormalCustomerList',
					meta: {
						title: '授信额度设置非正常客户清单'
					}
				},
				{
					path: 'sale2c3',
					component: () => import('@/views/sale/sale2/sale2c3/sale2c3.vue'),
					name: 'listOfCustomersWhoExceedCreditLimit',
					meta: {
						title: '赊账金额超授信额度客户清单'
					}
				}
			]
		},
		{
			path: 'sale3',
			component: () => import('@/views/base/index'),
			name: 'saleContractManagement',
			meta: {
				noTouch: true,
				title: '合同管理'
			},
			noTouch: true,
			children: [
			// 	{
			// 	path: 'sale3c1',
			// 	component: () => import('@/views/sale/sale3/sale3c1/sale3c1.vue'),
			// 	name: 'sale3c1',
			// 	meta: {
			// 		title: '签订流程不合规合同清单'
			// 	}
			// }, {
			// 	path: 'sale3c2',
			// 	component: () => import('@/views/sale/sale3/sale3c2/sale3c2.vue'),
			// 	name: 'sale3c2',
			// 	meta: {
			// 		title: '大额合同信息'
			// 	}
			// },
			{
				path: 'sale3c3',
				component: () => import('@/views/sale/sale3/sale3c3/sale3c3.vue'),
				name: 'overdueSalesContract',
				meta: {
					title: '销售合同逾期'
				}
			}]
		},
		{
			path: 'sale4',
			component: () => import('@/views/sale/index'),
			name: 'salePerformanceManagement',
			meta: {
				noTouch: true,
				title: '履约管理'
			},
			noTouch: true,
			children: [{
					path: 'sale4c1',
					component: () => import('@/views/sale/sale4/sale4c1/sale4c1.vue'),
					name: 'priceAbnormalSalesList',
					meta: {
						title: '价格异常销售清单'
					}
				}
				// ,
				// {
				// 	path: 'sale4c2',
				// 	component: () => import('@/views/sale/sale4/sale4c2/sale4c2.vue'),
				// 	name: 'sale4c2',
				// 	meta: {
				// 		title: '汇款不及时销售清单'
				// 	}
				// },
				// {
				// 	path: 'sale4c3',
				// 	component: () => import('@/views/sale/sale4/sale4c3/sale4c3.vue'),
				// 	name: 'sale4c3',
				// 	meta: {
				// 		title: '逾期未收取罚息合同清单'
				// 	}
				// }
			]
		}
	]
}
