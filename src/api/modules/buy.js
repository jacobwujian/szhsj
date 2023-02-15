import request from '@/utils/request'
const obj = {}

// 采购与付款
/**
 * 合同管理
 * 单价异常清单
 * @param {*} data
 * @returns
 */
obj.selectUnitPriceExceptionList = function(data) {
  return request({
    url: '/procurementAndPayment/contractManagement/selectUnitPriceExceptionList',
    method: 'post',
    data
  })
}
/**
 * 合同管理
 * 采购合同逾期
 * @param {*} data
 * @returns
 */
obj.selectOverduePurchaseContract = function(data) {
  return request({
    url: '/procurementAndPayment/contractManagement/selectOverduePurchaseContract',
    method: 'post',
    data
  })
}

/**
 * 授信管理
 * 预付款金额超授信额度供应商清单
 * @param {*} data
 * @returns
 */
obj.selectOverCreditCustomers = function(data) {
  return request({
    url: '/procurementAndPayment/creditManagement/selectOverCreditCustomers',
    method: 'post',
    data
  })
}

export default obj
