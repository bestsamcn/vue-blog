import * as types from '../mutation-types.js';

const state = {
    iShowLoading:false,
    iShowMenu:false,
    iShowToast:false,
    toastMsg:'未知错误',
    isMobile:false,
    token:''

}

const getters = {
    iShowLoading:state=>state.iShowLoading,
    iShowMenu:state=>state.iShowMenu,
    iShowToast:state=>state.iShowToast,
    isMobile:state=>state.isMobile,
    token:state=>state.token
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
        commit(types.SET_TOKEN);
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
    },
    [types.DEL_TOKEN](state){
        state.token = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}