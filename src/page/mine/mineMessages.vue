<!-- 消息中心 -->
<template lang="html">
  <div class="mine_messages">
    <WorkHeader>
      <p>我的消息</p>
    </WorkHeader>
    <div class="message_con">
      <van-tabs v-model="active" title-active-color="#C93625" color="#C93625" @click="changeMsg">
        <van-tab title="消息通知">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="mes_list"
            >
              <van-cell  v-for="(mes,indexMes) in messageList" :key="indexMes" class="list_con" @click="msgDe(indexMes)">
                <p>{{mes.content}}</p>
                <span>{{mes.createTime}}</span>
                <span class="isRead" v-if="!mes.isRead"></span>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="活动消息">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="mes_list"
            >
              <van-cell  v-for="(mes,indexMes) in messageList" :key="indexMes" class="list_con" @click="msgDe(indexMes)">
                <p>{{mes.content.substring(0,17)}}...</p>
                <span>{{mes.createTime}}</span>
                <span class="isRead" v-if="!mes.isRead"></span>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      active:0,//tab默认值
      isLoading: false,
      loading: false,
      finished: false,
      messageList:[],
      changeTitle:'消息通知',
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    this.getMsgList()
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
    getMsgList(){//获取消息列表
      let  _this=this;
      let formdata=new FormData();
      formdata.append('operatorId',_this.userMes.ictOperatorVO.id)
      formdata.append('type',_this.changeTitle);
      _this.$axios.post(_this.url+'/ict/message/findListByCondition',formdata).then((res)=>{
        console.log(res);
        if(res.data.code==0){
          _this.messageList=res.data.data.content;
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast('未知错误,请联系客服')
      })
    },
    onRefresh() {   //下拉刷新
      this.getMsgList()
     setTimeout(() => {
         this.$toast('刷新成功');
         this.isLoading = false;
         this.count++;
       }, 500);
    },
    msgDe(index){//消息详情
      let formdata=new FormData()
      formdata.append('id',this.messageList[index].id);
      formdata.append('isRead',true);
      this.$axios.post(this.url+'/ict/message/updateIsRead',formdata).then((res)=>{
        if(res.data.code==0){
          this.$router.push({
            name:'MsgDetails',
            params:{
              MsgCon:this.messageList[index]
            }
          })
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast('未知错误,请联系客服')
      })
    },
    changeMsg(title,name){
      this.changeTitle=name;
      this.getMsgList()
    },
  }
}
</script>

<style lang="scss">
.mine_messages{
  width: 100%;
  padding-top:5rem;
  .mes_list{
    width: $tem-width;
    margin:0 auto;
    padding-bottom: 10rem;
    .van-cell{
      line-height: 3rem;
      margin-top: 1rem;
      border-radius: 8px;
      box-shadow: 0px 0px 5px #ccc;
      p{
        font-size: 1.5rem;
        font-weight: bold;
      }
      span{
        margin-top: .5rem;
        font-size: 1.4rem;
        color:#666;
      }
      .isRead{
        width: 1rem;
        height: 1rem;
        background: $tem-color;
        border-radius: 50%;
        position: absolute;
        right:0;
        top:0;
      }
    }
  }
}
</style>
