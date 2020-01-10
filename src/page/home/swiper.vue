<template lang="html">
  <div class="home_swiper">
    <van-swipe :autoplay="3000" :height="200" indicator-color="black">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'static/img/banner.png',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home_swiper{
  width: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
