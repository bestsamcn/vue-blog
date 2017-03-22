<style src="@/assets/css/admin/common/sidebar.css" scoped></style>
<template>
    <div class="sidebar">
        <Navmenu mode="vertical" :router="true" default-active="1" menu-trigger="click">
            <Navmenuitem index="1" :route="{name:'AdminHome'}">
                <i class="icon-desktop"></i>主页
            </Navmenuitem>
            <Navsubmenu index="2">
                <div slot="title"><i class="icon-file-alt"></i>文章</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="2-1" :route="{name:'AdminArticle'}">
                        <i class="icon-list-alt"></i>文章列表
                    </Navmenuitem>
                    <Navmenuitem index="2-2">
                        <i class="icon-comments"></i>文章评论
                    </Navmenuitem>
                    <Navmenuitem index="2-3">
                        <i class="icon-plus-sign-alt"></i>添加文章
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navsubmenu index="3">
                <div slot="title"><i class="icon-tags"></i>标签</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="3-1">
                        <i class="icon-list-alt"></i>标签列表
                    </Navmenuitem>
                    <Navmenuitem index="3-2">
                        <i class="icon-plus-sign-alt"></i>添加标签
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
            <Navsubmenu index="4">
                <div slot="title"><i class="icon-paste"></i>分类</div>
                <Navmenuitemgroup>
                    <Navmenuitem index="4-1">
                        <i class="icon-list-alt"></i>分类列表
                    </Navmenuitem>
                    <Navmenuitem index="4-2">
                        <i class="icon-plus-sign-alt"></i>添加分类
                    </Navmenuitem>
                </Navmenuitemgroup>
            </Navsubmenu>
        </Navmenu>
        <router-link class="bottom-btn" :to="{name:'Home'}"><i class="icon-bold"><span>返回首页</span></i></router-link>
    </div>
</template>
<script>
    import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';
    export default{
        name:'sidebar',
        components:{
            Navmenu:Menu,
            Navsubmenu:Submenu,
            Navmenuitem:MenuItem,
            Navmenuitemgroup:MenuItemGroup
        }
    }
</script>