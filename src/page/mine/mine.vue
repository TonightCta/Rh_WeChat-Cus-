<!-- 个人中心 -->
<template lang="html">
  <div class="mine">
    <WorkHeader>
      <p>个人信息</p>
    </WorkHeader>
    <div class="mine_con">
      <div class="con_card">
        <p class="user_pic">
          头像
          <img src="../../../static/img/dont.jpg" alt="">
        </p>
        <p class="user_nickname">
          昵称:&nbsp;{{nickName}}
        </p>
      </div>
      <div class="con_mes">
        <ul>
          <li>手机号:&nbsp;{{userPhone}}</li>
          <router-link to="/mineIndu" tag="li">
            所属行业:&nbsp;<span v-if="comIndu!=null">{{comIndu}}</span><span v-else>-</span>
          </router-link>
          <!-- <router-link to="/mineFeild" tag="li">擅长技能:&nbsp;软件开发,视频监控,网站搭建</router-link> -->
          <li @click="placeChose=true">所在地区:&nbsp;
            <span v-if="cityText!=null">{{cityText}}</span>
            <span v-else>-</span>
          </li>
          <li v-if="userMes.ictOperatorVO.ictCustomerVO.type==0">
            <router-link to="/companyAuth" tag="span" class="isAuthMask" v-if="isAuthMask"></router-link>
            我的认证&nbsp;
              <span class="authText">{{authText}}</span>
              <span class="right_oper icon">
                <van-icon name="arrow" size="22" />
              </span>
          </li>
          <li>我的信用分:&nbsp;
            <span class="right_oper">100</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 所在地区选择 -->
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
  </div>
</template>

<script>
import PlaceData from '../../../static/data/place.json'
import WorkHeader from '@/components/work_header'
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      nickName:null,//用户昵称
      userPhone:null,//用户手机
      placeList:[],//地点列表
      placeChose:false,//地区选择
      cityList:null,//选择城市列表
      //placeChoose
      activeIndex:0,
      cityText:null,//所在城市
      comIndu:null,//所属行业
      authText:'未认证',//认证状态
      isAuthMask:true,//是否可认证
    }
  },
  components:{
    WorkHeader
  },
  computed:{
    ...mapState(['userMes','token'])
  },
  created(){
    console.log(this.userMes)
    this.placeList=PlaceData.data;
    this.nickName=this.userMes.ictOperatorVO.ictCustomerVO.name;
    this.userPhone=this.userMes.ictOperatorVO.mobile;
    if(this.userMes.ictOperatorVO.ictCustomerVO.livePlace!=null){
      this.cityText=this.userMes.ictOperatorVO.ictCustomerVO.livePlace;
    }
    if(this.userMes.ictOperatorVO.ictCustomerVO.industry!=null){
      this.comIndu=this.userMes.ictOperatorVO.ictCustomerVO.industry;
    };
    if(this.userMes.ictOperatorVO.ictCustomerVO.state==0){
      this.authText='未认证'
      this.isAuthMask=true;
    }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==1){
      this.authText='已申请'
    }else if(this.userMes.ictOperatorVO.ictCustomerVO.state==2){
      this.authText='已认证'
    }else{
      this.authText='已驳回'
      this.isAuthMask=true;
    }
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    turnCity(){//确认选中城市
      let _this=this;
      if(_this.cityList!=null){
        _this.cityText=_this.cityList;
        let formdata=new FormData();
        formdata.append('livePlace',_this.cityText);
        _this.$axios.post(_this.url+'/ict/customer/savePersonalCenter',formdata,{
          headers:{
            'Authorization':_this.token
          }
        }).then((res)=>{
          if(res.data.code==0){
            _this.$toast('设置地区成功');
            _this.userMes_fn(res.data.data)
            _this.placeChose=false;
          }else{
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          // console.log(err);
          _this.$toast('未知错误,请联系管理员')
        })
      }else{
        _this.placeChose=false;
      }
    },
    choseCity(city){//选择城市
      this.cityList=city.text;
    },
  }
}
</script>

<style lang="scss" scoped>
.mine{
  width: 100%;
  padding-top:5rem;
  padding-bottom: 1rem;
  .mine_con{
    width: $tem-width;
    margin:0 auto;
    .con_card{
      height: 15rem;
      width: 100%;
      margin-top: 1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 5px;
      p{
        box-sizing: border-box;
        padding-left: 1rem;
        font-size: 1.4rem;
      }
      .user_pic{
        height: 10rem;
        line-height: 10rem;
        position: relative;
        border-bottom: 1px solid #eee;
        img{
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          position: absolute;
          right:2rem;
          top:1rem;
        }
      }
      .user_nickname{
        line-height: 5rem;
      }
    }
    .con_mes{
      width: 100%;
      margin-top: 1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 5px;
      ul{
        li{
          line-height: 7rem;
          box-sizing: border-box;
          padding-left: 1rem;
          font-size: 1.4rem;
          border-bottom:1px solid #eee;
          position: relative;
          overflow: hidden;
          .authText{
            position: absolute;
            right:5rem;
            color:#666;
          }
          .right_oper{
            position: absolute;
            right:2rem;
          }
          .icon{
            top:.5rem;
          }
          .isAuthMask{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            background: red;
            opacity: 0;
          }
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
}
</style>
