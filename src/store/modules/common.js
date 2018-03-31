import * as types from '../mutation-types.js';
import * as API from '../../api/index.js';

const state = {
    iShowLoading:false,
    iShowMenu:false,
    iShowToast:false,
    toastMsg:'未知错误',
    isMobile:false,
    token:'',
    isLogin:false,
    clientHeight:0,
    hotWordList:[],
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
    hotWordList:state=>state.hotWordList,
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
    },
    getHotWordList({commit}){
        API.getHotWordList().then(res=>{
            commit(types.GET_HOT_WORD_LIST, res.data);
        });
    },
    addHotWord({commit}, word){
        API.addHotWord(word).then(function(res){
            commit(types.ADD_HOT_WORD, res);
        });
    },
    delHotWord({commit}, wordid){
        API.delHotWord({id:wordid}).then(res=>{
            commit(types.DEL_HOT_WORD, wordid);
        });
    },
    editHotWord({commit}, wordObj){
        wordObj.id = wordObj._id;
        delete wordObj._id;
        API.editHotWord(wordObj).then(res=>{
            commit(types.EDIT_HOT_WORD, wordObj);
        });
    },
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
        delete localStorage.__bestLogin__;
        delete localStorage.__bestToken__;
        state.token = '';
        state.isLogin = false;
        window.location.href='/';
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
    },
    [types.GET_HOT_WORD_LIST](state, hotWordList){
        state.hotWordList = hotWordList;
    },
    [types.ADD_HOT_WORD](state, res){
        if(state.hotWordList.length < res.hotWordLength){
            return state.hotWordList.unshift(res.data);
        }
        var temp = [];
        var list = state.hotWordList;
        var len = list.length;
        temp = list.sort((item1, item2)=>{
            if(item1.hotCount > item1.hotCount) return 1;
            if(item1.hotCount < item2.hotCount) return -1;
            if(item1.hotCount == item2.hotCount) return 0;
        });
        var firstItem = temp[0];
        var temp2 = temp.filter((item,index)=>{
            return item.hotCount == firstItem.hotCount;
        });
        var temp3 = temp2.sort((item1, item2)=>{
            if(item1.createTime > item1.createTime) return 1;
            if(item1.createTime < item2.createTime) return -1;
            if(item1.createTime == item2.createTime) return 0;
        });
        state.hotWordList.splice(state.hotWordList.indexOf(temp3[temp3.length-1]), 1)
        state.hotWordList.unshift(res.data);
    },
    [types.DEL_HOT_WORD](state, wordid){
        for(var i=0; i<state.hotWordList.length; i++){
            if(state.hotWordList[i]._id == wordid){
                state.hotWordList.splice(i, 1);
                break;
            }
        }
    },
    [types.EDIT_HOT_WORD](state, wordObj){
        state.hotWordList.forEach(item=>{
            if(item._id == wordObj.id){
                item.name = wordObj.name;
            }
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}