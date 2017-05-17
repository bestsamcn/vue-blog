<style src="@/assets/css/admin/common/sidebar.css" scoped></style>
<template>
    <div class="sidebar">
        <Navmenu mode="vertical" :router="true" :unique-opened="isMobile" default-active="1" menu-trigger="click">
            <Navmenuitem index="index" @click="menuItemClick('AdminHome')">
                <i class="icon-desktop"></i>主页
            </Navmenuitem>
            <Navsubmenu index="2">
                <div slot="title"><i class="icon-file-alt"></i>文章</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="article" @click="menuItemClick('AdminArticle')">
                        <i class="icon-list-alt"></i>文章列表
                    </Navmenuitem>
                    <Navmenuitem index="addArticle" @click="menuItemClick('AdminAddArticle')">
                        <i class="icon-plus-sign-alt"></i>添加文章
                    </Navmenuitem>
                    <Navmenuitem index="adminComment" @click="menuItemClick('AdminArticleComment')">
                        <i class="icon-comments"></i>文章评论
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navsubmenu index="3">
                <div slot="title"><i class="icon-plus-sign-alt"></i>标签归类</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="adminTag" @click="menuItemClick('AdminTag')">
                        <i class="icon-tags"></i>标签列表
                    </Navmenuitem>
                    <Navmenuitem index="adminCategory" @click="menuItemClick('AdminCategory')">
                        <i class="icon-paste"></i>分类列表
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navmenuitem index="adminMessage" @click="menuItemClick('AdminMessage')">留言列表</Navmenuitem>
            <Navmenuitem index="adminCount" @click="menuItemClick('AdminCount')">访问记录</Navmenuitem>
        </Navmenu>
        <router-link class="bottom-btn" :to="{name:'Home'}"><i class="icon-bold"><span>返回首页</span></i></router-link>
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