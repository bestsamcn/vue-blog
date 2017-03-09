import * as types from '../mutation-types.js';

const state = {
    iShowLoading:false
}

const getters = {
    iShowLoading:state=>state.iShowLoading
}

const actions = {
    setShowLoading({commit}){
        commit(types.SET_SHOW_LOADING);
    },
    setHideLoading({commit}){
        commit(types.SET_HIDE_LOADING);
    }
}

const mutations = {
    [types.SET_SHOW_LOADING](state){
        state.iShowLoading = true;
    },
    [types.SET_HIDE_LOADING](state){
        state.iShowLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}