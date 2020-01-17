<!-- 发布需求 -->
<template lang="html">
  <div class="send_first">
    <WorkHeader>
      <p>发起需求</p>
    </WorkHeader>
    <div class="first_con">
      <ul>
        <li>项目名称:
          <input type="text" name="" value="" placeholder="请输入项目名称" v-model="upMes.proName">
        </li>
        <li>需求类型:
          <input type="text" name="" value="" placeholder="请输入需求类型" v-model="upMes.demandType">
          <span @click="typeChose=true"></span>
        </li>
        <li>
          <!-- <input type="text" name="" value="" placeholder="请输入所有方向" v-model="upMes.demandDire"> -->
          <textarea name="name" rows="8" cols="80" placeholder="请输入需求描述" v-model="upMes.demandDire"></textarea>
        </li>
        <li>服务地址:
          <input type="text" name="" value="" placeholder="请选择服务地址" v-model="upMes.cityText">
          <span @click="placeChose=true"></span>
        </li>
        <li>详细地址:
          <input type="text" name="" value="" placeholder="请输入详细地址" v-model="upMes.address">
        </li>
        <li>&nbsp;&nbsp;&nbsp;联系人:
          <input  onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" name="" value="" placeholder="请输入联系人" v-model="upMes.demandCus">
        </li>
        <li>现场联系人电话:
          <input type="number" name="" value="" placeholder="请输入联系人电话" v-model="upMes.demandMoblie" style="width:20rem;">
        </li>
        <li>开始时间:
          <input type="text" name="" value="" placeholder="请选择开始时间" v-model="upMes.dateText">
          <span @click="dateChose=true"></span>
        </li>
        <li>
          预算金额:
          <input type="number" name="" value="" placeholder="￥" v-model="upMes.minMount">
          ———
          <input type="number" name="" value="" placeholder="￥" v-model="upMes.maxMount">
        </li>
      </ul>
      <p style="marginTop:1rem;" class="publicP">
        <van-radio-group v-model="upMes.isAgree">
          <van-radio name="1" checked-color="#C93625" icon-size="16">同意<span style="color:#C93625;">《犀牛小哥项目发布规则》</span></van-radio>
        </van-radio-group>
      </p>
      <p class="publicP">温馨提示:</p>
      <p class="publicP">&nbsp;&nbsp;&nbsp;1、请您仔细核对填写的项目信息胡椒粉和科技阿富汗喀个哈萨克就复活卡时间发货个哈时间复活卡时间发哈市发哈时间发货</p>
    </div>
    <!-- 地址选择 -->
    <div class="">
      <van-popup
        v-model="placeChose"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <p class="place_title">
        <span>取消</span>
        <span @click="turnCity()">确定</span>
      </p>
        <van-tree-select
          :items="placeList"
          :active-id.sync="cityList"
          :main-active-index.sync="activeIndex"
          :click-item="choseCity"
        />
      </van-popup>
    </div>
    <div class="">
      <van-popup
        v-model="dateChose"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <van-datetime-picker
        v-model="choseTime"
        type="date"
        :min-date="minDate"
        @confirm="turnDate"
      />
      </van-popup>
    </div>
    <p class="order_btn">
      <button type="button" name="button" @click="subDemand()">发布</button>
    </p>
    <div class="">
      <van-popup
        v-model="typeChose"
        position="bottom"
        :style="{ height: '40%' }"
      >
      <van-picker
        show-toolbar
        title="标题"
        :columns="typeList"
        @cancel="cancelType"
        @confirm="turnType"
      />
      </van-popup>
    </div>
  </div>
</template>

