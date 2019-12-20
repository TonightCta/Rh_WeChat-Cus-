<template lang="html">
  <div class="home_page">
    <Header/>
    <p class="home_adv">
      <van-icon name="bell" color="#333" size="3rem"/>
      <span>通知消息...</span>
    </p>
    <Swiper/>
    <Table/>
    <EngList/>
  </div>
</template>

<script>
import Header from '@/components/home_header'
import Swiper from '@/page/home/swiper'
import Table from '@/page/home/home_table'
import EngList from '@/page/home/engList'
export default {
  components:{Header,Swiper,Table,EngList}
}
</script>

<style lang="scss" scoped>
.home_page{
  width: 100%;
  padding-top: 5rem;
  .home_adv{
    font-size: 1.4rem;
    margin-top: 1rem;
    height: 4rem;
    line-height: 4rem;
    box-sizing: border-box;
    padding-left: 1.5rem;
    position:relative;
    span{
      position: absolute;
      left: 5rem;
      top:-.2rem;
    }
  }
}
</style>
