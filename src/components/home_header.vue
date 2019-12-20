<!-- 首页头部 -->
<template lang="html">
  <div class="home_header">
    <van-icon name="wap-nav" color="white" size="3rem"  @click="show=true"/>
    <div class="user_list">
      <van-popup v-model="show"  position="left" :style="{width:'50%',height:'100%'}">
        <router-link to="/login" tag="p" class="user_icon">
          <img src="../../static/img/dont.jpg" alt=""/>
        </router-link>
        <ul class="list_toute">
          <li>昵称:  海绵宝宝</li>
          <!-- <li>手机号:  18888888888</li> -->
          <router-link to="/mine" tag="li">个人信息>></router-link>
          <!-- <router-link to="/minePro" tag="li">我的接单>></router-link> -->
          <router-link to="/mineMessages" tag="li">我的消息>></router-link>
          <li>退出登录>></li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  }
}
</script>

<style lang="scss" scoped>
.home_header{
  height: 5rem;
  box-sizing: border-box;
  padding-left: 1.5rem;
  padding-top: 1rem;
  width: 100%;
  background: #333;
  position: fixed;
  top:0;
  left:0;
  z-index: 999;
  .user_list{
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    .user_icon{
      width: 8rem;
      height: 8rem;
      margin:0 auto;
      margin-top:4rem;
      img{
        border-radius:50%;
        width: 100%;
        height:100%;
      }
    }
    .list_toute{
      margin-top: 2rem;
      width: 100%;
      li{
        text-align: left;
        line-height: 6rem;
        font-size: 1.4rem;
        box-sizing: border-box;
        padding-left: 2rem;
      }
    }
  }
}
</style>
