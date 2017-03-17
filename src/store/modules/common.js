import * as types from '../mutation-types.js';

const state = {
    iShowLoading:false,
    iShowMenu:false,
    iShowToast:false,
    toastMsg:'未知错误'

}

const getters = {
    iShowLoading:state=>state.iShowLoading,
    iShowMenu:state=>state.iShowMenu,
    iShowToast:state=>state.iShowToast
}

const actions = {
    setShowLoading({commit}){
        commit(types.SET_SHOW_LOADING);
    },
    setHideLoading({commit}){
        commit(types.SET_HIDE_LOADING);
    },
    setToggleMenu({commit}){
        commit(types.SET_TOGGLE_MENU);
    },
    setToast({commit}, msg){
        commit(types.SET_TOAST, true, msg);
        setTimeout(()=>{
            commit(types.SET_TOAST, false, '');
        },2000);
    }
}

const mutations = {
    [types.SET_SHOW_LOADING](state){
        state.iShowLoading = true;
    },
    [types.SET_HIDE_LOADING](state){
        state.iShowLoading = false;
    },
    [types.SET_TOGGLE_MENU](state){
        state.iShowMenu = !state.iShowMenu;
    },
    [types.SET_TOAST](state, show, msg){
        state.toastMsg = msg || '未知错误';
        state.iShowToast = show;
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}