import $http from './service.js';

/**
 * getGameList 获取游戏列表
 * @param  {string} channelId  隶属渠道的id
 * @return {object}       返回结果 
 */
export const create = (params)=>$http('post', '/admin/create', params);
export const login = (params)=>$http('post', '/admin/login', params, true);
export const logout = (params)=>$http('get', '/admin/logout', params);

//标签
export const getTagList = (params)=>$http('get', '/tag/getList', params);
export const addTag = (params)=>$http('post', '/tag/add', params);
export const delTag = (params)=>$http('get', '/tag/delete', params);
export const editTag = (params)=>$http('post', '/tag/edit', params);

//分类
export const addArticle = (params)=>$http('post', '/article/add', params);
