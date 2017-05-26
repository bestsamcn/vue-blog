<style src="@/assets/css/admin/common/sidebar.css" scoped></style>
<template>
    <div class="sidebar">
        <Navmenu mode="vertical" :router="true" :unique-opened="isMobile" default-active="1" menu-trigger="click">
            <Navmenuitem index="index"  :route="{name:'AdminHome'}" @click="menuItemClick('AdminHome')">
                <i class="icon-desktop"></i>主页
            </Navmenuitem>
            <Navsubmenu index="2">
                <div slot="title"><i class="icon-file-alt"></i>文章</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="article" :route="{name:'AdminArticle'}" @click="menuItemClick('AdminArticle')">
                        <i class="icon-list-alt"></i>文章列表
                    </Navmenuitem>
                    <Navmenuitem index="addArticle" :route="{name:'AdminAddArticle'}" @click="menuItemClick('AdminAddArticle')">
                        <i class="icon-plus-sign-alt"></i>添加文章
                    </Navmenuitem>
                    <Navmenuitem index="adminComment" :route="{name:'AdminArticleComment'}" @click="menuItemClick('AdminArticleComment')">
                        <i class="icon-comments"></i>文章评论
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navsubmenu index="3">
                <div slot="title"><i class="icon-plus-sign-alt"></i>标签归类</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="adminTag" :route="{name:'AdminTag'}" @click="menuItemClick('AdminTag')">
                        <i class="icon-tags"></i>标签列表
                    </Navmenuitem>
                    <Navmenuitem index="adminCategory" :route="{name:'AdminCategory'}" @click="menuItemClick('AdminCategory')">
                        <i class="icon-paste"></i>分类列表
                    </Navmenuitem>
                    <Navmenuitem index="adminHotWord" :route="{name:'AdminHotWord'}" @click="menuItemClick('AdminHotWord')">
                        <i class="icon-fire"></i>热词列表
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navmenuitem index="adminMessage" :route="{name:'AdminMessage'}" @click="menuItemClick('AdminMessage')">留言列表</Navmenuitem>
            <Navmenuitem index="adminCount" :route="{name:'AdminCount'}" @click="menuItemClick('AdminCount')">访问记录</Navmenuitem>
        </Navmenu>
        <a class="bottom-btn" @click="$router.push({name:'Home'});isMobile && setToggleSidebar(false)"><i class="icon-bold"><span>返回首页</span></i></a>
    </div>
</template>
<script>
    import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'sidebar',
        components:{
            Navmenu:Menu,
            Navsubmenu:Submenu,
            Navmenuitem:MenuItem,
            Navmenuitemgroup:MenuItemGroup
        },
        computed:{
            ...mapState({
                isMobile:state=>state.common.isMobile,
            })
        },
        methods:{
            ...mapActions([
                'setToggleSidebar'
            ]),
            menuItemClick(routerName){
                this.isMobile && this.setToggleSidebar(false);
                // this.$router.push({name:routerName});
                return false;
            }
        },
        data(){
            return{
                uniqueOpen:false
            }
        },
        created(){
             this.isMobile && this.setToggleSidebar(false);
        }
    }
</script>