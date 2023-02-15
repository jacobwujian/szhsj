import request from '@/utils/request'
const obj = {}

/**
 * 授信额度赊账超限清单
 * @method
 * @name creditLine
 * @data {}
 */
obj.creditLine = function(data) {
	return request({
		url: '/api/abromal/creditLine',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 授信额度赊账超限清单环比
 * @method
 * @name creditLineCount
 * @param {}
 */
obj.creditLineCount = function(param) {
	return request({
		url: '/api/abromal/creditLineCount',
		method: 'get',
		param,
		domain: 'cw'
	})
}

/**
 * 赊账金额超授信额度客户清单
 * @method
 * @name creditAmount
 * @data {}
 */
obj.creditAmount = function(data) {
	return request({
		url: '/api/abromal/creditAmount',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 赊账金额超授信额度客户清单环比
 * @method
 * @name creditAmountCount
 * @param {}
 */
obj.creditAmountCount = function(param) {
	return request({
		url: '/api/abromal/creditAmountCount',
		method: 'get',
		param,
		domain: 'cw'
	})
}

/**
 * 销售合同逾期
 * @method
 * @name contractOverdue
 * @data {}
 */
obj.contractOverdue = function(data) {
	return request({
		url: '/api/abromal/contractOverdue',
		method: 'post',
		data,
		domain: 'cw'
	})
}

/**
 * 销售合同逾期环比
 * @method
 * @name contractOverdueCount
 * @param {}
 */
obj.contractOverdueCount = function(param) {
	return request({
		url: '/api/abromal/contractOverdueCount',
		method: 'get',
		param,
		domain: 'cw'
	})
}

export default obj
