<!-- 发布需求 -->
<template lang="html">
  <div class="send_first">
    <WorkHeader>
      <p>发起需求</p>
    </WorkHeader>
    <div class="first_con">
      <ul>
        <li>项目名称:
          <input type="text" name="" value="" placeholder="请输入项目名称">
        </li>
        <li>需求类型:
          <input type="text" name="" value="" placeholder="请输入需求类型">
        </li>
        <li>所有方向:
          <input type="text" name="" value="" placeholder="请输入所有方向">
        </li>
        <li>服务地址:
          <input type="text" name="" value="" placeholder="请选择服务地址" v-model="cityText">
          <span @click="placeChose=true"></span>
        </li>
        <li>&nbsp;&nbsp;&nbsp;联系人:
          <input type="text" name="" value="" placeholder="请输入联系人">
        </li>
        <li>联系电话:
          <input type="text" name="" value="" placeholder="请输入联系人电话">
        </li>
        <li>开始时间:
          <input type="text" name="" value="" placeholder="请选择开始时间" v-model="dateText">
          <span @click="dateChose=true"></span>
        </li>
        <li>
          预算金额:
          <input type="number" name="" value="" placeholder="￥">
          ———
          <input type="number" name="" value="" placeholder="￥">
        </li>
      </ul>
      <p style="marginTop:1rem;">
        <van-radio-group v-model="isAgree">
          <van-radio name="1" checked-color="#C93625" icon-size="16">同意<span style="color:#C93625;">《犀牛小哥项目发布规则》</span></van-radio>
        </van-radio-group>
      </p>
      <p class="publicP">温馨提示:</p>
      <p class="publicP">&nbsp;&nbsp;&nbsp;1、请您仔细核对填写的项目信息胡椒粉和科技阿富汗喀个哈萨克就复活卡时间发货个哈时间复活卡时间发哈市发哈时间发货</p>
    </div>
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
          @click-item="choseCity"
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
      <button type="button" name="button" @click="nextStep()">下一步</button>
    </p>
  </div>
</template>

<script>
import PlaceData from '../../../static/data/place.json'
import WorkHeader from '@/components/work_header'
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
    }
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
        this.cityText=this.cityList.join(',');
      }else{
        this.cityText=null;
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
      this.dateText=year+'-'+mon+'-'+day;
      this.dateChose=false;
    },
    nextStep(){//第二步发单信息
      this.$router.push('/sendComTurnOrder')
    },
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
