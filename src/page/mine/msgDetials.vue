<!-- 消息详情 -->
<template lang="html">
  <div class="msg_meitals">
    <WorkHeader>
      <p>消息详情</p>
    </WorkHeader>
    <div class="msg_con">
      <p class="messageTitle">{{conMes.title}}</p>
      <p class="messageTime">{{conMes.createTime}}</p>
      <p class="messageCon">{{conMes.content}}</p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  data(){
    return{
      conMes:{}
    }
  },
  components:{WorkHeader},
  created(){
    // console.log(this.$route.params.MsgCon);
    this.conMes=this.$route.params.MsgCon;
  },
}
</script>

<style lang="scss" scoped>
.msg_meitals{
  width: 100%;
  padding-top:5rem;
  .msg_con{
    width: 85%;
    margin:0 auto;
    padding-top: 2rem;
    p{
      margin-top: 1rem;
      font-size: 1.5rem;
    }
    .messageTitle{
      font-size: 2rem;
      font-weight: bold;
    }
    .messageTime{
      color:#999;
    }
  }
}
</style>
