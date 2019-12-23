<!-- 我的发单 -->
<template lang="html">
  <div class="mine_order">
    <WorkHeader>
      <p>我的发单</p>
    </WorkHeader>
    <div class="order_con">
      <van-tabs>
        <van-tab v-for="index in tableList" :title="index" :key="index" title-active-color="red">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="pro_list"
            >
              <van-cell  v-for="(order,indexOr) in orderList" :key="indexOr" class="list_con">
                <span class="order_name">{{order.name}}</span>
                <span class="order_remark">{{order.content}}</span><br>
                <p>
                  <span style="color:red;font-weight:bold;">￥{{order.count}}</span>
                  <span>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==0">待支付</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==1">匹配中</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==2">服务中</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==3" disabled >已完成</van-button>
                  </span>
                </p>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      tableList:['全部','匹配中','服务中','待支付','已完成'],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      orderList:[
        {
          name:'北京瑞得音xxxx项目',
          content:'乌拉乌拉乌拉乌拉乌拉乌拉乌拉乌拉...',
          count:'10000-28888',
          state:2,
        },
        {
          name:'北京瑞得音xxxx项目',
          content:'乌拉乌拉乌拉乌拉乌拉乌拉乌拉乌拉...',
          count:'10000-28888',
          state:1,
        },
        {
          name:'北京瑞得音xxxx项目',
          content:'乌拉乌拉乌拉乌拉乌拉乌拉乌拉乌拉...',
          count:'10000-28888',
          state:3,
        },
        {
          name:'北京瑞得音xxxx项目',
          content:'乌拉乌拉乌拉乌拉乌拉乌拉乌拉乌拉...',
          count:'10000-28888',
          state:0,
        },
      ],
    }
  },
  methods:{
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
  }
}
</script>

<style lang="scss" scoped>
.mine_order{
  width: 100%;
  padding-top: 5rem;
  .pro_list{
    padding-bottom: 10rem;
    .list_con{
      .order_name{
        font-size: 1.6rem;
      }
      .order_remark{
        font-size: 1.3rem;
        color:#666;
      }
    }
    p{
      display: flex;
      justify-content: space-between;
      line-height: 3rem;
    }
  }
}
</style>
