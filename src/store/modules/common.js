import * as types from '../mutation-types.js';

const state = {
    iShowLoading:false,
    iShowMenu:false
}

const getters = {
    iShowLoading:state=>state.iShowLoading,
    iShowMenu:state=>state.iShowMenu
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}