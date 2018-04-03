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
              <router-link to="/certify">认证/更改</router-link>
            </td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>
              {{email || '未认证邮箱'}}
            </td>
            <td class="user-operation">
              <!--<router-link to="/certify">认证邮箱</router-link>-->
              <div style="color: #C20C0C;cursor: pointer;" @click="emailDialog = true"
                   v-if="!$store.state.userInfo.userEmail">领取礼包</div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!--认证邮箱弹出层-->
    <el-dialog title="认证邮箱" :visible.sync="emailDialog">
      <el-form>
        <el-form-item label="邮箱地址" label-width="120px">
          <el-input v-model="writeEmail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="tip" style="padding-left: 120px;color: #C20C0C;">
        {{tips}}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emailDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendEmail">确 定</el-button>
      </div>
    </el-dialog>
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
        emailDialog: false,
        uploadHeadPath: api.uploadAHeadImage,
        url: api.url,
        headPath: '',
        imageUrl: '',
        userType: '',
        email: '',
        writeEmail: '',
        tips: ''
      }
    },
    created() {
      this.getUserInfo();
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
      getUserInfo() {
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
            this.email = this.$store.state.userInfo.userEmail;
          }
        });
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
      sendEmail() {
        if (!this.isEmail(this.writeEmail)) {
          this.tips = '请输入正确的邮箱地址';
          return
        }
        this.$store.dispatch('sendEmail', {
          userEmail: this.writeEmail
        }).then(res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            this.email = data;
            this.getUserInfo();
            this.tips = '';
            this.emailDialog = false;
          } else {
            this.$message.error('服务器出错，请稍后再试');
          }
        });
      },
      isEmail(str) {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(str);
      }
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
