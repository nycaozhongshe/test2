<template>
  <div class="myposition father">
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
            <li class="user-item">
              个人信息
            </li>
          </router-link>
          <router-link to="/resume">
            <li class="user-item">
              我的简历
            </li>
          </router-link>
          <router-link to="/myposition">
            <li class="user-item user-item-active">
              我的职位
            </li>
          </router-link>
        </ul>
      </aside>
      <div class="context"
           v-loading="loading"
           element-loading-text="正在加载，请稍后..."
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.6)">
        <div class="published-container">
          <div class="published-title">我的发布</div>
          <nav class="published-nav">
            <ul class="published-nav-list">
              <!--<li class="published-nav-item published-nav-item-active">发布中</li>-->
              <!--<li class="published-nav-item">已删除</li>-->
              <!--<li class="published-nav-item">待审核</li>-->
              <!--<li class="published-nav-item">草稿箱</li>-->
            </ul>
          </nav>
          <table class="published-context">
            <tr class="th">
              <th>公司名称</th>
              <th>时间</th>
            </tr>
            <tr class="td" v-for="(item,index) in myPositionList" :key="index">
              <router-link :to="'/changePosition/' + item.id" style="color: #C20C0C;">
                <td>{{item.position_company}}</td>
              </router-link>
              <td>{{getDate(item.create_time)}}</td>
              <td><i class="el-icon-delete" @click="delPostion(item.id)" style="cursor: pointer;"></i></td>
            </tr>
          </table>
        </div>
        <!--<div class="collected-container">-->
        <!--<div class="collected-title">我的收藏</div>-->
        <!--<table class="collected-context">-->
        <!--<tr class="th">-->
        <!--<th>公司名称</th>-->
        <!--<th>时间</th>-->
        <!--</tr>-->
        <!--<tr class="td" v-for="(item,index) in 4" :key="index">-->
        <!--<td>某券商投行部{{index+1}}</td>-->
        <!--<td>{{new Date().getFullYear()}}-{{new Date().getMonth()}}-{{new Date().getDate()}}</td>-->
        <!--</tr>-->
        <!--</table>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  import api from '../assets/datas/api'

  export default {
    data() {
      return {
        uploadHeadPath: api.uploadAHeadImage,
        url: api.url,
        headPath: '',
        imageUrl: '',
        myPositionList: [],
        loading: true
      }
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
      getDate(num) {
        let date = new Date(num);
        let formatDate = date.getFullYear() + "/" + (date.getMonth() - 0 + 1) + "/" + date.getDate();
        return formatDate;
      },

      //删除职位
      delPostion(id) {
        //确认是否删除
        this.$confirm('此操作将删除该职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          //调用删除简历
          this.axios({
            method: 'post',
            url: api.updatePositionDeleted,
            data: {"id": id}
          }).then((res) => {
            let userId = this.$store.state.userInfo.id;
            //删除成功，刷新我的职位列表
            if (res.data.code == 0) {
              this.axios({
                method: 'post',
                url: api.selectMyPosition,
                data: {"id": userId}
              }).then((res) => {
                this.myPositionList = res.data.data.rpDTO;
                this.loading = false;
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }
    },
    computed: {
      uploadAdress: function () {
        return api.uploadVitaeAddress
      },
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      }
    },
    created: function () {
      let id = '';
      this.axios({
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
            this.$message.error('服务器出错')
            this.imageUrl = '';
          }
          id = this.$store.state.userInfo.id;
          this.axios({
            method: 'post',
            url: api.selectMyPosition,
            data: {"id": id}
          }).then((res) => {
             this.myPositionList = res.data.data.rpDTO;
             this.loading = false;
          })
        }
      });
    },
    headerObj: function () {
      return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
    }
  }
</script>

<style lang="scss" src="../assets/scss/myposition.scss"></style>
