import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import '../assets/datas/http'
import api from '../assets/datas/api'
import {arrUpDown, type2index} from "../components/resume/js/utils";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    errMessage: '',
    showLR: false,
    isLR: false,
    token: '',
    regtemp: '',
    logged: '',
    fillResFlag: false,
    userInfo: {},
    resume: {
      resumeList: [],
      resumeContext: {}
    },
    deliverList: [],
    logInfo: '',
    cityList: [],
    cityIdList: [],
    idList: {
      id: '',
      vitae_id: '',
      position_id: '',
      context: '',
      theme: ''
    },
    moduleStatus: [
      {
        type: 'baseinfo',
        status: true,
      },
      {
        type: 'education',
        status: true,
      },
      {
        type: 'internship',
        status: true,
      },
      {
        type: 'work',
        status: true,
      },
      {
        type: 'science',
        status: true,
      },
      {
        type: 'project',
        status: true,
      },
      {
        type: 'practice',
        status: true,
      },
      {
        type: 'skill',
        status: true,
      },
    ]
  },

  mutations: {
    //写入idList => id,position_id
    writeIdList1(state, n) {
      state.idList.id = n.id;
      state.idList.position_id = n.position_id;
    },

    //写入idList => vitae_id
    writeIdList2(state, n) {
      state.idList.vitae_id = n;
    },

    //写入idList => context
    writeIdList3(state, n) {
      state.idList.context = n.context;
      state.idList.theme = n.theme;
    },

    //写入userInfo
    writeUserInfo(state, n) {
      state.userInfo = n;
      if (state.userInfo.mobile) {
        state.userInfo.mobile = state.userInfo.mobile.slice(0, 3) + '****' + state.userInfo.mobile.slice(7, 11);
      }
    },

    //写入resumeList
    writeResumeList(state, n) {
      state.resume.resumeList = n;
    },

    clearIdList(state, n) {
      state.idList = {
        id: '',
        vitae_id: '',
        position_id: '',
        context: ''
      }
    },

    //认证成功提示
    fillResFlag2false(state) {
      state.fillResFlag = false;
    },

    //检查登陆状态
    isLog(state) {
      let log = sessionStorage.getItem('logged');
      if (log) {
        state.isLR = true;
      } else {
        state.isLR = false;
      }
    },

    //显示登陆注册按钮
    trueLR(state) {
      state.isLR = true;
    },

    //隐藏登陆注册按钮
    falseLR(state) {
      state = {
        errMessage: '',
        showLR: false,
        isLR: false,
        token: '',
        regtemp: '',
        logged: '',
        fillResFlag: false,
        userInfo: {},
        resume: {
          resumeList: [],
          resumeContext: {}
        },
        deliverList: [],
        logInfo: ''
      };
    },

    trueSHOW(state) {
      state.showLR = true;
    },

    falseSHOW(state) {
      state.showLR = false;
    },

    //发送手机验证码
    commitSendMessage(state, n) {
      console.log(n);
      axios({
        method: 'post',
        url: api.phoneVerificationCode,
        data: n
      }).then((res) => {
        console.log(res);
      }).catch(() => {
        alert('发送失败');
      })
    },

    //提交密码登陆表单
    commitLogForm(state, n) {
      let $router = n.router;
      axios({
        method: 'post',
        url: api.loginByPassword,
        data: n.form
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          state.logInfo = '';
          if (data.data.token) {
            sessionStorage.setItem('token', data.data.token);
            sessionStorage.setItem('logged', '1');
            sessionStorage.setItem('phone', data.data.wbUserDTO.mobile);
            sessionStorage.setItem('userId', data.data.id);

            state.userInfo = data.data.wbUserDTO;
            state.token = data.data.token;
            let tempphone = state.userInfo.mobile;
            if (tempphone) {
              state.userInfo.mobile = state.userInfo.mobile.slice(0, 3) + '****' + state.userInfo.mobile.slice(7, 11);
            }
            state.logged = '1';
            state.isLR = true;

            $router.push('/success');
          }
        }
        else {
          switch (res.data.code) {
            case '1003':
              state.logInfo = "无效的手机号";
            case '1006':
              state.logInfo = "手机号或密码不匹配";
          }
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
          alert('登陆失败，请重试或联系管理员');
        }
      });
    },

    //提交手机验证码登陆表单
    commitPhoneLogForm(state, n) {
      n.form.identification = 'login';
      let $router = n.router;
      axios({
        method: 'post',
        url: api.fastLogin,
        data: n.form
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          if (data.data.token) {
            state.userInfo = data.data.wbUserDTO;
            state.userInfo.mobile = state.userInfo.mobile.slice(0, 3) + '****' + state.userInfo.mobile.slice(7, 11);
            state.token = data.data.token;
            state.logged = '1';
            state.isLR = true;

            sessionStorage.setItem('token', state.token);
            sessionStorage.setItem('logged', '1');
            sessionStorage.setItem('phone', state.userInfo.mobile);
            sessionStorage.setItem('userId', data.data.id);
            $router.push('/success');
          }
        } else {
          switch (res.data.code) {
            case '1003':
              state.logInfo = "无效的手机号";
            case '1012':
              state.logInfo = "无效的验证码";
          }
        }
      }).catch(() => {
        alert('登陆失败，请重试或联系管理员');
      });
    },

    //将加密后密码保存至store
    saveTemp(state, temp) {
      state.regtemp = temp;
    },

    //获取用户基本信息
    getUserInfo(state, n) {
      axios({
        method: 'post',
        url: api.selectAuthenticationById,
        data: n
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          state.userInfo = data.data.wbUserDTO;
          if (state.userInfo.mobile) {
            state.userInfo.mobile = state.userInfo.mobile.slice(0, 3) + '****' + state.userInfo.mobile.slice(7, 11);
          }
        }
      });
    },

    //提交注册表单
    commitRegForm(state, n) {
      console.log(n);
      n.form.password = state.regtemp;
      n.form.confirm = state.regtemp;
      n.form.identification = 'reg';
      let router = n.router;
      axios({
        method: 'post',
        url: api.userRegister,
        data: n.form,
      }).then((res) => {
        if (res.data.code == 0) {
          router.push('/success');
          state.regtemp = '';
        } else {
          alert('注册失败，请重试');
        }
      }).catch((err) => {

      });
    },

    //提交重置密码表单
    commitResetPwd(state, n) {
      let m = {};
      m.password = state.regtemp;
      m.id = sessionStorage.getItem('userId');
      let router = n.router;
      axios({
        method: 'post',
        url: api.changeThePassword,
        data: m
      }).then((res) => {
        if (res.data.code == 6004) {
          router.push('/success');
          state.regtemp = '';
        } else {
        }
      })
    },

    //提交校验手机验证码
    commitCheckPhoneCode(state, n) {
      let m = n.form;
      let r = n.router;
      m.identification = 'resetpwd';
      axios({
        method: 'post',
        url: api.changeThePhoneNumberByMobile,
        data: m
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          sessionStorage.setItem('userId', res.data.data.id);
          state.userInfo.id = res.data.data.user_id;
          r.replace('/setpwd');
        } else {
          state.errMessage = res.data.msg;
        }
      })
    },

    //提交用户认证
    commitCertify(state, n) {
      axios({
        method: 'post',
        url: api.userBeReadyAuthentication,
        data: n.form
      }).then((res) => {
        if (res.data.code == 6004) {
          n.router.replace('/user');
        }
        console.log(res);
      })
    },

    //查询认证状态
    commitIsCertify(state, n) {
      axios({
        method: 'post',
        url: api.isAuthentication,
        data: n.form
      }).then((res) => {
        let data = res.data;
        console.log(data);
        if (data.code == 0) {
          n.next();
        }
      })
    },

    //提交简历填写
    commitResumeForm(state, n) {
      let form = n.form;
      console.log(3);
      let router = n.router;
      axios({
        method: 'post',
        url: api.addVitae,
        data: form
      }).then((res) => {
        state.fillResFlag = true;
        console.log(5);
        // router.go(-1);
      })
      console.log(4);
    },

    //提交发布职位
    commitPubPos(state, n) {
      n.form.id = state.userInfo.id;
      axios({
        method: 'post',
        url: api.addPosition,
        data: n.form
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          console.log(data);
          n.router.push('success');
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },

    //查看简历列表
    commitResumeList(state, n) {
      axios({
        method: 'post',
        url: api.selectMyVitae,
        data: n
      }).then((res) => {
        if (res.data.code == 0 || res.data.code == 1001) {
          if (res.data.data.ruv) {
            state.resume.resumeList = res.data.data.ruv;
          } else {
            state.resume.resumeList = [];
          }
        }
        // console.log(state.resume.resumeList);
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      })
    },

    //获取投递记录
    commitDeliverList(state, n) {
      axios({
        method: 'post',
        url: api.selectDeliveryRecord,
        data: n
      })
    },

    //查看简历预览
    commitPreviewResume(state, n) {
      axios({
        method: 'post',
        url: api.previewMyVitae,
        data: n
      }).then((res) => {
        if (res.data.code == 0) {
          state.resume.resumeContext = res.data.data;
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },

    //加载城市列表
    // commitLoadCity(state, n) {
    //   axios({
    //     method: 'post',
    //     url: api.selectByPid,
    //     data: n
    //   }).then((res) => {
    //     let data = res.data;
    //     let list = data.data.list;
    //     for (let i = 0; i < list.length; i++) {
    //       state.cityList.push({value: '', name: '', cities: []});
    //       state.cityList[i].value = list[i].id;
    //       state.cityList[i].label = list[i].name;
    //       state.cityIdList.push(list[i].id);
    //     }
    //   })
    // },

    //加载子城市列表
    // commitLoadChildrenCity(state, n) {
    //   axios({
    //     method: 'post',
    //     url: api.selectByPid,
    //     data: n
    //   }).then((res) => {
    //     let data = res.data;
    //     let list = data.data.list;
    //     let index = state.cityIdList.indexOf(n.pid);
    //     for (let i = 0; i < list.length; i++) {
    //       state.cityList[index].cities.push({value: '', label: ''});
    //       state.cityList[index].cities[i].value = list[i].name;
    //       state.cityList[index].cities[i].label = list[i].name;
    //     }
    //     console.log(state.cityList);
    //   })
    // },

    //加载修改简历数据
    commitLoadResume(state, n) {
      axios({
        method: 'post',
        url: api.selectVitae,
        data: n
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      })
    },

    changeModuleStatus(state, n) {
      console.log(state.moduleStatus[n].status);
      state.moduleStatus[n].status = !state.moduleStatus[n].status;
    },

    changeModulePosition(state, n) {
      let index = type2index(state.moduleStatus, n.type);
      // console.log(n.type);
      // console.log(index);
      arrUpDown(state.moduleStatus, index, n.dire);
    }
  },
  getters: {},
  actions: {

    //异步调用提交注册表单
    actionRegForm(context, n) {
      context.commit('commitRegForm', n);
    },

    //异步调用提交密码登陆表单
    actionLogForm(context, n) {
      context.commit('commitLogForm', n);
    },

    //异步调用提交发送手机验证码表单
    actionSendMessage(context, n) {
      context.commit('commitSendMessage', n);
    },

    //异步获取用户基本信息
    actionGetUserInfo(context, n) {
      context.commit('getUserInfo', n);
    },

    //异步调用提交手机验证码登陆表单
    actionPhoneLogForm(context, n) {
      context.commit('commitPhoneLogForm', n);
    },

    //异步调用提交重置密码表单
    actionResetPwd(context, n) {
      context.commit('commitResetPwd', n);
    },

    //异步调用提交校验手机验证码
    actionCheckPhoneCode(context, n) {
      context.commit('commitCheckPhoneCode', n);
    },

    //异步调用提交认证信息
    actionCertify(context, n) {
      context.commit('commitCertify', n);
    },

    //异步调用提交简历生成及修改
    actionResumeForm(context, n) {
      context.commit('commitResumeForm', n);
    },

    //异步调用上传证明文件
    actionUploadProveFile(context, n) {
      context.commit('commitUploadProveFile', n);
    },

    //异步调用发布职位
    actionPubPos(context, n) {
      context.commit('commitPubPos', n);
    },

    //异步获取简历列表
    actionResumeList(context, n) {
      context.commit('commitResumeList', n);
    },

    //异步获取投递记录
    actionDeliverList(context, n) {
      context.commit('commitDeliverList', n);
    },

    //异步提交查看简历详情
    actionPreviewResume(context, n) {
      context.commit('commitPreviewResume', n);
    },

    //异步加载城市列表
    // actionLoadCity(context, n) {
    //   context.commit('commitLoadCity', n);
    // },
    //加载子城市列表
    // actionLoadChildrenCity(context, n) {
    //   context.commit('commitLoadChildrenCity', n);
    // },

    //加载简历修改
    actionLoadResume(context, n) {
      context.commit('commitLoadResume', n);
    }
  }
})
