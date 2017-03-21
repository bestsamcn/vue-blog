<style src="@/assets/css/admin/home/topbar.css" scoped></style>
<template>
    <div class="topbar">
        <div class="left color-white" @click="setToggleSidebar()">
            B<span>est</span>
        </div>
        <div class="right">
            <Dropdown  trigger="click">
                <div class="avatar">
                    <img src="../../../assets/img/avatar.png">
                </div>
                <DropdownMenu>
                    <DropdownItem>
                        退出
                    </DropdownItem>                    
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template> 
<script>
    import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
    import { mapActions } from 'vuex';
    export default{
        name:'topbar',
        components:{
            Dropdown,
            DropdownMenu,
            DropdownItem
        },
        methods:{
            ...mapActions([
                'setToggleSidebar'  
            ])
        }
    }
</script>  