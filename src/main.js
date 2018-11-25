import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册到Vue上
Vue.use(ElementUI);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)


import axios from 'axios'

Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://111.230.232.110:8899/';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import './assets/site/css/style.css';

import index from './components/index.vue';
import detail from "./components/detail.vue";
import shopCart from "./components/shopCart.vue";

let routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    component:index
  },
  {
    path: "/detail/:artID",
    component: detail
  },
  {
    path: "/shopCart",
    component: shopCart
  }
]

let router = new VueRouter({
  routes
});

import moment from 'moment';
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{
      90:6,
      84:7
    }
  },

  getters: {
    totalCount(state){
      let num = 0;
      for (const key in state.cartData) {
        num += state.cartData[key]
      }
      return num;
    }
  },
  
  mutations: {
    // increment (state) {
    //   state.count+=state.firstCount
    // }
    add2Cart(state,obj){
      if(state.cartData[obj.goodId]!=undefined){
        state.cartData[obj.goodId]+=obj.goodNum;
      }else{
        Vue.set(state.cartData,obj.goodId,obj.goodNum)
      }
      console.log(state);
    }
  }
})

window.onbeforeunload = function () {
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
