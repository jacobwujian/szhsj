import request from '@/utils/request'
const obj = {}

/**
 * 内控查询
 * @method
 * @name selectApprovalExamination
 * @data {}
 */
obj.selectApprovalExamination = function(data) {
	return request({
		url: '/api/approvalExamination/selectApprovalExamination',
		method: 'post',
		data,
		domain: 'cw'
	})
}

export default obj
