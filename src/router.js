import Vue from "vue";
import Router from "vue-router";

import Login from "./views/login"
import Loyout from "./components/Loyout.vue"

import Home from './views/home'
import Member from './views/member'
import Supplier from './views/supplier'
import Goods from './views/goods'
import Staff from './views/staff'

Vue.use(Router);

export default new Router({

  routes: [

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",   //基础布局页面
      name: "loyout",
      component: Loyout,
      redirect: '/home',
      children: [

        {
          path: "/home",
          meta: {title: '首页'},
          component: Home
        },
        {
          path: "/member",
          component: Member,
          meta: {title: '会员管理'}
        }

      ]
    }
  ]
});
