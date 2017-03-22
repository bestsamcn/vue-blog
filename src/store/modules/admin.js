import * as type from '../mutation-types.js';


const state={
    isHideSidebar:true
}

const getters={
    isHideSidebar:state=>state.isHideSidebar
}

const actions={
    setToggleSidebar({commit}){
        commit(type.SET_TOGGLE_SIDEBAR);
    }
}

const mutations={
    [type.SET_TOGGLE_SIDEBAR](state){
        state.isHideSidebar = !state.isHideSidebar;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}