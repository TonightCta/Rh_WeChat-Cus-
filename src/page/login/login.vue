<!-- 登录 -->
<template lang="html">
  <div class="login">
    <LoginHeader>
      <p>登录</p>
    </LoginHeader>
    <div class="login_con">
      <!-- <van-tabs v-model="active">
        <van-tab title="短信登录">
          <div class="code_login public_login">
            <p>
              <input type="number" name="" value="" placeholder="请输入手机号" v-model="codePhone">
            </p>
            <p style="display:flex;">
              <input type="number" name="" value="" placeholder="请输入验证码" class="code_inp" v-model="msgcode">
              <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
            </p>
            <span>
              <button type="button" name="button" @click="loginCode()">快速登录</button>
            </span>
            <router-link to="/register" tag="p" class="register_text">注册</router-link>
          </div>
        </van-tab>
        <van-tab title="密码登录">

        </van-tab>
      </van-tabs> -->
      <div class="pass_login public_login">
        <p>
          <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhone">
        </p>
        <p>
          <input type="password" name="" value="" placeholder="请输入密码" v-model="userPass">
        </p>
        <p class="pass_forget">
          <router-link to="/passForget" tag="span">忘记密码?</router-link>
        </p>
        <p>
          <button type="button" name="button" @click="loginPass()">快速登录</button>
        </p>
        <router-link to="/companyRe" tag="p" class="register_text">注册</router-link>
        <!-- <p class="register_text">注册</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import LoginHeader from '@/components/login_header'
import {mapMutations} from 'vuex'
export default {
  components:{LoginHeader},
  data(){
    return{
      active:1,
      codeText:'发送验证码',//发送验证码按钮文本
      codeTime:60,//验证码倒计时
      senCodeBtn:false,//是否禁用按钮
      timer:null,
      userPass:null,//用户密码
      userPhone:null,//用户手机号
      codePhone:null,//验证码登录手机号
      msgcode:null,//短信验证码
      phoneCode:null,//回执验证码
    }
  },
  methods:{
    ...mapMutations(['token_fn','userMes_fn']),
    sendCode(){//发送验证码
        if(this.codePhone==null||this.codePhone==''){
          this.$toast('请输入手机号')
        }else if(!(/^1[3456789]\d{9}$/.test(this.codePhone))){
          this.$toast('请输入正确的手机号')
        }else{
          let Num=null;
          Num+=Math.round(900000*Math.random()+100000);
          this.phoneCode=Num;
          let formdata=new FormData();
          formdata.append('mobile',this.codePhone)
          formdata.append('code',Num);
          this.$axios.post(this.url+'/ict/sms/sendSms',formdata).then((res)=>{
            if(res.data.code==0){
              this.$toast('验证码发送成功');
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
                     this.$refs.codeBtn.style.background="#404040"
                     this.$refs.codeBtn.style.color="white"
                     this.senCodeBtn=false;
                     this.codeText='发送验证码';
                     this.codeTime=60;
                    }
                 }, 1000)
              }
            }else{
              this.$toast(res.data.msg)
            }
          }).catch((err)=>{
            this.$toast('未知错误,请联系客服')
            // console.log(err)
          })
        }
    },
    loginCode(){//验证码登录
      let _this=this;
      if(_this.codePhone==null||_this.codePhone==''){
        _this.$toast('请输入手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(_this.codePhone))){
        _this.$toast('请输入正确的手机号')
      }else if(_this.msgcode==null||_this.msgcode==''){
        _this.$toast('请输入验证码')
      }else if(_this.msgcode!=_this.phoneCode){
        _this.$toast('您输入验证码有误')
      }else{
        let formdata=new FormData();
        formdata.append('mobile',_this.codePhone);
        _this.$axios.post(_this.url+'/ict/operator/login_mobile',formdata).then((res)=>{
          if(res.data.code==0){
            _this.$toast('登录成功')
            _this.token_fn(res.data.data.token)
            _this.userMes_fn(res.data.data)
            _this.$router.push('/')
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast('未知错误,请联系客服')
        })
      }
    },
    loginPass(){//密码登录
      let _this=this;
      // if(_this.userPhone==null||_this.userPhone==''){
      //   _this.$toast('请输入您的手机号')
      // }else if(!(/^1[3456789]\d{9}$/.test(_this.userPhone))){
      //   _this.$toast('请输入正确的手机号')
      // }else if(_this.userPass==null||_this.userPass==''){
      //   _this.$toast('请输入您的密码')
      // }else{
        let formdata=new FormData();
        formdata.append('name',_this.userPhone)
        formdata.append('password',_this.userPass);
        _this.$axios.post(_this.url+'/ict/operator/login_name',formdata).then((res)=>{
          if(res.data.code==0){
            _this.$toast('登录成功')
            _this.token_fn(res.data.data.token)
            _this.userMes_fn(res.data.data)
            _this.$router.push('/')
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast('未知错误,请联系客服')
        })
      // }
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
      margin-top: .5rem;
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
      margin-top: .5rem;
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
