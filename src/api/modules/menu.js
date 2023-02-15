import request from '@/utils/request'
const obj = {}

/**
 * 获取菜单及其元素列表
 * @method
 * @name getMenuList

 */
obj.getMenuList = function(params) {
  return request({
    url: '/api/menu/getMenuList',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 获取全部限权
 * @param {*} params
 * @returns
 */
obj.getAllMenu = function(params) {
  return request({
    url: '/api/menu/getAllMenu',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 获取当前用户菜单
 * @method
 * @name getUserMenu

 */
obj.getUserMenu = function(params) {
  return request({
    url: '/api/menu/getUserMenu',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 菜单管理 获取菜单
 * @param {*} params
 * @returns
 */
obj.getMenu = function(params) {
  return request({
    url: '/api/menu/getMenu',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 菜单管理 新增菜单
 * @param {*} data
 * @returns
 */
obj.addMenu = function(data) {
  return request({
    url: '/api/menu/addMenu',
    method: 'post',
    data
  })
}

/**
 * 菜单管理 更新菜单
 * @param {*} data
 * @returns
 */
obj.updateMenu = function(data) {
  return request({
    url: '/api/menu/updateMenu',
    method: 'post',
    data
  })
}

/**
 * 菜单管理 删除菜单
 * @param {*} data
 * @returns
 */
obj.deleteMenu = function(data) {
  return request({
    url: '/api/menu/deleteMenu',
    method: 'post',
    data
  })
}

export default obj
