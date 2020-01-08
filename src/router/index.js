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
    {
      path:'/mine',//个人中心
      name:'Mine',
      component:resolve=>require(['@/page/mine/mine'],resolve)
    },
    {
      path:'/mineIndu',//所属行业
      name:'MineIndu',
      component:resolve=>require(['@/page/mine/mineIndu'],resolve)
    },
    {
      path:'/mineOrder',//我的发单
      name:'MineOrder',
      component:resolve=>require(['@/page/mine/mineOrder'],resolve)
    },
    {
      path:'/mineMessages',//消息中心
      name:'MineMessages',
      component:resolve=>require(['@/page/mine/mineMessages'],resolve)
    },
    {
      path:'/companyAuth',//企业认证
      name:'ComPanyAuth',
      component:resolve=>require(['@/page/mine/companyAuth'],resolve)
    },
    {
      path:'/sendComOrder',//企业发单
      name:'SendComOrder',
      component:resolve=>require(['@/page/sendOrder/sendFirst'],resolve)
    },
    // {
    //   path:'/sendComTurnOrder',//发送需求
    //   name:'SendComTurnOrder',
    //   component:resolve=>require(['@/page/sendOrder/sendSecond'],resolve)
    // },
    {
      path:'/sendComSecOrder',//个人发单
      name:'SendComSecOrder',
      component:resolve=>require(['@/page/sendOrder/sendSecond'],resolve)
    },
    {
      path:'/orderDetails',//发单详情
      name:'OrderDetails',
      component:resolve=>require(['@/page/mine/orderDetials'],resolve)
    }
  ]
});
router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})
router.afterEach(() => {
  setTimeout(()=>{
    NProgress.done()
  },500)
})
export default router;