<script>
import PlaceData from '../../../static/data/place.json'
import WorkHeader from '@/components/work_header'
import {mapState} from 'vuex'
export default {
  components:{WorkHeader},
  data(){
    return{
      placeChose:false,
      cityList:[],//选择地区列表
      placeList:[],//地点数据
      cityText:null,//回显地址
      activeIndex:0,//默认展开省市
      dateChose:false,//日期选择盒子
      minDate:new Date(),//最小选择日期
      choseTime:null,//选择日期
      dateText:null,//日期回显
      upMes:{
        proName:null,//项目名称
        demandType:null,//需求类型
        demandDire:null,// 所有方向
        cityText:null,//地址选择
        address:null,//详细地址
        damandCus:null,//联系人
        demandMoblie:null,//联系方式
        dateText:null,//开始时间
        minMount:null,//最小金额
        maxMount:null,//最大金额
        isAgree:2,
      },
      typeList:['故障处理','安装调试','设备巡检','售前支持','信息化管理软件','咨询服务','视频监控','其他'],//需求类型列表
      typeChose:false,//需求类型选择盒子
    }
  },
  computed:{
    ...mapState(['token'])
  },
  created(){
    this.placeList=PlaceData.data;
  },
  methods:{
    choseCity(city){//选择城市
      if(this.cityList.indexOf(city.text)>-1){
        this.cityList.splice(this.cityList.indexOf(city.text),1)
      }else{
        this.cityList.push(city.text)
      };
    },
    turnCity(){//确认选择城市
      this.placeChose=false;
      if(this.cityList.length>0){
        this.upMes.cityText=this.cityList.join(',');
      }else{
        this.upMes.cityText=null;
      }
    },
    turnDate(beginTime){//选择开始日期
      let date=new Date(beginTime);
      let year=date.getFullYear();
      let mon=date.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      };
      let day=date.getDate();
      if(day<10){
        day='0'+day
      }
      this.upMes.dateText=year+'-'+mon+'-'+day;
      this.dateChose=false;
    },
    nextStep(){//第二步发单信息
      this.$router.push('/sendComTurnOrder')
    },
    turnType(value){//需求类型选择
      this.upMes.demandType=value;
      this.typeChose=false;
    },
    cancelType(){
      this.typeChose=false;
    },
    subDemand(){//提交需求
      let _vm=this;
      if(_vm.upMes.proName==null||_vm.upMes.proName==''){
        _vm.$toast('请输入项目名称')
      }else if(_vm.upMes.demandType==null||_vm.upMes.demandType==''){
        _vm.$toast('请输入需求类型')
      }else if(_vm.upMes.demandDire==null||_vm.upMes.demandDire==''){
        _vm.$toast('请输入所有方向')
      }else if(_vm.upMes.cityText==null||_vm.upMes.cityText==''){
        _vm.$toast('请选择服务地址')
      }else if(_vm.upMes.address==null||_vm.upMes.address==''){
        _vm.$toast('请输入详细地址')
      }else if(_vm.upMes.demandCus==null||_vm.upMes.demandCus==''){
        _vm.$toast('请输入联系人')
      }else if(_vm.upMes.demandMoblie==null||_vm.upMes.demandMoblie==''){
        _vm.$toast('请输入联系方式')
      }else if(!(/^1[3456789]\d{9}$/.test(_vm.upMes.demandMoblie))){
        _vm.$toast('请输入正确的手机号')
      }else if(_vm.upMes.dateText==null||_vm.upMes.dateText==''){
        _vm.$toast('请选择开始时间')
      }else if(_vm.upMes.minMount==null||_vm.upMes.minMount==''){
        _vm.$toast('请输入最小金额')
      }else if(_vm.upMes.maxMount==null||_vm.upMes.maxMount==''){
        _vm.$toast('请输入最大金额')
      }else if(_vm.upMes.isAgree!=1){
        _vm.$toast('请您勾选并知晓项目规则')
      }else{
        let formdata =new FormData();
        console.log(_vm.token)
        formdata.append('projectName',_vm.upMes.proName)
        formdata.append('type',_vm.upMes.demandType)
        formdata.append('category',_vm.upMes.demandDire)
        formdata.append('place',_vm.upMes.address)
        formdata.append('address',_vm.upMes.cityText)
        formdata.append('linkman',_vm.upMes.demandCus)
        formdata.append('contact',_vm.upMes.demandMoblie)
        formdata.append('startTime',_vm.upMes.dateText)
        formdata.append('minBudget',_vm.upMes.minMount)
        formdata.append('maxBudget',_vm.upMes.maxMount);
        _vm.$axios.post(_vm.url+'/ict/demand/save',formdata,{headers:{
          'Authorization':_vm.token
        }}).then((res)=>{
          if(res.data.code==0){
            _vm.$toast('发布成功')
            _vm.$router.go(-1)
          }else{
            _vm.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _vm.$toast('未知错误,请联系客服')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.send_first{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 10rem;
  .first_con{
    width: $tem-width;
    margin:0 auto;
    ul{
      width: 100%;
      li{
        width: 100%;
        line-height: 5rem;
        margin-top:1.5rem;
        border-radius: 8px;
        box-shadow: 0px 0px 5px #ccc;
        box-sizing: border-box;
        padding-left: 1.5rem;
        font-size: 1.4rem;
        position: relative;
        input{
          width: 25rem;
          border-bottom:1px solid #ccc;
          line-height: 3.5rem;
          padding-left: .5rem;
        }
        span{
          position: absolute;
          width: 100%;
          height:100%;
          left:0;
          top:0;
        }
        textarea{
          width: 95%;
          margin-top:1.5rem;
          border-radius: 10px;
          height: 10rem;
          padding: .3rem;
        }
      }
      li:last-child{
        input{
          width: 7rem;
          text-align: center;
        }
      }
    }
  }
  .place_title{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    font-size: 1.5rem;
    display: flex;
    border-bottom:1px solid #eee;
    span{
      width: 50%;
      box-sizing: border-box;
    }
    span:first-child{
      padding-left: 1rem;
    }
    span:last-child{
      text-align: right;
      padding-right: 1rem;
      color:$tem-color;
    }
  }
  .publicP{
    color:$tem-color;
    margin-top: 1rem;
    font-size: 1.4rem;
  }
  .order_btn{
    width: 100%;
    position: fixed;
    bottom:0;
    left:0;
    padding-bottom: 1rem;
    text-align: center;
    background: white;
    button{
      width: $tem-width;
      background: $btn-color;
      color:white;
      border-radius: 20px;
      height: 3.5rem;
      font-size: 1.4rem;
    }
  }
}
</style>
