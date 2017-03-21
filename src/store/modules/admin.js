import * as type from '../mutation-types.js';


const state={
    iShowSidebar:false
}

const getters={
    iShowSidebar:state=>state.iShowSidebar
}

const actions={
    setToggleSidebar({commit}){
        commit(type.SET_TOGGLE_SIDEBAR);
    }
}

const mutations={
    [type.SET_TOGGLE_SIDEBAR](state){
        state.iShowSidebar = !state.iShowSidebar;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}