<template>
  <div>
    <div class="login-box">
      <div class="title">登录</div>
      <div class=""><input class="input" type="text" v-model="userName" placeholder="请输入账号" /></div>
      <div class=""><input class="input" type="password" v-model="password" placeholder="请输入密码" /></div>
      <div class="common-btn" @click="logins">登录</div>
      <i class="iconfont iconuser"></i>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
// import Toast from '@/components/Toast/toast.vue'
import {goLogin} from '@/request/api'
@Component
// @Component({
//   components:{Toast}
// })
export default class Login extends Vue {
  userName = ''
  password = ''
  show = false

  logins(): void{
    if(this.userName.length<6){
      alert('账号输入有误')
      return
    }
    if(this.password.length<6){
      alert('密码输入有误')
      return
    }
    goLogin({phone: this.userName, password: this.password}).then(res => {
      console.log(res);
    })
    // this.$router.replace('/')
  }
}
</script>
<style scoped>
  .login-box{
    width: 360px;
    box-shadow: 3px 3px 3px #eee;
    border-radius: 8px;
    margin:0 auto;
    margin-top: 100px;
    padding:20px;
    background: #fff;
  }
  .title{
    font-size: 18px;
    padding-bottom: 15px;
  }
  .input{
    width: 100%;
    border:1px solid #eee;
    border-radius: 5px;
    padding:10px;
    margin-bottom: 15px;
  }
  .input:focus{
    box-shadow: 0 0 5px #eee;
  }
  .common-btn{
    margin-top: 10px;
  }
</style>