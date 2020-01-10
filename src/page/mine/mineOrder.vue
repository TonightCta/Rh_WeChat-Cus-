<!-- 我的发单 -->
<template lang="html">
  <div class="mine_order">
    <WorkHeader>
      <p>我的发单</p>
    </WorkHeader>
    <div class="order_con">
      <van-tabs title-active-color="#C93625" color="#C93625" @click="searchOrder">
        <van-tab v-for="index in tableList" :title="index" :key="index">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="pro_list"
            >
              <van-cell  v-for="(order,indexOr) in orderList" :key="indexOr" class="list_con" @click="orderDetalis(indexOr)">
                <span class="order_name">{{order.projectName}}</span><br>
                <span class="order_remark">{{order.content}}</span><br>
                <p>
                  <span style="color:red;font-weight:bold;">￥{{order.minBudget}}-{{order.maxBudget}}</span>
                  <span>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==0">已申请</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==1">已审核</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==2">已委派</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==3">已开工</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==4">待付款</van-button>
                    <van-button type="info" round color="#404040" size="small" v-show="order.state==5">已完成</van-button>
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
import {mapState,mapMutations} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      tableList:['全部','已申请','匹配中','服务中','待支付','已完成'],
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
        }
      ],
    }
  },
  computed:{
      ...mapState(['token','userMes'])
  },
  mounted(){
    this.getOrderList()
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
    getOrderList(type){//获取发单列表
      let _this=this;
      console.log(_this.userMes)
      let formdata=new FormData();
      formdata.append('customerId',_this.userMes.ictOperatorVO.ictCustomerVO.id);
      console.log(type)
      if(type!=undefined){
        formdata.append('state',type);
      }
      _this.$axios.post(_this.url+'/ict/demand/findListByCondition',formdata,{headers:{
        'Authorization':_this.token
      }}).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          _this.orderList=res.data.data.content;
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        // console.log(err);
        _this.$toast('未知错误,请联系客服')
      })
    },
    orderDetalis(index){//发单详情
      this.proMes_fn(this.orderList[index]);
      this.$router.push('/orderDetails')
    },
    searchOrder(name,title){//切换列表
      this.onLoad()
      if(title==='全部'){
        this.getOrderList()
      }else if(title==='已申请'){
        this.getOrderList(0)
      }else if(title==='匹配中'){
        this.getOrderList(1)
      }else if(title==='服务中'){
        this.getOrderList(3)
      }else if(title=='待支付'){
        this.getOrderList(4)
      }else if(title==='已完成'){
        this.getOrderList(5)
      }
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
      width: 95%;
      margin:0 auto;
      margin-top:1rem;
      height: 10rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      position: relative;
      .pro_name{
        font-weight: bold;
        font-size: 1.5rem;
      }
      .pro_public{
        color:#666;
        margin-top:1rem;
      }
      .pro_count{
        color:$tem-color;
        font-weight: bold;
        position: absolute;
        top:.2rem;
        right:.5rem;
      }
      .pro_status{
        margin-left: 2.5rem;
        .public_tate{
          margin-left: 1rem;
          font-size: 1.3rem;
        }
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
