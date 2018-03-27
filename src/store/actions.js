import resumeActions from "./resume/actions";
import request from '../utils/request'
import api from '../assets/datas/api'

let actions = {

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

  getUserInfo(context, n) {
    return request.post(api.selectAuthenticationById, n)
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
  },

  //根据职位id搜索
  searchByPosition({}, n) {
    return request.post(api.selectePositionByIndex, n)
  },

  //根据关键词搜索
  searchByKeyWord({}, n) {
    return request.post(api.selectePositionByKeyword, n)
  },

  //
}
// Object.assign(actions, resumeActions)

export default actions
