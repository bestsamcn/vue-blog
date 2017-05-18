<style src="@/assets/css/admin/common/topbar.css" scoped></style>
<template>
    <div class="topbar">
        <div class="left color-white" @click="setToggleSidebar()">
            B<span>est</span>
        </div>
        <div class="right">
            <Dropdown  trigger="click" @command="handleCommand">
                <div class="avatar">
                    <img src="../../../assets/img/avatar.png">
                </div>
                <DropdownMenu slot="dropdown">
                    <DropdownItem command="logout">
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
    import * as API from '@/api/index.js';
    export default{
        name:'topbar',
        components:{
            Dropdown,
            DropdownMenu,
            DropdownItem
        },
        methods:{
            ...mapActions([
                'setToggleSidebar',
                'setToast',
                'delToken'  
            ]),
            handleCommand(cmd){
                var that = this;
                if(cmd !== 'logout') return;
                API.logout().then(res=>{
                    that.setToast(res.msg || '退出成功');
                    if(localStorage['__bestToken__']) delete localStorage['__bestToken__'];
                    localStorage['__bestLogin__'] && delete localStorage['__bestLogin__'];
                    that.delToken();
                    this.$router.push({name:'Home'});
                });
            }
        }
    }
</script>  