import $http from './service.js';

/**
 * getGameList 获取游戏列表
 * @param  {string} channelId  隶属渠道的id
 * @return {object}       返回结果 
 */
export const create = (params)=>$http('post', '/admin/create', params);
export const login = (params)=>$http('post', '/admin/login', params);
export const logout = (params)=>$http('get', '/admin/logout', params);
