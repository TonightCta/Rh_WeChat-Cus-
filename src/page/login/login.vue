<!-- 登录 -->
<template lang="html">
  <div class="login">
    <LoginHeader>
      <p>登录</p>
    </LoginHeader>
    <div class="login_con">
      <van-tabs v-model="active">
        <van-tab title="短信登录">
          <div class="code_login public_login">
            <p>
              <input type="number" name="" value="" placeholder="请输入手机号">
            </p>
            <p style="display:flex;">
              <input type="number" name="" value="" placeholder="请输入验证码" class="code_inp">
              <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
            </p>
            <span>
              <button type="button" name="button">快速登录</button>
            </span>
            <router-link to="/register" tag="p" class="register_text">注册</router-link>
          </div>
        </van-tab>
        <van-tab title="密码登录">
          <div class="pass_login public_login">
            <p>
              <input type="text" name="" value="" placeholder="请输入账号">
            </p>
            <p>
              <input type="password" name="" value="" placeholder="请输入密码">
            </p>
            <p class="pass_forget">
              <router-link to="/passForget" tag="span">忘记密码?</router-link>
            </p>
            <p>
              <button type="button" name="button">快速登录</button>
            </p>
            <router-link to="/register" tag="p" class="register_text">注册</router-link>
            <!-- <p class="register_text">注册</p> -->
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import LoginHeader from '@/components/login_header'
export default {
  components:{LoginHeader},
  data(){
    return{
      active:1,
      codeText:'发送验证码',//发送验证码按钮文本
      codeTime:60,//验证码倒计时
      senCodeBtn:false,//是否禁用按钮
      timer:null,
    }
  },
  methods:{
    sendCode(){//发送验证码
      this.$refs.codeBtn.style.background="#eee"
      this.$refs.codeBtn.style.color="#666"
      this.senCodeBtn=true;
      this.codeText='接收验证码'+'('+this.codeTime--+')'
      const TIME_COUNT = 59;
       if (!this.timer) {
         this.codeTime = TIME_COUNT;
         this.timer = setInterval(() => {
           if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
             this.codeText='接收验证码'+'('+this.codeTime--+')'
            } else {
             clearInterval(this.timer);
             this.timer = null;
             this.$refs.codeBtn.style.background="red"
             this.$refs.codeBtn.style.color="white"
             this.senCodeBtn=false;
             this.codeText='发送验证码';
             this.codeTime=60;
            }
         }, 1000)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  .public_login{
    width: 75%;
    margin:0 auto;
    margin-top: 2rem;
    .register_text{
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
      color:$tem-color;
      margin-top: 2rem;
    }
  }
  .code_login{
    p{
      width: 100%;
      input{
        width: 100%;
        border-bottom:1px solid #ccc;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
      }
      .code_inp{
        width: 60%;
      }
      button{
        width: 40%;
        height: 3rem;
        margin-top: .5rem;
        background: $btn-color;
        color:white;
        border-radius: 5px;
      }
    }
    span{
      width: 100%;
      margin-top: 2rem;
      button{
        margin:0 auto;
        width: 100%;
        height: 3.5rem;
        font-size: 1.5rem;
        background: $btn-color;
        color:white;
        border-radius: 20px;
      }
    }
  }
  .pass_login{
    p{
      width: 100%;
      input{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        border-bottom:1px solid #ccc;
      }
      button{
        margin:0 auto;
        width: 100%;
        height: 3.5rem;
        font-size: 1.5rem;
        background: $btn-color;
        color:white;
        border-radius: 20px;
      }
    }
    .pass_forget{
      width: 100%;
      text-align: right;
      line-height: 4rem;
      font-size: 1.3rem;
      color:$tem-color;
    }
  }
}
</style>
