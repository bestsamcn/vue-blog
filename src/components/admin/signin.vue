<style src="@/assets/css/admin/signin.css"></style>
<template>
    <div class="sign">
        <div class="moveup signinpanel signin">
            <form id="signin-form">
                <h4 class="text-center sign-title color-purple">Login</h4>
                <input type="text" class="form-control uname" v-model="account" name="account" placeholder="用户名" />
                <input type="password" class="form-control pword m-b" v-model="password" name="password" placeholder="密码" />
                <button class="btn btn-success full-width btn-block m-b" @click.prevent="signClick()">登录</button>
                <button class="btn btn-success full-width btn-block m-b" @click.prevent="signoutClick()">登录</button>
            </form>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    import { mapActions } from 'vuex';
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

                    if(res.status !== 200 || res.data.retCode !==0){
                        that.setToast(res.data.msg || '登录失败');
                        return;
                    }
                    that.setToast(res.data.msg || '登录成功');
                    var token = {token:res.data.token, expires:res.data.expires};
                    window.localStorage && (localStorage['token'] = JSON.stringify(token));
                    that.setToken(res.data.token);
                    that.$router.push({name:'AdminHome'});
                }).catch(err=>{
                    that.setToast('异常');
                });
            },
            signoutClick(){
                var that = this;
                API.logout().then(res=>{
                    if(res.status !== 200 || res.data.retCode !==0){
                        that.setToast(res.data.msg || '退出成功');
                        return;
                    }
                    that.setToast(res.data.msg || '退出成功');
                    if(localStorage.token) delete localStorage.token;
                    that.delToken();
                })
            },
            onAlertClose(){
                this.iShowMsg = false;
                console.log('alert is close');
            },
            ...mapActions([
                'setToast',
                'setToken',
                'delToken'
            ])
        }
    }
</script>