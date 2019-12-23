<!-- 首页Table -->
<template lang="html">
  <div class="home_table">
    <ul class="table_con">
      <li @click="openLss()">我要发单</li>
      <router-link to="/mineOrder" tag="li">我的发单</router-link>
    </ul>
    <div class="lssue_box" ref="lssue_box" v-if="isOpenLss" @click="closeLss()">
      <ul>
        <li ref="mineLss">个人发布</li>
        <li ref="companyLss" @click.stop="sendOrder()">企业发布</li>
      </ul>
      <span>
        <van-icon name="cross" size="50"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isOpenLss:false,
    }
  },
  methods:{
    openLss(){//发单窗口
      this.isOpenLss=true;
      setTimeout(()=>{
        this.$refs.lssue_box.style.opacity='1'
        this.$refs.mineLss.style.bottom='11rem';
        setTimeout(()=>{
          this.$refs.companyLss.style.bottom='11rem';
        },50)
      })
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
    sendOrder(){
      this.$router.push('/sendComOrder')
    }
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
    background: rgba(255,255,255,.7);
    z-index: 9999;
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
        left: 3rem;
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
        right:3rem;
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
