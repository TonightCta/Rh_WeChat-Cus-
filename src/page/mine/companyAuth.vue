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
          <input type="text" name="" value="" placeholder="请输入公司开户行名称">
        </p>
        <p>
          公司开户银行账号:
          <input type="number" name="" value="" placeholder="请输入公司开户行账号">
        </p>
      </div>
      <div class="company_mes">
        <p style="fontSize:1.5rem;">上传营业执照</p>
        <p class="publicP">请确保证件完整,编号、印章、文字、照片均清楚可见</p>
        <p class="upPic">
          <img v-for="(lic,index) in licPic" :src="lic" alt="" @click="licPicBox=true">
          <input type="file" Accept="image/*" name="" value="" v-if="isUpLic" @change="upLic">
          <span v-else>
            <van-icon name="clear" size="20" @click="delLicPic()"/>
          </span>
        </p>
        <p class="publicP">
          <van-radio-group v-model="isAgree">
            <van-radio name="1" checked-color="#C93625" icon-size="16">同意<span style="color:#C93625;">《犀牛小哥项目发布规则》</span></van-radio>
          </van-radio-group>
        </p>
        <p class="publicP">温馨提示:</p>
        <p class="publicP">&nbsp;&nbsp;&nbsp;1、请您仔细核对填写的项目信息胡椒粉和科技阿富汗喀个哈萨克就复活卡时间发货个哈时间复活卡时间发哈市发哈时间发货</p>
      </div>
    </div>
    <div class="">
      <van-image-preview
        v-model="licPicBox"
        :images="licPic"
      >
      </van-image-preview>
    </div>
    <p class="sub_btn">
      <button type="button" name="button">提交认证</button>
    </p>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{WorkHeader},
  data(){
    return{
      isAgree:2,
      isUpLic:true,//图片上传按钮
      licPic:[],//营业执照列表
      licPicBox:false,//查看大图盒子
    }
  },
  methods:{
    upLic(e){//营业执照上传
      let _this=this;
      let file=e.target.files[0];
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(){
        _this.licPic.push(this.result);
        _this.isUpLic=false;
      };
    },
    delLicPic(){
      this.licPic=[];
      this.isUpLic=true;
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
