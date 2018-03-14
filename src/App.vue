<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo fl">
          <h1><a href="/" class="logo-title">万邦教育</a></h1>
        </div>
        <ul class="fl">
          <li class="fl">
            <router-link class="nav" active-class="router-active" to="/index">首页</router-link>
          </li>
          <li class="fl">
            <router-link class="nav" active-class="router-active" to="/job">求职信息</router-link>
          </li>
          <li class="fl">
            <router-link class="nav" active-class="router-active" to="/resumeEntry">简历中心</router-link>
          </li>
        </ul>
        <div class="fr search-header">
          <!--<div class="search">-->
          <!--<form>-->
          <!--<input type="text" placeholder="Search" class="fl">-->
          <!--<button><i class="el-icon-search"></i></button>-->
          <!--</form>-->
          <!--</div>-->
          <span class="reglog" v-if="this.$store.state.showLR">
            <span v-if='!this.$store.state.isLR' style="vertical-align: top;">
              <router-link to="/register">注册</router-link>
                /
              <router-link to="/login">登陆</router-link>
            </span>
            <span v-if='this.$store.state.isLR'>
              <span style="vertical-align: top;">
                <el-dropdown>
                  <router-link to="/user" style="text-decoration: #C20C0C"><icon name="user-circle"></icon>&nbsp;个人中心&nbsp;&nbsp;</router-link>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <router-link to="/user" style="color: #666666;">个人信息</router-link></el-dropdown-item>
                    <el-dropdown-item> <router-link to="/resume" style="color: #666666;">我的简历</router-link></el-dropdown-item>
                    <el-dropdown-item> <router-link to="/myposition" style="color: #666666;">我的职位</router-link></el-dropdown-item>
                    <el-dropdown-item> <router-link to="/myposition" style="color: #666666;" @click="logout">退出登录</router-link></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </span>
          </span>
          <router-link to="/pubposition">
            <button class="publish">我要发布</button>
          </router-link>
        </div>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="content">
        <div class="footer-info">
          <table>
            <tr>
              <th>使用说明</th>
              <th>网站信息</th>
              <th>关于我们</th>
            </tr>
            <tr>
              <td>常见问题</td>
              <td style="font-size: 14px;">Copyright©2018 WBedu</td>
              <td>
                <router-link to="/aboutWBEDU" style="color: #ffffff;"
                             target="_blank">
                  万邦教育
                </router-link>
              </td>
            </tr>
            <tr>
              <td><a href="../static/legal.html" style="color: #ffffff;" target="_blank">法律声明</a></td>
              <td>All right reserved</td>
              <td>
                <a href="../static/校企画册.compressed.pdf" style="color: #ffffff;" target="_blank">
                  金融小伙伴
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="../static/privacy.html" style="color: #ffffff;" target="_blank">
                  隐私政策
                </a>
              </td>
              <td>备案信息：津ICP备15002434号-1</td>
              <td style="cursor: pointer;" @click="callUsDialogVisible = true">联系我们</td>
            </tr>
          </table>
        </div>
        <div class="line">
          <p class="fr" style="font-size: 12px;color:rgba(255,255,255,.5)">深圳万邦教育咨询有限公司</p>
        </div>
      </div>
    </footer>
    <el-dialog
      title="联系我们"
      :visible.sync="callUsDialogVisible"
      width="30%">

      <h3 style="font-size: 24px;">任何问题请联系：</h3>
      <div>
        <img src="./assets/imgs/logo/jrxhb.jpg"
             style="width: 150px;height: 150px;float: left; margin-right: 20px;margin-top: -25px;">
        <div style="margin-top: 50px;">
          <div style="margin-top: 15px;font-size: 16px; line-height: 20px;"
               class="our-wechat">微信联系：XJW-PM或扫码添加</div>
          <div style="margin-top: 15px;font-size: 16px; line-height: 20px;"
               class="our-email">邮箱联系：chensl@xiaojnwo.com</div>
          <div style="margin-top: 15px;font-size: 16px; line-height: 20px;"
               class="our-platform">微信公众平台：jrxhb2014</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="callUsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import axios from 'axios'
  import {mapMutations} from 'vuex'
  import api from '../src/assets/datas/api'

  // document.oncontextmenu = new Function("event.returnValue=false");
  // document.onselectstart = new Function("event.returnValue=false");

  export default {
    name: 'app',
    data() {
      return {
        callUsDialogVisible: false,
        phone: '',
        logged: false,
        safephone: '',
      }
    },
    methods: {
      ...mapMutations([
        'isLog',
        'writeUserInfo'
      ]),

      logout() {
        this.$store.commit('falseLR');
        this.logged = false;
        sessionStorage.clear('token');
        sessionStorage.clear('logged');
        sessionStorage.clear('userId');
        sessionStorage.clear('phone');
        this.$router.push('/index');
        location.reload();
      }
    },
    computed: {
      //监控手机号码
      // safephone: function () {
      //   let phone = sessionStorage.getItem('phone');
      //   if (phone) {
      //     return phone.slice(0, 3) + '****' + phone.slice(7, 11);
      //   }
      //   return '';
      // },
      //监控登陆注册按钮显示状态
      // isLR: {
      //   get: function () {
      //     return this.$store.state.isLR;
      //   },
      //   set: function (newVal) {
      //     this.$store.state.isLR = newVal;
      //   }
      // },
      //监控登陆状态
      isLogged: {
        get: function () {
          return (JSON.parse(sessionStorage.getItem('logged')) && this.logged);
        },
        set: function (newVal) {
          sessionStorage.setItem("logged", newVal);
        }
      }
    },
    created: function () {
      this.isLog();
      if (sessionStorage.getItem('logged')) {
        axios({
          method: 'post',
          url: api.selectAuthenticationById,
          data: {}
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.writeUserInfo(data.data.wbUserDTO);
            this.safephone = this.$store.state.userInfo.mobile;
          }
        });
      }
      // let ua = window.navigator.userAgent;
      // alert(ua);
      // let isAndroid = /android/ig.test(ua);
      // let isIos = /iphone|ipod|ipad/ig.test(ua);
      // let isMicroMessenger = /MicroMessenger/ig.test(ua);
      // if (isAndroid) {
      //   alert('android');
      //   document.write('<meta name="viewport" content="width=(device-width)/2,initial-scale=1">')
      // } else if (isIos) {
      //   alert('ios');
      //   document.write('<meta name="viewport" content="width=device-width,initial-scale=0.5">')
      // } else {
      //   alert('pc');
      // }
      var phoneWidth = parseInt(window.screen.width),
        phoneScale = phoneWidth/640,
        ua = navigator.userAgent;

      if(ua.match(/(iPhone|iPod|Android|ios)/i)){
        alert('为了获得更好的用户体验，建议于PC端打开本网站');
      }
      if (/Android (\d+\.\d+)/.test(ua)){

        var version = parseFloat(RegExp.$1);
        if(version > 2.3){
          document.write('<meta name="viewport" content="width=device-width, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
        }else{
          document.write('<meta name="viewport" content="width=device-width, target-densitydpi=device-dpi">');
        }
      } else {
        document.write('<meta name="viewport" content="width=device-width, user-scalable=no, target-densitydpi=device-dpi">');
      }
    },
    beforeUpdate: function () {
      this.safephone = this.$store.state.userInfo.mobile;
    }
  }
</script>

<style lang="scss" src="./assets/scss/index.scss"></style>
