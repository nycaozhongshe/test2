import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('../components/job')), 'index');
const login = r => require.ensure([], () => r(require('../components/login')), 'login');
const register = r => require.ensure([], () => r(require('../components/register')), 'register');
const resetpwd = r => require.ensure([], () => r(require('../components/resetpwd')), 'resetpwd');
const setpwd = r => require.ensure([], () => r(require('../components/setpwd')), 'setpwd');
const position = r => require.ensure([], () => r(require('../components/position')), 'position');
const binding = r => require.ensure([], () => r(require('../components/binding')), 'binding');
const certify = r => require.ensure([], () => r(require('../components/certify')), 'certify');
const success = r => require.ensure([], () => r(require('../components/success')), 'success');
const job = r => require.ensure([], () => r(require('../components/needjob')), 'job');
const user = r => require.ensure([], () => r(require('../components/user')), 'user');
const resume = r => require.ensure([], () => r(require('../components/resume')), 'user');
const t404 = r => require.ensure([], () => r(require('../components/t404')), 't404');
const polyfill = r => require.ensure([], () => r(require('../components/polyfill')), 'polyfill');
const fillResume = r => require.ensure([], () => r(require('../components/fillResume')), 'fillResume');
const myposition = r => require.ensure([], () => r(require('../components/myposition')), 'user');
const dbe = r => require.ensure([], () => r(require('../components/deliverbyemail')), 'dbe');
const pubposition = r => require.ensure([], () => r(require('../components/pubposition')), 'pubposition');
const loadingPage = r => require.ensure([], () => r(require('../components/loadingPage')), 'loadingPage');
const changeResume = r => require.ensure([], () => r(require('../components/changeResume')), 'changeResume');
const changePosition = r => require.ensure([], () => r(require('../components/changePosition')), 'changePosition');
const aboutWBEDU = r => require.ensure([], () => r(require('../components/aboutWBEDU')), 'aboutWBEDU');
// const editResume = r => require.ensure([], () => r(require('../components/resume/main')), 'editResume');
const resumeEntry = r => require.ensure([], () => r(require('../components/resume/resumeEntry')), 'resumeEntry');
const payEntry = r => require.ensure([], () => r(require('../components/pay/payEntry')), 'pay');

import store from '../store'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      //主页
      path: '/index',
      name: 'index',
      component: index
    },
    {
      //职位列表
      path: '/job/:key',
      name: 'job',
      component: job
    },
    {
      //注册
      path: '/register',
      name: 'register',
      component: register
    },
    {
      //登陆
      path: '/login',
      name: 'login',
      component: login
    },
    {
      //重置密码-验证手机号
      path: '/resetpwd',
      name: 'resetpwd',
      component: resetpwd
    },
    {
      //重置密码
      path: '/setpwd',
      name: 'setpwd',
      component: setpwd
    },
    {
      //职位详情
      path: '/position/:id',
      name: 'position',
      component: position
    },
    {
      //绑定手机号
      path: '/binding',
      name: 'binding',
      component: binding
    },
    {
      //认证
      path: '/certify',
      name: 'certify',
      component: certify
    },
    {
      //请求成功
      path: '/success',
      name: 'success',
      component: success
    },
    {
      //用户中心
      path: '/user',
      name: 'user',
      component: user
    },
    {
      //用户中心-我的简历
      path: '/resume',
      name: 'resume',
      component: resume
    },
    {
      //404
      path: '/404',
      name: 't404',
      component: t404
    },
    {
      //中转
      path: '/polyfill',
      name: 'polyfill',
      component: polyfill
    },
    {
      //简历填写
      path: '/fillResume',
      name: 'fillResume',
      component: fillResume
    },
    {
      //我发布的职位
      path: '/myposition',
      name: 'myposition',
      component: myposition
    },
    {
      //邮件投递
      path: '/dbe',
      name: 'dbe',
      component: dbe
    },
    {
      //发布职位
      path: '/pubposition',
      name: 'pubposition',
      component: pubposition,
      // beforeEnter: (to, from, next) => {
      //   console.log(store.state.userInfo.authStatus);
      //   if (store.state.userInfo.authStatus === 2) {
      //     next();
      //   } else if (!store.state.userInfo.authStatus) {
      //     next('/');
      //   }
      //   else {
      //     alert("请先认证");
      //     next("/certify");
      //   }
      // }
    },
    {
      //简历预览
      path: '/loadingPage',
      name: 'loadingPage',
      component: loadingPage
    },
    {
      //修改简历
      path: '/changeResume/:id',
      name: 'changeResume',
      component: changeResume
    },
    {
      //修改职位
      path: '/changePosition/:id',
      name: 'changePosition',
      component: changePosition
    },
    {
      //修改职位
      path: '/aboutWBEDU',
      name: 'aboutWBEDU',
      component: aboutWBEDU
    },
    // {
    //   //简历编辑
    //   path: '/editResume/:op',
    //   name: 'editResume',
    //   component: editResume,
    //   // component: fillResume
    // },
    {
      //简历中心入口
      path: '/resumeEntry',
      name: 'resumeEntry',
      component: resumeEntry
    },
    {
      //支付入口
      path: '/payEntry',
      name: 'payEntry',
      component: payEntry
    }
  ]
})
