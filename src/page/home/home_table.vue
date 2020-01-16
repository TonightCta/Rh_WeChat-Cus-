<!-- 首页Table -->
<template lang="html">
  <div class="home_table">
    <ul class="table_con">
      <li @click="openLss()">我要发单</li>
      <li @click="myOrder()">我的发单</li>
    </ul>
    <div class="lssue_box" ref="lssue_box" v-show="isOpenLss" @click="closeLss()">
      <ul>
        <li ref="mineLss" @click.stop="perSendOrder()">个人发布</li>
        <li ref="companyLss" @click.stop="sendOrder()">企业发布</li>
      </ul>
      <span>
        <van-icon name="cross" size="50"/>
      </span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      isOpenLss:false,
    }
  },
  computed:{
    ...mapState(['token','userMes'])
  },
  created(){
    // console.log(this.userMes)
  },
  methods:{
    openLss(){//发单窗口
      console.log(this.userMes)
      if(this.userMes.ictOperatorVO.mobile==null){
        this.$toast('您的信息尚未补全')
        setTimeout(()=>{
          this.$router.push('/identifyChoose')
        },500)
      }else if(this.userMes.ictOperatorVO.ictCustomerVO.type==1){
        this.$router.push('/sendComSecOrder')
      }else if(this.userMes.ictOperatorVO.ictCustomerVO.type==0){
        if(this.userMes.ictOperatorVO.ictCustomerVO.state==0){
          // alert('您还未进行企业认证,请您完成认证后再试')
          this.$toast('您还未进行企业认证,请您完成认证后再试');
          setTimeout(()=>{
            this.$router.push('/companyAuth')
          },1000)
        }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==1){
          // alert('您的认证信息审核中,请您完成认证后再试')
          this.$toast('您的认证信息审核中,请您完成认证后再试');
        }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==-1){
          // alert('您的认证被驳回,请更新认证后再试！')
          this.$toast('您的认证被驳回,请更新认证后再试！');
        }else{
          this.$router.push('/sendComOrder')
        }
      }
      // this.isOpenLss=true;
      // setTimeout(()=>{
      //   this.$refs.lssue_box.style.opacity='1'
      //   this.$refs.mineLss.style.bottom='11rem';
      //   setTimeout(()=>{
      //     this.$refs.companyLss.style.bottom='11rem';
      //   },50)
      // },100)
    },
    closeLss(){//关闭发单窗口
      this.$refs.lssue_box.style.opacity='0'
      this.$refs.mineLss.style.bottom='-200%';
      setTimeout(()=>{
        this.$refs.companyLss.style.bottom='-200%';
      },100)
      setTimeout(()=>{
        this.isOpenLss=false;
      },300)
    },
    sendOrder(){//企业发单
      // if(this.token== null){
      //   this.$toast('请先登录');
      //   setTimeout(()=>{
      //     this.$router.push('/login');
      //   },1500)
      // }else
      if(this.userMes.ictOperatorVO.ictCustomerVO.type==1){
        // alert('当前账号为个人账户,请到个人发布重试')
        this.$toast('当前账号为个人账户,请到个人发布重试')
      }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==0){
        // alert('您还未进行企业认证,请您完成认证后再试')
        this.$toast('您还未进行企业认证,请您完成认证后再试');
        setTimeout(()=>{
          this.$router.push('/companyAuth')
        },1000)
      }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==1){
        // alert('您的认证信息审核中,请您完成认证后再试')
        this.$toast('您的认证信息审核中,请您完成认证后再试');
      }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==-1){
        // alert('您的认证被驳回,请更新认证后再试！')
        this.$toast('您的认证被驳回,请更新认证后再试！');
      }else{
        this.$router.push('/sendComOrder')
      }
    },
    perSendOrder(){//个人发单
      // if(this.token==null){
      //   this.$toast('请先登录');
      //   setTimeout(()=>{
      //     this.$router.push('/login')
      //   },1500)
      // }else
     if(this.userMes.ictOperatorVO.ictCustomerVO.type==0){
        // alert('当前账号为企业账户,请到个人发布重试')
        this.$toast('当前账号为企业账户,请到个人发布重试')
      }else{
        this.$router.push('/sendComSecOrder')
      }
    },
    myOrder(){//我的发单
      // if(this.token==null){
      //   this.$toast('请先登录');
      //   setTimeout(()=>{
      //     this.$router.push('/login')
      //   },1000)
      // }else{
        this.$router.push('/mineOrder')
      // }
    },
  }
}
</script>

<style lang="scss" scoped>
.home_table{
  width: 100%;
  height: 13rem;
  box-sizing: border-box;
  padding-top: 1rem;
  padding-bottom: 1rem;
  .table_con{
    width: 100%;
    display: flex;
    justify-content: space-around;
    li{
      width: 45%;
      height: 100%;
      line-height: 11rem;
      text-align: center;
      font-size: 1.8rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 10px;
    }
  }
  .lssue_box{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    bottom:0;
    background: rgba(255,255,255,.8);
    z-index:1000;
    opacity: 0;
    transition: .5s all;
    ul{
      width:86%;
      left:50%;
      margin-left: -43%;
      display: flex;
      li{
        font-size: 1.6rem;
      }
      li:first-child{
        width: 12rem;
        height: 12rem;
        background: white;
        border:1px solid $btn-color;
        border-radius: 50%;
        line-height: 12rem;
        text-align: center;
        bottom: -200%;
        position: absolute;
        transition: .5s all;
        left: 5rem;
      }
      li:last-child{
        width: 12rem;
        height: 12rem;
        background: $btn-color;
        color:white;
        border-radius: 50%;
        line-height: 12rem;
        text-align: center;
        position: absolute;
        right:5rem;
        bottom: -200%;
        transition: .5s all;
      }
    }
    span{
      position: absolute;
      bottom:3rem;
      left:50%;
      margin-left: -2.5rem;
    }
  }
}
</style>
