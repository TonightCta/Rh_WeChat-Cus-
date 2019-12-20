<!-- 含返回功能通用头部 -->
<template lang="html">
  <div class="work_header">
    <span class="back_btn">
      <van-icon name="arrow-left" size="26" color="white" @click="backUp()" />    </span>
    <slot class="header_title"></slot>
  </div>
</template>

<script>
export default {
  methods:{
    backUp(){
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.work_header{
  width: 100%;
  height: 5rem;
  background: #333;
  line-height: 5rem;
  text-align: center;
  position: fixed;
  top:0;
  left:0;
  color:white;
  font-size: 1.6rem;
  font-weight: bold;
  .back_btn{
    position: absolute;
    left:1rem;
    top:.8rem;
  }
}
</style>
