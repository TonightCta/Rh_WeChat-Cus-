<!-- 企业注册 -->
<template lang="html">
  <div class="company_register">
    <LoginHeader/>
    <van-tabs v-model="active">
      <van-tab title="个人注册">
        <div class="register_con">
          <p>
            <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhonePeo">
          </p>
          <p>
            <input type="password" name="" value="" placeholder="请输入密码" v-model="userPassPeo">
          </p>
          <p  style="display:flex;">
            <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcodePeo">
            <!-- <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button> -->
            <SIdentify :identifyCode="picCode" @click.native="refreshCode()"></SIdentify>
          </p>
          <p class="register_text">
            注册即同意
            <router-link to="/agreement" tag="span"><<个人注册协议>></router-link>
          </p>
          <span class="regisBtn">
            <button type="button" name="button" @click="regisPeo(1)">注册</button>
          </span>
        </div>
      </van-tab>
      <van-tab title="企业注册">
        <div class="register_con">
          <p>
            <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhone">
          </p>
          <p>
            <input type="password" name="" value="" placeholder="请输入密码" v-model="userPass">
          </p>
          <p>
            <input type="text" name="" value="" placeholder="请输入公司全称" v-model="companyName">
          </p>
          <p  style="display:flex;">
            <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcode">
            <SIdentify :identifyCode="picCode" @click.native="refreshCode()"></SIdentify>
            <!-- <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button> -->
          </p>
          <p class="register_text">
            注册即同意
            <router-link to="/agreement" tag="span"><<企业注册协议>></router-link>
          </p>
          <span class="regisBtn">
            <button type="button" name="button" @click="regisCom(0)">注册</button>
          </span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import LoginHeader from '@/components/login_header'
import SIdentify from '@/components/picCode'
export default {
  components:{
    LoginHeader,
    SIdentify
  },
  data(){
    return{
      codeText:'发送验证码',//发送验证码按钮文本
      codeTime:60,//验证码倒计时
      senCodeBtn:false,//是否禁用按钮
      timer:null,
      radio:1,
      userPhone:null,//用户手机号
      userPass:null,//用户密码
      companyName:null,//公司名称
      msgcode:null,//短信验证码
      phoneCode:null,//回执验证码
      active:1,
      picCode:String(Math.round(9000*Math.random()+1000)),
      msgcodePeo:null,//个人注册验证码
      userPhonePeo:null,//个人注册手机号
      userPassPeo:null,//个人注册密码
    }
  },
  methods:{
    ...mapMutations(['token_fn','userMes_fn']),
    sendCode(){//发送验证码
      if(this.userPhone==null||this.userPhone==''){
        this.$toast('请输入手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
        this.$toast('请输入正确的手机号')
      }else{
        let Num=null;
        Num+=Math.round(900000*Math.random()+100000);
        this.phoneCode=Num;
        let formdata=new FormData();
        formdata.append('mobile',this.userPhone)
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
    regisCom(type){//企业账户注册
      let _this=this;
      if(_this.userPhone==null||_this.userPhone==''){
        _this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
        _this.$toast('请输入正确的手机号码')
      }else if(_this.userPass==null||_this.userPass==''){
        _this.$toast('请输入密码')
      }else if(_this.companyName==null||_this.companyName==''){
        _this.$toast('请输入公司名称')
      }else if(_this.msgcode==null||_this.msgcode==''){
        _this.$toast('请输入验证码')
      }else if(String(_this.msgcode)!==_this.picCode){
        _this.$toast('您输入的验证码有误')
      }else{
        let formdata=new FormData();
        formdata.append('mobile',_this.userPhone)
        formdata.append('password',_this.userPass)
        formdata.append('nickname',_this.companyName)
        formdata.append('type',type);
        _this.$axios.post(_this.url+'/ict/operator/register_customer',formdata).then((res)=>{
          // console.log(res)
          if(res.data.code==0){
            _this.token_fn(res.data.data.token);
            _this.userMes_fn(res.data.data)
            _this.$router.push('/');
            _this.$toast('注册成功')
          }else{
            _this.refreshCode()
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.refreshCode()
          _this.$toast('未知错误,请联系客服')
        })
      }
    },
    regisPeo(type){
      let _this=this;
      if(_this.userPhonePeo==null||_this.userPhonePeo==''){
        _this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.userPhonePeo))){
        _this.$toast('请输入正确的手机号码')
      }else if(_this.userPass==null||_this.userPassPeo==''){
        _this.$toast('请输入密码')
      }else if(_this.msgcodePeo==null||_this.msgcodePeo==''){
        _this.$toast('请输入验证码')
      }else if(String(_this.msgcodePeo)!==_this.picCode){
        _this.$toast('您输入的验证码有误')
      }else{
        let formdata=new FormData();
        formdata.append('mobile',_this.userPhonePeo)
        formdata.append('password',_this.userPass)
        formdata.append('nickname',_this.companyName)
        formdata.append('type',type);
        _this.$axios.post(_this.url+'/ict/operator/register_customer',formdata).then((res)=>{
          // console.log(res)
          if(res.data.code==0){
            _this.token_fn(res.data.data.token);
            _this.userMes_fn(res.data.data)
            _this.$router.push('/');
            _this.$toast('登录成功')
          }else{
            _this.refreshCode()
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.refreshCode()
          _this.$toast('未知错误,请联系客服')
        })
      }
    },
    refreshCode(){//刷新验证码
      let Num=null;
      Num+=Math.round(9000*Math.random()+1000);
      this.picCode=String(Num);
    },
  }
}
</script>

<style lang="scss" scoped>
.register_con{
  width: 75%;
  margin:0 auto;
  padding-top: 1rem;
  p{
    width: 100%;
    margin-top: .5rem;
    input{
      border-bottom:1px solid #ccc;
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.4rem;
    }
    .code_inp{
      width: 60%;
    }
    button{
      width: 55%;
      height: 3.5rem;
      margin-top: .5rem;
      background: $btn-color;
      color:white;
      border-radius: 5px;
      font-size: 1.4rem;
    }
  }
  .register_text{
    line-height: 5rem;
    font-size: 1.5rem;
    span{
      color:$tem-color!important;
      display: inline;
    }
  }
  .regisBtn{
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
  .company_re{
    margin-top: 2rem;
    font-size: 1.5rem;
    color:$tem-color;
  }
}
</style>
