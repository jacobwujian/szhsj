import request from '@/utils/request'
const obj = {}

/**
 * 查询数据导入
 * @method
 * @name selectTaskManage
 * @data {}
 */
obj.selectTaskManage = function(data) {
	return request({
		url: '/api/dataImport/selectTaskManage',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 数据导入
 * @method
 * @name openImport
 * @param {}
 */
obj.openImport = function(data) {
	return request({
		url: '/api/dataImport/openImport',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 新增数据导入
 * @method
 * @name insertTaskManage
 * @param {}
 */
 obj.insertTaskManage = function(data) {
	return request({
		url: '/api/dataImport/insertTaskManage',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 抽取采购合同信息表数据
 * @method
 * @name extractMPurchaseContract
 * @param {}
 */
 obj.extractMPurchaseContract = function(data) {
	return request({
		url: '/api/dataImport/extractMPurchaseContract',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 抽取销售合同信息表数据
 * @method
 * @name extractMSalesContract
 * @param {}
 */
 obj.extractMSalesContract = function(data) {
	return request({
		url: '/api/dataImport/extractMSalesContract',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 抽取授信扩展表数据
 * @method
 * @name extractMCreditExtension
 * @param {}
 */
 obj.extractMCreditExtension = function(data) {
	return request({
		url: '/api/dataImport/extractMCreditExtension',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 采购合同逾期 数据
 * @method
 * @name ImportEPurchaseContractOverdue
 * @param {}
 */
 obj.ImportEPurchaseContractOverdue = function(data) {
	return request({
		url: '/api/dataImport/ImportEPurchaseContractOverdue',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 采购单价异常清单 数据
 * @method
 * @name ImportEPurchasePricesAbnormal
 * @param {}
 */
 obj.ImportEPurchasePricesAbnormal = function(data) {
	return request({
		url: '/api/dataImport/ImportEPurchasePricesAbnormal',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 预付款金额超授信额度供应商清单 数据
 * @method
 * @name ImportEPrepaymentAmountAbnormal
 * @param {}
 */
 obj.ImportEPrepaymentAmountAbnormal = function(data) {
	return request({
		url: '/api/dataImport/ImportEPrepaymentAmountAbnormal',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 价格异常销售清单 数据
 * @method
 * @name ImportESalesPricesAbnormal
 * @param {}
 */
 obj.ImportESalesPricesAbnormal = function(data) {
	return request({
		url: '/api/dataImport/ImportESalesPricesAbnormal',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 销售合同逾期 数据
 * @method
 * @name ImportESalesContractOverdue
 * @param {}
 */
 obj.ImportESalesContractOverdue = function(data) {
	return request({
		url: '/api/dataImport/ImportESalesContractOverdue',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 赊账金额超授信额度客户清单 数据
 * @method
 * @name ImportECreditAmountAbnormal
 * @param {}
 */
 obj.ImportECreditAmountAbnormal = function(data) {
	return request({
		url: '/api/dataImport/ImportECreditAmountAbnormal',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 导入 授信额度设置非正常客户清单 数据
 * @method
 * @name ImportECreditLineAbnormal
 * @param {}
 */
 obj.ImportECreditLineAbnormal = function(data) {
	return request({
		url: '/api/dataImport/ImportECreditLineAbnormal',
		method: 'post',
		data,
		domain: 'cw'
	})
}

export default obj
