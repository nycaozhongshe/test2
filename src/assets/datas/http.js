import axios from 'axios'
import store from '../../store'
import router from '../../router'
import { Message } from 'element-ui';

axios.interceptors.request.use(
  config => {
    console.log(config.data);
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    };
    Object.assign(config.headers, {'token': sessionStorage.getItem('token') || null});
    Object.assign(config.headers, {'userId': sessionStorage.getItem('userId') || null});
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => {
  if (response.status === 404) {
    router.push('/404');
  } else if (response.data === 'FAIL') {
    alert('服务器出错，请联系管理员');
  } else if (response.data === 'INTERCEPT') {
    alert('登陆超时，请重新登陆');
    sessionStorage.clear('token');
    sessionStorage.clear('logged');
    sessionStorage.clear('userId');
    sessionStorage.clear('phone');
    router.push('/login');
  } else if (+response.data.code < 0 ) {
    Message.error(response.data.msg)
  }
  return response;
}, (error) => {
  // router.push('/404');
  return Promise.reject(error);
});
