import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    proMesV:{}
  },
  mutations:{
    proMes_fn(state,opt){//新闻列表缓存
      state.proMesV=opt;
    },
  },
  getters:{

  },
  actions:{

  }
});
export default store;
