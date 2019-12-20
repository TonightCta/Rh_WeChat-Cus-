<!-- 登录通用头部 -->
<template lang="html">
  <div class="login_title">
    <img src="../../static/img/bg.jpg" alt="">
    <!-- <slot></slot> -->
    <span class="closeLogin" @click="backPage()">
      <van-icon name="arrow-left" color="white" size="28" />
    </span>
  </div>
</template>

<script>
export default {
  methods:{
    backPage(){//返回
      window.history.back()
    },
  }
}
</script>

<style lang="scss" scoped>
.login_title{
  width: 100%;
  position: relative;
  p{
    position: absolute;
    width: 50%;
    margin-left: -25%;
    text-align: center;
    color:white;
    z-index: 100;
    top:0;
    left: 50%;
    line-height: 5rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  img{
    width: 100%;
    height: 15rem;
  }
  .closeLogin{
    position: absolute;
    left:1rem;
    top:1rem;
  }
}
</style>
