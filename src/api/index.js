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
export const addTag = (params)=>$http('post', '/tag/add', params, true);
export const delTag = (params)=>$http('get', '/tag/delete', params, true);
export const editTag = (params)=>$http('post', '/tag/edit', params, true);

//分类
export const getCategoryList = (params)=>$http('get', '/category/getList', params);
export const addCategory = (params)=>$http('post', '/category/add', params, true);
export const delCategory = (params)=>$http('get', '/category/delete', params, true);
export const editCategory = (params)=>$http('post', '/category/edit', params, true);

//留言
export const addMessage = (params)=>$http('post', '/message/add', params, true);
export const delMessage = (params)=>$http('get', '/message/delete', params, true);
export const getMessageDetail = (params)=>$http('get', '/message/getDetail', params, true);
export const getMessageList = (params)=>$http('get', '/message/getList', params);
