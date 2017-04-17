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
                API.createAdmin({account:that.account, password:that.password}).then(res=>{

                    if(res.status !== 200 || res.data.retCode !==0){
                        that.setToast(res.msg || '创建失败');
                        return;
                    }
                    that.setToast(res.msg || '创建成功')
                }).catch(err=>{
                    that.setToast('异常');
                });
            },
            onAlertClose(){
                this.iShowMsg = false;
                console.log('alert is close');
            },
            ...mapActions([
                'setToast'
            ])
        }
    }
</script>