import * as type from '../mutation-types.js';
import * as API from '../../api/index.js';

const state={
    isHideSidebar:true,
    categoryList:[],
    tagList:[],
    messageList:[
        {
            id:1,
            date:1490601608593,
            name:'sam',
            email:'12452342@qq.com',
            text:'好无聊的课,顺便过来踩踩...',
            ip:'192.168.1.1'
        },
        {
            id:2,
            date:1490601608593,
            name:'sam',
            email:'12452342@qq.com',
            text:'好无聊的课,顺便过来踩踩...',
            ip:'192.168.1.1'
        },
        {
            id:3,
            date:1490601608593,
            name:'sam',
            email:'12452342@qq.com',
            text:'好无聊的课,顺便过来踩踩...',
            ip:'192.168.1.1'
        },
        {
            id:4,
            date:1490601608593,
            name:'sam',
            email:'12452342@qq.com',
            text:'好无聊的课,顺便过来踩踩...',
            ip:'192.168.1.1'
        }
    ],
    commentList:[
        {
            id:1,
            article:1,
            date:1490166061472,
            ip:'192.168.0.1',
            fromUser:'best',
            parentComment:null,
            content:'贱人就是矫情有木有。。。',
        },
        {
            id:2,
            article:1,
            date:1490166061472,
            ip:'192.168.0.1',
            fromUser:'lala',
            parentComment:null,
            content:'我向你飞，雨温柔的吹',
        },
        {
            id:3,
            article:1,
            date:1490166061472,
            ip:'192.168.0.1',
            fromUser:'lala',
            parentComment:{
                id:2,
                article:1,
                date:1490166061472,
                ip:'192.168.0.1',
                fromUser:'lala',
                parentComment:null,
                content:'我向你飞，雨温柔的吹',
            },
            content:'我向你飞，雨温柔的吹',
        }
    ]
}

const getters={
    isHideSidebar:state=>state.isHideSidebar,
    categoryList:state=>state.categoryList,
    tagList:state=>state.tagList
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
        commit(type.EDIT_TAG, tagObj);
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
        state.forEach(item=>{
            if(item._id == tagObj.id){
                item._id == tagObj.name;
            }
        });
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}