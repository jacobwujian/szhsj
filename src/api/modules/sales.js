import request from '@/utils/request'
const obj = {}

// 销售与收款
/**
 * 授信管理
 * 授信额度设置超限户清单
 * @param {*} data
 * @returns
 */
obj.selectCreditGrant = function(data) {
  return request({
    url: '/salesAndCollection/creditManagement/selectCreditGrant',
    method: 'post',
    data
  })
}
/**
 * 授信管理
 * 赊账金额超授信额度客户清单
 * @param {*} data
 * @returns
 */
obj.selectOverLimit = function(data) {
  return request({
    url: '/salesAndCollection/creditManagement/selectOverLimit',
    method: 'post',
    data
  })
}
/**
 * 合同管理
 * 销售合同逾期
 * @param {*} data
 * @returns
 */
obj.selectSalOrder = function(data) {
  return request({
    url: '/salesAndCollection/contractManagement/selectSalOrder',
    method: 'post',
    data
  })
}

/**
 * 履约管理
 * 价格异常销售清单
 * @param {*} data
 * @returns
 */
obj.selectSalOrderG = function(data) {
  return request({
    url: '/salesAndCollection/performanceManagement/selectSalOrderG',
    method: 'post',
    data
  })
}

export default obj
