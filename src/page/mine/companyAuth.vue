<!-- 企业认证 -->
<template lang="html">
  <div class="company_auth">
    <WorkHeader>
      <p>企业认证</p>
    </WorkHeader>
    <div class="company_con">
      <div class="company_bank">
        <p>
          公司开户行名称:
          <input type="text" name="" value="" placeholder="请输入公司开户行名称" v-model="bankName">
        </p>
        <p>
          公司开户银行账号:
          <input type="number" name="" value="" placeholder="请输入公司开户行账号" v-model="bankNum">
        </p>
      </div>
      <div class="company_mes" v-if="isHasAuth">
        <p style="fontSize:1.5rem;">上传营业执照</p>
        <p class="publicP">请确保证件完整,编号、印章、文字、照片均清楚可见</p>
        <p class="upPic">
          <img v-for="(lic,index) in licPic" :src="lic" alt="" @click="licPicBox=true">
          <input type="file" Accept="image/*" name="" value="" v-if="isUpLic" @change="upLic">
          <span v-else>
            <van-icon name="clear" size="20" @click="delLicPic()"/>
          </span>
        </p>
        <p class="publicP" v-if="isHasAuth">
          <van-radio-group v-model="isAgree">
            <van-radio name="1" checked-color="#C93625" icon-size="16">同意<span style="color:#C93625;">《犀牛小哥项目认证规则》</span></van-radio>
          </van-radio-group>
        </p>
        <p class="publicP">温馨提示:</p>
        <p class="publicP">&nbsp;&nbsp;&nbsp;1、请您仔细核对填写的项目信息胡椒粉和科技阿富汗喀个哈萨克就复活卡时间发货个哈时间复活卡时间发哈市发哈时间发货</p>
      </div>
      <div class="company_mes" v-else>
        <p style="fontSize:1.5rem;">已上传营业执照</p>
        <p class="upPic">
          <img :src="url+'/'+userMes.ictOperatorVO.ictCustomerVO.businessLicense" alt="" @click="perHasUpPic()">
        </p>
      </div>
    </div>
    <div class="">
      <van-image-preview
        v-model="licPicBox"
        :images="licPic"
      >
      </van-image-preview>
    </div>
    <p class="sub_btn" v-if="isHasAuth">
      <button type="button" name="button" @click="subAuth()">提交认证</button>
    </p>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      isAgree:2,
      isUpLic:true,//图片上传按钮
      licPic:[],//营业执照列表
      licPicBox:false,//查看大图盒子
      upFile:null,//营业执照
      bankName:null,//开户行名称
      bankNum:null,//银行账号
      isHasAuth:true,//是否已认证
    }
  },
  computed:{
    ...mapState(['token','userMes'])
  },
  created(){
    console.log(this.userMes);
    if(this.userMes.ictOperatorVO.ictCustomerVO.state==1||this.userMes.ictOperatorVO.ictCustomerVO.state==2){
      this.isHasAuth=false;
      this.bankName=this.userMes.ictOperatorVO.ictCustomerVO.accountName
      this.bankNum=this.userMes.ictOperatorVO.ictCustomerVO.accountNumber
    }else{
      this.isHasAuth=true;
    };
  },
  methods:{
    ...mapMutations(['userMes_fn']),
    upLic(e){//营业执照上传
      let _this=this;
      let file=e.target.files[0];
      _this.upFile=file;
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(){
        _this.licPic.push(this.result);
        _this.isUpLic=false;
      };
    },
    perHasUpPic(){//预览已上传执照
      this.licPic.push(this.url+'/'+this.userMes.ictOperatorVO.ictCustomerVO.businessLicense);
      this.licPicBox=true;
    },
    delLicPic(){//删除已上传照片
      this.licPic=[];
      this.isUpLic=true;
      this.upFile=null;
    },
    subAuth(){//上传认证
      let _vm=this;
      if(_vm.bankName==null||_vm.bankName==''){
        _vm.$toast('请输入开户行名称')
      }else if(_vm.bankNum==null||_vm.bankNum==''){
        _vm.$toast('请输入开户行账号')
      }else if(_vm.upFile==null){
        _vm.$toast('请上传营业执照')
      }else if(_vm.isAgree!=1){
        _vm.$toast('请您勾选并知晓认证规则')
      }else{
        let formdata=new FormData();
        formdata.append('accountName',_vm.bankName)
        formdata.append('accountNumber',_vm.bankNum)
        formdata.append('file',_vm.upFile);
        _vm.$axios.post(_vm.url+'/ict/customer/saveInfo',formdata,{headers:{
          'Authorization':_vm.token
        }}).then((res)=>{
          if(res.data.code==0){
            _vm.userMes_fn(res.data.data);
            _vm.$toast('提交成功,请耐心等待审核');
            _vm.$router.go(-1);
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
.company_auth{
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 10rem;
  .company_con{
    width: $tem-width;
    margin:0 auto;
    margin-top:2rem;
    padding-bottom: 1rem;
    .company_bank{
      padding:1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      p{
        line-height: 3rem;
        font-size: 1.4rem;
        input{
          border-bottom:1px solid #eee;
          height: 3.5rem;
          width: 100%;
        }
      }
    }
    .company_mes{
      margin-top: 2rem;
      padding:1rem;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 8px;
      p{
        width: 100%;
        margin-top: 1rem;
      }
      .upPic{
        width: 90%;
        height: 15rem;
        margin:0 auto;
        background: url('../../../static/img/bg.jpg');
        background-size: 100% 100%;
        border-radius: 8px;
        margin-top: 1rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
        input{
          width: 100%;
          height: 100%;
          position: absolute;
          left:0;
          top:0;
          opacity: 0;
          border-radius: 8px;
        }
        span{
          position: absolute;
          right:-1rem;
          top:-1rem;
        }
      }
      .publicP{
        color:$tem-color;
      }
      .agreeMent{
        position: relative;
        span{
          position: absolute;
          left:5rem;
          top:.2rem;
        }
      }
    }
  }
  .sub_btn{
    width: 100%;
    position: fixed;
    bottom:0;
    padding-bottom: 1rem;
    background: white;
    left:0;
    text-align: center;
    button{
      width: 96%;
      background: $btn-color;
      color:white;
      border-radius: 20px;
      height: 3.5rem;
      font-size: 1.4rem;
    }
  }
}
</style>
