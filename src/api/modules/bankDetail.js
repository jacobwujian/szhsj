import request from '@/utils/request'
const obj = {}

// 系统管理-银行信息管理
/**
 * 查询银行信息
 * @returns
 */
obj.selectBankDetails = function(params) {
  return request({
    url: '/api/bankDetail/selectBankDetails',
    method: 'get',
	params
  })
}
/**
 * 导入银行信息
 * @param {*} data
 * @returns
 */
obj.insertBankDetails = function(data) {
  return request({
    url: '/api/bankDetail/insertBankDetails',
    method: 'post',
    data
  })
}

export default obj
