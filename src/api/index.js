import $http from './service.js';

/**
 * getGameList 获取游戏列表
 * @param  {string} channelId  隶属渠道的id
 * @return {object}       返回结果 
 */
export const createAdmin = (params)=>$http('post', '/admin/createAdmin', params);
export const adminLogin = (params)=>$http('post', '/admin/adminLogin', params);
export const adminLogout = (params)=>$http('get', '/admin/adminLogout', params);
