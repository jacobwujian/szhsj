export default {
	path: 'build',
	component: () => import('@/views/base/index'),
	name: 'productionCirculationInventory',
	meta: {
		title: '生产流通与存货',
		noLayout: true,
		noTouch: true,
		icon: 'account-book'
	},
	order: 2,
	children: [{
			path: 'build1',
			component: () => import('@/views/base/index'),
			name: 'warehouseManagement',
			meta: {
				noTouch: true,
				title: '仓库管理'
			},
			children: [{
				path: 'build1c1',
				component: () => import('@/views/base/index'),
				name: 'warehouseSelectsNonComplianceList',
				meta: {
					title: '仓库选择不合规清单'
				}
			}, {
				path: 'build1c2',
				component: () => import('@/views/base/index'),
				name: 'listOfTrustBkWhInThreeYears',
				meta: {
					title: '近三年失信仓库清单'
				}
			}]
			// },
			// {
			// 	path: 'build2',
			// 	component: () => import('@/views/base/index'),
			// 	name: 'build2',
			// 	meta: {
			// 		noTouch: true,
			// 		title: '账实管理'
			// 	},
			// 	children: [{
			// 		path: 'build2c1',
			// 		component: () => import('@/views/base/index'),
			// 		name: 'build2c1',
			// 		meta: {
			// 			title: '经销存台账不一致'
			// 		}
			// 	}]
			// },
			// {
			// 	path: 'build3',
			// 	component: () => import('@/views/base/index'),
			// 	name: 'build3',
			// 	meta: {
			// 		noTouch: true,
			// 		title: '出入库管理'
			// 	},
			// 	children: [{
			// 		path: 'build3c1',
			// 		component: () => import('@/views/base/index'),
			// 		name: 'build3c1',
			// 		meta: {
			// 			title: '货权转移缺失交易记录'
			// 		}
			// 	}, {
			// 		path: 'build3c2',
			// 		component: () => import('@/views/base/index'),
			// 		name: 'build3c2',
			// 		meta: {
			// 			title: '仓库提单不合规记录'
			// 		}
			// 	}]
			 }
		]
	}
