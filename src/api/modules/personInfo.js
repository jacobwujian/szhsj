import request from '@/utils/request'
const obj = {}

// 系统管理-人员信息管理
/**
 * 查询人员信息
 * @returns
 */
obj.selectPersonInfos = function(params) {
  return request({
    url: '/api/personInfo/selectPersonInfos',
    method: 'get',
	params
  })
}
/**
 * 导入人员信息
 * @param {*} data
 * @returns
 */
obj.insertPersonInfos = function(data) {
  return request({
    url: '/api/personInfo/insertPersonInfos',
    method: 'post',
    data
  })
}

export default obj
