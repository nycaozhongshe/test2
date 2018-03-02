// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/reset.scss'
import store from './store/index'
import axios from 'axios'
import './assets/datas/patterns'
import './assets/scss/element-variables.scss'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/datas/http'

Vue.prototype.axios = axios;

Vue.use(ElementUI, {size: 'small'});
Vue.use(VueQuillEditor, /* { default global options } */);
Vue.component('Icon', Icon);

Vue.config.productionTip = false;

if (!Array.prototype.includes) {
  Array.prototype.includes = function (search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

//判断登陆状态并跳转
router.beforeEach(({name}, from, next) => {

  const needCertify = ['pubposition'];

  const noLogged = [
    'login',
    'index',
    'job',
    'resetpwd',
    'setpwd',
    'register',
    'position',
    'agreement',
    '404',
    'talktous',
    'howtouse',
    'aboutjrxhb',
    'aboutwbedu',
    'polyfill',
    'test',
    'editResume'];
  if (JSON.parse(sessionStorage.getItem('logged'))) {
    if (name === 'login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (noLogged.includes(name)) {
      next();
    } else {
      next({name: 'login'});
    }
  }

  if (needCertify.includes(name)) {
    if (store.state.userInfo.authStatus == 1) {
      next('/certify');
    }
  } else {
    next();
  }
});

//是否显示搜索框
router.afterEach(({name}, from) => {
  const showLR = ['register', 'login', 'resetpwd', 'setpwd'];
  if (!showLR.includes(name)) {
    store.commit('trueSHOW');
  } else {
    store.commit('falseSHOW');
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: {App}
});
