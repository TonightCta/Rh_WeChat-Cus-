import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
import NProgress from 'nprogress'
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
const router=new Router({
  routes:[
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      name:'Home',
      component:resolve=>require(['@/page/home/home'],resolve),
      meta:{
        title:'犀牛小哥'
      }
    },
    {
      path:'/register',//注册
      name:'Regisiter',
      component:resolve=>require(['@/page/login/register'],resolve),
      meta:{
        title:'注册'
      }
    },
    {
      path:'/login',//登录
      name:'Login',
      component:resolve=>require(['@/page/login/login'],resolve),
      meta:{
        title:'登录'
      }
    },
    {
      path:'/passForget',//忘记密码
      name:'PassForGet',
      component:resolve=>require(['@/page/login/passForget'],resolve),
      meta:{
        title:'忘记密码'
      }
    },
    {
      path:'/companyRe',//企业注册
      name:'CompanyRe',
      component:resolve=>require(['@/page/login/companyRegister'],resolve),
      meta:{
        title:'企业注册'
      }
    },
    // {
    //   path:'/proDetials',//项目详情,
    //   name:'ProDetials',
    //   component:resolve=>require(['@/page/proAbout/pro_details'],resolve)
    // },
    // {
    //   path:'/proApply',//申请接单
    //   name:'ProApply',
    //   component:resolve=>require(['@/page/proAbout/pro_apply'],resolve)
    // },
    // {
    //   path:'/mine',//个人中心
    //   name:'Mine',
    //   component:resolve=>require(['@/page/mine/mine'],resolve)
    // },
    {
      path:'/mineMessages',//消息中心
      name:'MineMessages',
      component:resolve=>require(['@/page/mine/mineMessages'],resolve)
    },
    // {
    //   path:'/minePro',//个人接单
    //   name:'MinePro',
    //   component:resolve=>require(['@/page/mine/minePro'],resolve)
    // },
    // {
    //   path:'/mineProDe',//个人接单详情
    //   name:'MineProDe',
    //   component:resolve=>require(['@/page/mine/mineProDetails'],resolve)
    // },
    // {
    //   path:'/mineAuth',//我的认证
    //   name:'MineAuth',
    //   component:resolve=>require(['@/page/mine/mineAuth'],resolve)
    // },
    // {
    //   path:'/mineFeild',//擅长领域
    //   name:'MineFeild',
    //   component:resolve=>require(['@/page/mine/mineFeild'],resolve)
    // },
    // {
    //   path:'/mineCard',//身份认证
    //   name:'MineCard',
    //   component:resolve=>require(['@/page/mine/mineCard'],resolve)
    // },
    // {
    //   path:'/skillList',//技能列表
    //   name:'SkillList',
    //   component:resolve=>require(['@/page/mine/skillList'],resolve)
    // },
    // {
    //   path:'/addSkill',//添加技能认证
    //   name:'AddSkill',
    //   component:resolve=>require(['@/page/mine/addSkill'],resolve)
    // },
    // {
    //   path:'/engAuth',//工程师认证
    //   name:'EngAuth',
    //   component:resolve=>require(['@/page/mine/engAuth'],resolve)
    // },
    // {
    //   path:'/engCard',//工程师资质认证
    //   name:'EngCard',
    //   component:resolve=>require(['@/page/mine/engCard'],resolve)
    // },
    // {
    //   path:'/alipayAuth',//支付宝认证
    //   name:'AlipayAuth',
    //   component:resolve=>require(['@/page/mine/alipayAuth'],resolve)
    // },
    // {
    //   path:'/mineLiver',//项目交付
    //   name:'MineLiver',
    //   component:resolve=>require(['@/page/mine/mineNLiver'],resolve)
    // }
  ]
});
router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router;
