import * as type from '../mutation-types.js';
import * as API from '../../api/index.js';

const state={
    isHideSidebar:true,
    categoryList:[],
    tagList:[],
    isAddArticle:false
}

const getters={
    isHideSidebar:state=>state.isHideSidebar,
    categoryList:state=>state.categoryList,
    tagList:state=>state.tagList,
    categoryList:state=>state.categoryList,
    isAddArticle:state=>state.isAddArticle
}

const actions={
    setToggleSidebar({commit}){
        commit(type.SET_TOGGLE_SIDEBAR);
    },
    getTagList({commit}, tagList){
        API.getTagList().then(res=>{
            commit(type.GET_TAG_LIST, res.data);
        });
    },
    addTag({commit}, tag){
        API.addTag(tag).then(function(res){
            commit(type.ADD_TAG, res.data);
        });
    },
    delTag({commit}, tagid){
        API.delTag({id:tagid}).then(res=>{
            commit(type.DEL_TAG, tagid);
        });
    },
    editTag({commit}, tagObj){
        tagObj.id = tagObj._id;
        delete tagObj._id;
        API.editTag(tagObj).then(res=>{
            commit(type.EDIT_TAG, tagObj);
        });
    },
    getCategoryList({commit}){
        API.getCategoryList().then(res=>{
            commit(type.GET_CATEGORY_LIST, res.data);
        });
    },
    addCategory({commit}, item){
        API.addCategory(item).then(function(res){
            commit(type.ADD_CATEGORY, res.data);
        });
    },
    delCategory({commit}, cateid){
        API.delCategory({id:cateid}).then(res=>{
            commit(type.DEL_CATEGORY, cateid);
        });
    },
    editCategory({commit}, cateObj){
        cateObj.id = cateObj._id;
        delete cateObj._id;
        API.editCategory(cateObj).then(res=>{
            commit(type.EDIT_CATEGORY, cateObj);
        });
    },
    setArticleState({commit}, isNew){
        commit(type.SET_ARTICLE_STATE, isNew);
    }
}

const mutations={
    [type.SET_TOGGLE_SIDEBAR](state, flag){
        if(arguments.length ===2 && typeof arguments[1] !== 'undefined'){
            state.isHideSidebar = flag;
            return;
        }
        state.isHideSidebar = !state.isHideSidebar;
    },
    [type.GET_TAG_LIST](state, tagList){
        state.tagList = tagList;
    },
    [type.ADD_TAG](state, tag){
        state.tagList.unshift(tag);
    },
    [type.DEL_TAG](state, tagid){
        for(var i=0; i<state.tagList.length; i++){
            if(state.tagList[i]._id == tagid){
                state.tagList.splice(i, 1);
                break;
            }
        }
    },
    [type.EDIT_TAG](state, tagObj){
        state.tagList.forEach(item=>{
            if(item._id == tagObj.id){
                item.name = tagObj.name;
            }
        });
    },[type.GET_CATEGORY_LIST](state, categoryList){
        state.categoryList = categoryList;
    },
    [type.ADD_CATEGORY](state, cate){
        state.categoryList.unshift(cate);
    },
    [type.DEL_CATEGORY](state, tagid){
        for(var i=0; i<state.categoryList.length; i++){
            if(state.categoryList[i]._id == tagid){
                state.categoryList.splice(i, 1);
                break;
            }
        }
    },
    [type.EDIT_CATEGORY](state, cateObj){
        state.categoryList.forEach(item=>{
            if(item._id == cateObj.id){
                item.name = cateObj.name;
            }
        });
    },
    [type.SET_ARTICLE_STATE](state, isNew){
        state.isAddArticle = isNew || false;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}