import $http from './service.js';

//权限
export const login = (params)=>$http('post', '/admin/login', params, true);
export const logout = (params)=>$http('get', '/admin/logout', params);
export const getPreviewTotal = (params)=>$http('get', '/admin/getPreviewTotal', params);
export const delAccess = (params)=>$http('get', '/admin/delAccess', params);
export const getAccessList = (params)=>$http('get', '/admin/getAccessList', params);

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


//热词
export const getHotWordList = (params)=>$http('get', '/hot/getList', params);
export const addHotWord = (params)=>$http('post', '/hot/add', params, true);
export const delHotWord = (params)=>$http('get', '/hot/delete', params, true);
export const editHotWord = (params)=>$http('post', '/hot/edit', params, true);

//留言
export const addMessage = (params)=>$http('post', '/message/add', params, true);
export const delMessage = (params)=>$http('get', '/message/delete', params, true);
export const getMessageDetail = (params)=>$http('get', '/message/getDetail', params, true);
export const getMessageList = (params)=>$http('get', '/message/getList', params);


//文章
export const addArticle = (params)=>$http('post', '/article/add', params, true);
export const delArticle = (params)=>$http('get', '/article/delete', params, true);
export const editArticle = (params)=>$http('post', '/article/edit', params, true);
export const getArticleList = (params)=>$http('get', '/article/getList', params, true);
export const getArticleDetail = (params)=>$http('get', '/article/getDetail', params, true);
export const likeArticle = (params)=>$http('post', '/article/like', params);
export const getDiffArticle = (params)=>$http('get', '/article/getDiffArticle', params, true);

//评论
export const addComment = (params)=>$http('post', '/comment/add', params, true);
export const getCommentList = (params)=>$http('get', '/comment/getList', params, true);
export const setCommentLike = (params)=>$http('post', '/comment/like', params, true);
export const delComment = (params)=>$http('get', '/comment/delete', params, true);
