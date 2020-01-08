<!-- 擅长行业 -->
<template lang="html">
  <div class="mine_indu">
    <WorkHeader>
      <p>所属行业</p>
    </WorkHeader>
    <div class="indu_con">
      <ul>
        <li v-for="(filed,indexFe) in felidList" ref="feildDom" @click="choseFeild(indexFe)">
          <span ref="feildBack" @click.stop="backFeild(indexFe)"></span>
          {{filed}}</li>
      </ul>
      <p class="manual_add">
        <input type="text" name="" value="" placeholder="自行添加擅长行业" v-model="manualText">
        <button type="button" name="button" v-show="isText">确定</button>
      </p>
      <p class="saveBtn">
        <button type="button" name="button" @click="saveIndu()">保存</button>
      </p>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  components:{WorkHeader},
  data(){
    return{
      felidList:['移动互联网','通信','电子商务','电子计算机','物联网','互联网信息及技术服务','电脑设备与软件'],
      manualText:null,//自编辑技能
      isText:false,//添加按钮
      InduList:[],//选中行业
    }
  },
  computed:{
    ...mapState(['userMes','token'])
  },
  mounted(){
    this.InduList=this.userMes.ictOperatorVO.ictCustomerVO.industry.split('/');
    for(let i in this.InduList){
      this.$refs.feildDom[this.felidList.indexOf(this.InduList[i])].style.background="#C93625";
      this.$refs.feildDom[this.felidList.indexOf(this.InduList[i])].style.color="white";
      this.$refs.feildBack[this.felidList.indexOf(this.InduList[i])].style.display="block";
    }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    choseFeild(index){//选中行业
      this.$refs.feildDom[index].style.background="#C93625"
      this.$refs.feildDom[index].style.color="white";
      this.$refs.feildBack[index].style.display="block";
      this.InduList.push(this.felidList[index]);
    },
    backFeild(index){//取消选中
      this.$refs.feildDom[index].style.background="white";
      this.$refs.feildDom[index].style.color="black";
      this.$refs.feildBack[index].style.display="none";
      this.InduList.splice(this.InduList.indexOf(this.felidList[index]),1);
    },
    saveIndu(){//保存擅长行业
      let _this=this;
      if(this.InduList.length<1){
        _this.$toast('请选择至少一项所属行业')
      }else{
        console.log(_this.InduList)
        let formdata=new FormData();
        formdata.append('industry',_this.InduList.join('/'));
        _this.$axios.post(_this.url+'/ict/customer/savePersonalCenter',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.code==0){
            _this.$toast('保存擅长行业成功');
            _this.userMes_fn(res.data.data)
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast('未知错误,请联系客服')
          console.log(err)
        })
      }
    },
  },
  watch:{
    manualText(val,old){
      if(val!=null&&val!=''){
        this.isText=true;
      }else{
        this.isText=false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_indu{
  width: 100%;
  padding-top: 5rem;
  .indu_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        padding-left: .4rem;
        padding-right: .4rem;
        height: 3rem;
        text-align: center;
        border-radius: 5px;
        line-height: 3rem;
        color:black;
        font-size: 1.4rem;
        border:1px solid $tem-color;
        margin-left: 1rem;
        margin-top: 2rem;
        position: relative;
        span{
          display: inline-block;
          width: 100%;
          height:100%;
          position: absolute;
          left:0;
          top:0;
          background: red;
          display: none;
          opacity: 0;
        }
      }
    }
    .manual_add{
      width: 100%;
      margin-top:3rem;
      position: relative;
      line-height: 4rem;
      input{
        width: 100%;
        font-size: 1.5rem;
        border-bottom:1px solid #ccc;
      }
      button{
        width: 4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        font-size: 1.4rem;
        border-radius: 3px;
        background: $btn-color;
        color:white;
        position: absolute;
        right:.5rem;
        top:1rem;
      }
    }
  }
  .saveBtn{
    position: fixed;
    width: 100%;
    padding-bottom: 1rem;
    text-align: center;
    bottom:0;
    button{
      width:$tem-width;
      background: $btn-color;
      color:white;
      height: 3.5rem;
      font-size: 1.5rem;
      border-radius: 20px;
    }
  }
}
</style>
