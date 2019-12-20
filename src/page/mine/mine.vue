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
          昵称:&nbsp;海绵宝宝
        </p>
      </div>
      <div class="con_mes">
        <ul>
          <li>手机号:&nbsp;18888888888</li>
          <li>擅长行业:&nbsp;移动互联网,物联网,智慧城市</li>
          <router-link to="/mineFeild" tag="li">擅长技能:&nbsp;软件开发,视频监控,网站搭建</router-link>
          <li>所在地区:&nbsp;北京-海淀区</li>
          <router-link to="/mineAuth" tag="li">
            我的认证&nbsp;
              <span class="right_oper icon">
                <van-icon name="arrow" size="22" />
              </span>
          </router-link>
          <li>我的信用分:&nbsp;
            <span class="right_oper">100</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import WorkHeader from '@/components/work_header'
export default {
  components:{
    WorkHeader
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
          .right_oper{
            position: absolute;
            right:2rem;
          }
          .icon{
            top:.5rem;
          }
        }
      }
    }
  }
}
</style>
