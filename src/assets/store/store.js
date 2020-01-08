import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    userMes:{},//用户信息
    proMesV:{},//项目详细信息
    token:null,//接口验证标识
  },
  mutations:{
    userMes_fn(state,opt){//用户信息储存
      state.userMes=opt;
    },
    proMes_fn(state,opt){//新闻列表缓存
      state.proMesV=opt;
    },
    token_fn(state,opt){//token全局存放
      state.token=opt;
      console.log(state.token)
    },
  },
  getters:{

  },
  actions:{

  }
});
export default store;
