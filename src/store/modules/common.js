import * as types from '../mutation-types.js';

const state = {
    iShowLoading:false,
    iShowMenu:false,
    iShowToast:false,
    toastMsg:'未知错误',
    isMobile:false,
    token:'',
    isLogin:false,
    clientHeight:0,
    hotList:[
        {name:'vue', id:1},
        {name:'前端', id:2},
        {name:'服务端', id:3},
        {name:'vue优化', id:4},
        {name:'redis操作', id:5},
        {name:'框架', id:6},
        {name:'闭包', id:7},
        {name:'react native', id:8},
        {name:'nginx', id:9},
        {name:'linux', id:10}
    ],
    hotWord:{
        isFromHotWord:false,
        name:''
    },
    articleParams:{
        category:'',
        tag:'',
        isFromHome:false
    }
}

const getters = {
    iShowLoading:state=>state.iShowLoading,
    iShowMenu:state=>state.iShowMenu,
    iShowToast:state=>state.iShowToast,
    isMobile:state=>state.isMobile,
    token:state=>state.token,
    isLogin:state=>state.isLogin,
    hotList:state=>state.hotList,
    hotWord:state=>state.hotWord,
    articleParams:state=>state.articleParams
}

const actions = {
    setShowLoading({commit}){
        commit(types.SET_SHOW_LOADING);
    },
    setHideLoading({commit}){
        commit(types.SET_HIDE_LOADING);
    },
    setToggleMenu({commit},iShow){
        commit(types.SET_TOGGLE_MENU, iShow);
    },
    setToast({commit}, str){
        let obj = {msg:str, show:true}
        commit(types.SET_TOAST, obj);
        setTimeout(()=>{
            obj.show = false;
            commit(types.SET_TOAST, obj);
        },2000);
    },
    setMobile({commit}, flag){
        commit(types.SET_MOBILE, flag);
    },
    setToken({commit}, token){
        commit(types.SET_TOKEN, token);
    },
    delToken({commit}){
        commit(types.DEL_TOKEN);
    },
    setLogin({commit}, isLogin){
        commit(types.SET_LOGIN, isLogin);
    },
    setHotWord({commit}, hotWord){
        commit(types.SET_HOT_WORD, hotWord);
    },
    setArticleParams({commit}, articleParams){
        commit(types.SET_ARTICLE_PARAMS, articleParams);
    }
}

const mutations = {
    [types.SET_SHOW_LOADING](state){
        state.iShowLoading = true;
    },
    [types.SET_HIDE_LOADING](state){
        state.iShowLoading = false;
    },
    [types.SET_TOGGLE_MENU](state, iShow){
        if(arguments.length === 2 && typeof arguments[1] !== 'undefined'){
           state.iShowMenu = iShow;
           return; 
        }
        state.iShowMenu = !state.iShowMenu;
    },
    [types.SET_TOAST](state, payload){
        state.iShowToast = payload.show;
        state.toastMsg = payload.msg;
    },
    [types.SET_MOBILE](state, flag){
        state.isMobile = flag;
    },
    [types.SET_TOKEN](state, token){
        state.token = token;
        !!state.token && (state.isLogin = true);
    },
    [types.DEL_TOKEN](state){
        state.token = '';
        state.isLogin = false;
    },
    [types.SET_LOGIN](state){
        state.isLogin = isLogin;
    },
    [types.SET_HOT_WORD](state, hotWord){
        state.hotWord.name = hotWord.name;
        state.hotWord.isFromHotWord = hotWord.isFromHotWord;
    },
    [types.SET_ARTICLE_PARAMS](state, articleParams){
        state.articleParams = articleParams;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}