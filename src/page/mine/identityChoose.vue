<!-- 身份选择 -->
<template lang="html">
  <div class="company_register">
    <LoginHeader/>
    <van-tabs v-model="active">
      <van-tab title="个人">
        <div class="register_con">
          <p>
            <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhonePeo">
          </p>
          <p>
            <input type="text" name="" value="" placeholder="请输入邮箱" v-model="userEmailPeo">
          </p>
          <!-- <p  style="display:flex;">
            <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcodePeo">
            <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
            <SIdentify :identifyCode="picCode" @click.native="refreshCode()"></SIdentify>
          </p> -->
          <!-- <p class="register_text">
            注册即同意
            <router-link to="/agreement" tag="span"><<个人注册协议>></router-link>
          </p> -->
          <span class="regisBtn">
            <button type="button" name="button" @click="regisPeo(1)">保存</button>
          </span>
        </div>
      </van-tab>
      <van-tab title="企业">
        <div class="register_con">
          <p>
            <input type="number" name="" value="" placeholder="请输入手机号" v-model="userPhone">
          </p>
          <p>
            <input type="text" name="" value="" placeholder="请输入企业邮箱" v-model="userEmail">
          </p>
          <p>
            <input type="text" name="" value="" placeholder="请输入公司全称" v-model="companyName">
          </p>
          <!-- <p  style="display:flex;">
            <input type="number" name="" value="" placeholder="请输入验证码" v-model="msgcode">
            <SIdentify :identifyCode="picCode" @click.native="refreshCode()"></SIdentify>
            <button type="button" name="button" @click="sendCode()" :disabled="senCodeBtn" ref="codeBtn">{{codeText}}</button>
          </p> -->
          <!-- <p class="register_text">
            注册即同意
            <router-link to="/agreement" tag="span"><<企业注册协议>></router-link>
          </p> -->
          <span class="regisBtn">
            <button type="button" name="button" @click="regisCom(0)">保存</button>
          </span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
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
      userEmail:null,//用户邮箱
      companyName:null,//公司名称
      msgcode:null,//短信验证码
      phoneCode:null,//回执验证码
      active:1,
      picCode:String(Math.round(9000*Math.random()+1000)),
      msgcodePeo:null,//个人注册验证码
      userPhonePeo:null,//个人认证手机号
      userEmailPeo:null,//个人认证邮箱
    }
  },
  computed:{
    ...mapState(['token'])
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
    regisCom(type){//企业账户保存
      let _this=this;
      let reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
      if(_this.userPhone==null||_this.userPhone==''){
        _this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(_this.userPhone))){
        _this.$toast('请输入正确的手机号码')
      }else if(_this.userEmail==null||_this.userEmail==''){
        _this.$toast('请输入企业邮箱')
      }else if(!reg.test(_this.userEmail)){
        _this.$toast('请输入正确的邮箱')
      }else if(_this.companyName==null||_this.companyName==''){
        _this.$toast('请输入公司名称')
      }else{
        let formdata=new FormData();
        formdata.append('phone',_this.userPhone)
        formdata.append('email',_this.userEmail)
        formdata.append('name',_this.companyName)
        formdata.append('type',type)
        _this.$axios.post(_this.url+'/ict/customer/save',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          if(res.data.code==0){
            _this.$router.push('/home');
            _this.$toast('保存成功')
            _this.userMes_fn(res.data.data)
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{

        })
        //''
      }
    },
    regisPeo(type){//个人账户保存
      let _this=this;
      let reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
      if(_this.userPhonePeo==null||_this.userPhonePeo==''){
        _this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.userPhonePeo))){
        _this.$toast('请输入正确的手机号码')
      }else if(_this.userEmailPeo==null||_this.userEmailPeo==''){
        _this.$toast('请输入你的邮箱')
      } else if(!reg.test(_this.userEmailPeo)){
        _this.$toast('您输入的邮箱格式有误')
      }else{
        let formdata=new FormData();
        formdata.append('phone',_this.userPhonePeo)
        formdata.append('email',_this.userEmailPeo)
        formdata.append('type',type)
        _this.$axios.post(_this.url+'/ict/customer/save',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          // console.log(res)
          if(res.data.code==0){
            _this.userMes_fn(res.data.data)
            _this.$router.push('/sendComSecOrder');
            _this.$toast('保存成功')
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
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
