<style src="@/assets/css/admin/signin.css"></style>
<template>
    <div class="sign">
        <div class="moveup signinpanel signin">
            <form id="signin-form">
                <h4 class="text-center sign-title color-purple">Login</h4>
                <input type="text" class="form-control uname" v-model="account" name="account" placeholder="用户名" />
                <input type="password" class="form-control pword m-b" v-model="password" name="password" placeholder="密码" />
                <button class="btn btn-success full-width btn-block m-b" @click.prevent="signClick()">登录</button>
            </form>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    import { mapActions, mapState } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'signin',
        components:{
        },
        data(){
            return{
                iShowMsg:false,
                alertMsg:'',
                account:'',
                password:''
            }
        },
        computed:{
            ...mapState({
                isLogin:state=>state.common.isLogin,
                token:state=>state.common.token
            })
        },
        methods:{
            signClick(){
                var that = this;
                if(!this.account || this.account.length< 2){
                    this.setToast('用户名不能少于2位');
                    return;
                }
                if(!this.password || this.password.length < 6){
                    this.setToast('密码不能少于6位');
                    return;
                }
                API.login({account:that.account, password:that.password}).then(res=>{
                    that.setToast(res.msg || '登录成功');
                    var token = {token:res.token, expires:res.expires};
                    window.localStorage && (localStorage['__bestToken__'] = JSON.stringify(token));
                    window.localStorage && (localStorage['__bestLogin__'] = true);
                    that.setToken(res.token);
                    that.$router.push({name:'AdminHome'});
                })
            },
            onAlertClose(){
                this.iShowMsg = false;
            },
            ...mapActions([
                'setToast',
                'setToken',
                'delToken'
            ])
        },
        mounted(){
            if(this.isLogin && !!this.token){
                this.$router.push({name:'AdminHome'});
            }
        }
    }
</script>