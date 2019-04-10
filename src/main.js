import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import OrderList from "./pages/OrderList"
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Article from "./pages/Article";
import Axios from "axios";
import Vuex from 'vuex';
import store from "./store";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import OrderEdit from "./pages/OrderEdit";

import GoodsList from "./pages/GoodsList";
import GategoryList from "./pages/GategoryList";
import DataGrid from "./pages/DataGrid";
import GoodsAdd from "./pages/GoodsAdd";
import GoodsEdit from "./pages/GoodsEdit";
import ArticleAdd from "./pages/ArticleAdd";
import ArticlEdit from "./pages/ArticlEdit";
import OrderDetail from "./pages/OrderDetail";
//粒子特效组件
import VueParticles from 'vue-particles'


Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = "http://localhost:8899";

Vue.config.productionTip = false;
Vue.use(VueParticles)
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);

const routes = [
  { path: "/", redirect: "/admin" },
  { path: "/login", component: Login },
  {
    path: "/admin", component: Admin, redirect: "/admin/dataGrid", meta: "管理后台", children: [
      { path: "order-list", component: OrderList, meta: "订单管理" },
      { path: "article", component: Article, meta: "文章管理" },
      { path: "order-edit", component: OrderEdit, meta: "订单编辑" },
      { path: "goodsList", component: GoodsList, meta: "商品列表" },
      { path: "gategoryList", component: GategoryList, meta: "订单编辑" },
      { path: "dataGrid", component: DataGrid, meta: "成员列表" },
      { path: "goodsAdd", component: GoodsAdd, meta: "新增商品" },
      { path: "goodsEdit/:id", component: GoodsEdit, meta: "编辑商品" },
      { path: "articleAdd/:id", component: ArticleAdd, meta: "新增文章" },
      { path: "articlEdit/:id/:is", component: ArticlEdit, meta: "编辑文章" },
      { path: "order-detail", component: OrderDetail, meta: "订单详情" },

    ],
  },
];
const router = new VueRouter({ routes })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
