<template>
  <div class="user father">
    <div class="content">
      <aside class="aside">
        <div class="avatar">
          <div class="avatar-pic">
            <img :src="imageUrl" alt="">
            <div class="upload-avatar avatar-pic-mask">
              <el-upload
                class="avatar-uploader"
                :action=uploadHeadPath
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                  :headers="headerObj">
                <span>更换</span>
              </el-upload>
              更换
            </div>
          </div>
          <div class="avatar-name">
            {{this.$store.state.userInfo.realName || '请认证'}}
          </div>
        </div>
        <ul class="user-list">
          <router-link to="/user">
            <li class="user-item user-item-active">
              个人信息
            </li>
          </router-link>
          <router-link to="/resume">
            <li class="user-item">
              我的简历
            </li>
          </router-link>
          <router-link to="/myposition">
            <li class="user-item">
              我的职位
            </li>
          </router-link>
        </ul>
      </aside>
      <div class="user-info">
        <table>
          <tr>
            <td>密码</td>
            <td>*******</td>
            <td class="user-operation">
              <router-link to="resetpwd">修改密码</router-link>
            </td>
          </tr>
          <tr>
            <td>安全手机</td>
            <td>{{this.$store.state.userInfo.mobile}}</td>
            <td class="user-operation">
              <!--<router-link to="/certify">更改</router-link>-->
            </td>
          </tr>
          <tr>
            <td>认证信息</td>
            <td>
              {{userType}}
            </td>
            <td class="user-operation">
              <router-link to="/certify">认证</router-link>
              /
              <router-link to="/certify">更改</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--<form enctype="multipart/form-data"></form>-->
  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  import axios from 'axios'
  import api from '../assets/datas/api'

  export default {
    data() {
      return {
        uploadHeadPath: api.uploadAHeadImage,
        url: api.url,
        headPath:'',
        imageUrl: '',
        userType: ''
      }
    },
    created: function () {
      axios({
        method: 'post',
        url: api.selectAuthenticationById,
        data: {}
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.writeUserInfo(data.data.wbUserDTO);
          if (this.$store.state.userInfo.headImage) {
            this.headPath = this.$store.state.userInfo.headImage;
            this.imageUrl = api.url + this.headPath
          } else {
            this.imageUrl = '';
          }
          switch (this.$store.state.userInfo.authStatus) {
            case 2:
              switch (this.$store.state.userInfo.userType) {
                case 2:
                  this.userType = "在职";
                  break;
                case 1:
                  this.userType = "实习生";
                  break;
              }
              break;
            case 1:
              this.userType = "未认证";
              break;
            case 0:
              this.userType = "待审核";
              break;
            case 3:
              this.userType = "认证失败";
              break;
          }
        }
      });
    },
    methods: {
      ...mapActions([
        'actionGetUserInfo'
      ]),
      ...mapMutations([
        'writeUserInfo'
      ]),
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          alert('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M && isJPG;
      },
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
      uploadAdress: function () {
        return api.uploadVitaeAddress
      },
      // headPath: {
      //   get: function () {
      //     if (this.$store.state.userInfo.headImage) {
      //       return this.$store.state.userInfo.headImage;
      //     } else {
      //       return '';
      //     }
      //   },
      //   set: function (val) {
      //     this.$store.state.userInfo.headImage = val;
      //   }
      // }
    }
  }
</script>

<style lang="scss" src="../assets/scss/user.scss">

</style>
