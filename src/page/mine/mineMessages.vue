<!-- 消息中心 -->
<template lang="html">
  <div class="mine_messages">
    <WorkHeader>
      <p>我的消息</p>
    </WorkHeader>
    <div class="message_con">
      <van-tabs v-model="active">
        <van-tab title="我的消息">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="mes_list"
            >
              <van-cell  v-for="(mes,indexMes) in messageList" :key="indexMes" class="list_con">
                <p>{{mes.content}}</p>
                <span>{{mes.time}}</span>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="系统消息">
          系统消息
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
      active:0,//tab默认值
      isLoading: false,
      loading: false,
      finished: false,
      messageList:[
        {
          content:'退出登录',
          time:'2019/08/09  18:56'
        },
        {
          content:'退出登录',
          time:'2019/12/10  09:22'
        }
      ]
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
.mine_messages{
  width: 100%;
  padding-top:5rem;
  .mes_list{
    width: $tem-width;
    margin:0 auto;
    padding-bottom: 10rem;
    .list_con{
      line-height: 3rem;
      margin-top: 1rem;
      border-radius: 8px;
      box-shadow: 0px 0px 5px #ccc;
      p{
        font-size: 1.5rem;
      }
      span{
        font-size: 1.3rem;
        color:#666;
      }
    }
  }
}
</style>
