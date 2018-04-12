<template>
  <div class="resume father">
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
            <li class="user-item ">
              个人信息
            </li>
          </router-link>
          <router-link to="/resume">
            <li class="user-item user-item-active">
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
      <div class="resume-content"
           v-loading="loading"
           element-loading-text="正在加载，请稍后..."
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.6)">
        <div class="my-resume">
          <div class="my-resume-box">
            <div class="my-resume-title">
              我的简历
            </div>
            <div class="my-resume-list clearfix">
              <div class="my-resume-item"
                   v-for="(item,index) in resumeList">
                <img :src="item.vitaeType == '0'? '../../static/pdf.jpg':'../../static/resume.png'" alt=""
                     @click='previewResume(index)'>
                <div class="my-resume-item-mask">
                  <i class="el-icon-delete el-icon"
                     style="float: right;" @click="dialogVisible = true;delId = index"></i>
                  <i class="el-icon-edit el-icon"
                     style="float: left;" @click="changeResume(index)"
                     v-if="item.vitaeType == '0'"></i>
                </div>
                <div class="vitae-name">{{item.vitaeName}} <br>
                  {{getTime(item.create_time).fd}}-{{getTime(item.create_time).ft}}
                </div>
              </div>
              <div class="my-resume-item my-resume-new" @click="dialogVisible2 = true">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="my-deliver">
          <div class="my-deliver-box">
            <div class="my-deliver-title">
              投递记录
            </div>
            <div class="my-deliver-content">
              <table>
                <tr>
                  <th>公司名称</th>
                  <th>时间</th>
                </tr>
                <tr v-for="(item,index) in deliverList">
                  <td>{{item.position_name}}</td>
                  <td>{{getDate(item.create_time)}}</td>
                </tr>
              </table>
            </div>
            <div class="my-deliver-page">
              <span>
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="numPerPage"
                :total="count"
                @current-change="pageChange">
              </el-pagination>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="确认删除"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您正在删除简历，请确认</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;delResume()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="请选择"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <div class="btnbox">
        <button id="filbtn" @click="$router.push('/fillResume');">在线填写</button>
        <div id="upbtn">
          <el-upload
            class="upload-demo"
            ref="resUpload"
            :action="uploadAdress"
            :show-file-list="false"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :headers="headerObj"
            :on-success="resumeUpload"
            :data="uploadData"
            accept=".pdf"
            :before-upload="beforePdfUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
          </el-upload>
        </div>
      </div>
      <div
        style="color: #C20C0C;font-size: 0.875rem;margin-left: 30px;margin-top: 10px;padding-right: 50px;">注意：系统最多同时保存三份上传的简历附件，超过此数量后，系统将会自动覆盖最早上传的简历附件</div>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import api from '../assets/datas/api'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        delId: '',    //删除简历id
        deliverList: [],    //投递记录列表
        dialogVisible: false,   //删除简历对话框开关
        dialogVisible2: false,    //新增简历对话框开关
        fileList: [],   //上传附件文件列表
        uploadHeadPath: api.uploadAHeadImage,   //上传头像api
        url: api.url,
        headPath: '',
        imageUrl: '',
        uploadData: {},
        loading: true,
        api,
        resumeList: [],
        numPerPage: 5,  //每页数量
        count: 0,   //总页数
      }
    },
    methods: {
      ...mapActions([
        'actionResumeList',
        'actionDeliverList',
        'actionPreviewResume',
      ]),
      ...mapMutations([
        'getUserInfo',
        'writeUserInfo'
      ]),
      getDate(num) {
        let date = new Date(num);
        let formatDate = date.getFullYear() + "/" + (date.getMonth() - 0 + 1) + "/" + date.getDate();
        return formatDate;
      },
      getTime(num) {
        let d = new Date(num);
        let fd = d.getFullYear() + '/' + (+d.getMonth() + 1) + '/' + d.getDate();
        let ft = d.getHours() + ':' + d.getMinutes();
        return {fd, ft}
      },
      resumeUpload(res) {
        this.$refs.resUpload.clearFiles;
        if (res.code === '0') {
          this.dialogVisible2 = false;
          let id = this.$store.state.userInfo.id;
          this.actionResumeList({"id": id}).then(res => {
            if (+res.data.code === 0 || +res.data.code === 1001) {
              let data = res.data.data;
              if (data.ruv) {
                this.resumeList = data.ruv;
              } else {
                this.resumeList = [];
              }
              this.$store.commit('commitResumeList', this.resumeList);
            }
          });
        } else {
          this.$message.error('上传失败，请重试或联系管理员');
        }
        this.loading = false;
      },
      beforePdfUpload(file) {
        this.loading = true;
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          this.$message.error('只能上传pdf');
        }
        return isPDF;
      },
      delResume() {
        let delIndex = this.delId;
        let id = this.resumeList[delIndex].vitae_id;
        this.loading = true;
        this.$store.dispatch('delResume', {id: id}).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            axios({
              method: 'post',
              url: api.selectAuthenticationById,
              data: {}
            }).then((res2) => {
              let data = res2.data;
              if (data.code == 0) {
                let id2 = this.$store.state.userInfo.id;
                this.writeUserInfo(data.data.wbUserDTO);
                this.$store.dispatch('getResumeList', {id: id2}).then(res => {
                  if (res.data.code == 0 || res.data.code == 1001) {
                    if (res.data.data.ruv) {
                      // state.resume.resumeList = res.data.data.ruv;
                      this.resumeList = res.data.data.ruv;
                    } else {
                      // state.resume.resumeList = [];
                      this.resumeList = [];
                    }
                  }
                })
                this.loading = false;
                // this.actionDeliverList({"id": id});
              }
            });
          }
        })
      },
      previewResume(index) {
        let id = this.resumeList[index].vitae_id;
        let newWin = window.open(window.location.origin + '/#/loadingPage/');

        let pdfURL = '';
        axios({
          method: 'post',
          url: api.previewMyVitae,
          data: {"id": id}
        }).then((res) => {
          if (res.data.code == 0) {
            pdfURL = res.data.data;
            /**
             * 本地调试用拼接
             */

            // if (api.previewMyVitae.includes('39')) {
            pdfURL = pdfURL.split('webapps')[1];
            pdfURL = pdfURL.split('pdf')[0].split('\.')[0] + '.pdf';
            // }

            newWin.location.href = api.url + pdfURL;
            // window.open(api.url + pdfURL);
          }
        }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
        // window.open('/#/previewResume/' + id);
      },
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleExceed(files, fileList) {
        fileList = [];
        this.$message.warning('请刷新后再次上传');
      },
      changeResume(index) {
        let id = this.resumeList[index].vitae_id;
        this.$router.push('/changeResume/' + id);
      },
      pageChange(currentPage) {
        this.loading = true;
        this.pageConfig.first_page = (currentPage - 1) * this.numPerPage;
        let id = this.$store.state.userInfo.id;
        this.$store.dispatch('getDeliveryRecord', {id: id, ...this.pageConfig}).then(res => {
          if (res.data.code === '0') {
            this.deliverList = res.data.data.rp;
          } else {
            this.$message.error('服务器出错，请稍后再试或联系管理员');
          }
          this.loading = false;
        })
      },
    },
    computed: {
      uploadAdress: function () {
        return api.uploadVitaeAddress
      },
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
      pageConfig() {
        return {"first_page": 0, "page_size": this.numPerPage};
      },
    },
    beforeCreate: function () {
    },
    created: function () {
      this.$store.dispatch('getUserInfo', {}).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.writeUserInfo(data.data.wbUserDTO);
          if (this.$store.state.userInfo.headImage) {
            this.headPath = this.$store.state.userInfo.headImage;
            this.imageUrl = api.url + this.headPath
          } else {
            this.imageUrl = '';
          }
          let id = this.$store.state.userInfo.id;
          // this.actionResumeList({"id": id});
          this.$store.dispatch('getResumeList', {id: id}).then(res => {
            if (res.data.code == 0 || res.data.code == 1001) {
              if (res.data.data.ruv) {
                // state.resume.resumeList = res.data.data.ruv;
                this.resumeList = res.data.data.ruv;
              } else {
                // state.resume.resumeList = [];
                this.resumeList = [];
              }
            }
          })
          axios({
            method: 'post',
            url: api.selectDeliveryRecord,
            data: {"id": id, ...this.pageConfig}
          }).then((res) => {
            this.count = res.data.data.num;
            this.uploadData = {"id": this.$store.state.userInfo.id};
            this.deliverList = res.data.data.rp;
            this.loading = false;
          })
        }
      });

    }
  }
</script>

<style lang="scss" src="../assets/scss/resume.scss">

</style>

<style lang="scss">

</style>
