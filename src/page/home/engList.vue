<template lang="html">
  <div class="pro_list">
    <!-- <van-tabs> -->
      <!-- <van-tab v-for="index in tableList" :title="index" :key="index" title-active-color="red"> -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="pro_list"
          >
            <van-cell  v-for="(eng,indexEng) in engList" :key="indexEng" class="list_con">
              <img :src="eng.pic" alt="">
              <span class="eng_name">{{eng.name}}</span>
              <span class="eng_type">{{eng.text}}</span>
              <span class="eng_con">{{eng.content}}</span>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      <!-- </van-tab> -->
    <!-- </van-tabs> -->
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      tableList:['推荐','数据通信','IT实施','视频监控','UC&C','HCIE'],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      engList:[
        {
          name:'派大星',
          text:'HCIE',
          pic:'../../../static/img/daxing.jpg',
          content:'海绵海绵我是大星',
        },
        {
          name:'海绵宝宝',
          text:'HCIP',
          pic:'../../../static/img/haimian.jpg',
          content:'大星大星我是海绵',
        }
      ],
    }
  },
  methods:{
    ...mapMutations(['proMes_fn']),
    onLoad() {   //下拉加载
      setTimeout(() => {
        this.loading = false;
        setTimeout(()=>{
          this.finished=true;
        },500)
      }, 500);
    },
    onRefresh() {   //下拉刷新
     setTimeout(() => {
         this.$toast('刷新成功');
         this.isLoading = false;
         this.count++;
       }, 500);
    },
    proApply(indexPro){
      this.proMes_fn(this.proList[indexPro])
      this.$router.push({
        name:'ProDetials'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.pro_list{
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 10rem;
  .list_con{
    width: 95%;
    margin:0 auto;
    margin-top:1rem;
    height: 10rem;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
    position: relative;
    img{
      width: 8rem;
      height:8rem;
      border-radius: 50%;
    }
    .eng_name{
      position: absolute;
      top:0;
      left:9rem;
      font-size: 1.5rem;
      top:.5rem;
    }
    .eng_type{
      border:1px solid $tem-color;
      border-radius: 10px;
      color:$tem-color;
      padding-left: .2rem;
      padding-right: .2rem;
      font-size: 1.2rem;
      position: absolute;
      top:3.5rem;
      left:9rem;
      height: 1.5rem;
      line-height: 1.5rem;
    }
    .eng_con{
      position: absolute;
      left:9rem;
      bottom:.2rem;
    }
  }
}
</style>
