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
    [type.SET_TOGGLE_SIDEBAR](state, flag){
        if(arguments.length ===2 && typeof arguments[1] !== 'undefined'){
            state.isHideSidebar = flag;
            return;
        }
        state.isHideSidebar = !state.isHideSidebar;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}