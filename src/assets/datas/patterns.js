import Vue from 'vue'
import Vuex from 'vuex'
import store from '../../store/index.js'
import md5 from 'js-md5'
import axios from 'axios'
import api from './api'

Vue.use(Vuex);

let validataPhone = (rule, value, callback) => {
  if (value.toString().length != 11) {
    callback(new Error('手机号长度不正确'));
  } else {
    callback();
  }
};

let validataPwd = (rule, value, callback) => {
  // let pwdPattern = /(?=^.{6,20}$)(?=(?:.*?\d))(?=.*[a-z])(?=(?:.*?[A-Z]))(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/;
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length < 6 || value.length > 20) {
    callback(new Error('密码长度6-20位'));
  } else {
    callback();
  }
};

let validataConfirm = (rule, value, callback) => {
  let enc_val = md5(value);
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (enc_val !== store.state.regtemp) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

let validataPhoneExsited = (rule, value, callback) => {
  if (value.toString().length != 11) {
    callback(new Error('手机号长度不正确'));
  } else {
    axios({
      method: 'post',
      url: api.mobilePhoneNumberVerification,
      data: {
        'phone': value
      }
    }).then((res) => {
      if (res.data.code == 1004) {
        callback(new Error('手机号已存在'));
      } else if (res.data.code == 1005) {
        callback();
      } else {
        callback('请求失败，请检查网络连接或联系管理员');
      }
    }).catch(
      () => {
        callback(new Error('请求失败,请检查网络连接或联系管理员'));
      }
    )
  }
};

let validataPhoneExsitedTrue = (rule, value, callback) => {
  if (value.toString().length != 11) {
    callback(new Error('手机号长度不正确'));
  } else {
    axios({
      method: 'post',
      url: api.mobilePhoneNumberVerification,
      data: {
        'phone': value
      }
    }).then((res) => {
      if (res.data.code == 1004) {
        callback();
      } else if (res.data.code == 1005) {
        callback(new Error('手机号不存在'));
      } else {
        callback('请求失败，请检查网络连接或联系管理员');
      }
    }).catch(
      () => {
        callback(new Error('请求失败,请检查网络连接或联系管理员'));
      }
    )
  }
};

let validataEmail = (rule, value, callback) => {
  let emailPattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else if (!emailPattern.test(value)) {
    callback(new Error('请输入正确的邮箱格式'));
  } else {
    callback();
  }
};

function getLength(str) {
  let realLength = 0, len = str.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

let validateLength1000 = (rule, value, callback) => {
  let realValue = getLength(value);
  if (realValue < 1000) {
    callback();
  } else {
    callback(new Error('超出长度限制'));
  }
};

export {
  validataPhone,
  validataConfirm,
  validataPwd,
  validataPhoneExsited,
  validataPhoneExsitedTrue,
  validataEmail,
  validateLength1000,
  getLength
}
