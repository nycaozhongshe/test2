<template>
  <div class="certify  father">
    <el-dialog
      title="没有证明文件？"
      :visible.sync="dialogVisible"
      width="30%">
      <el-button type="primary">验证企业邮箱/学校邮箱</el-button>
      <span style="color: #C20C0C;cursor: pointer;">联系客服</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <div class="content">
      <div class="certify-box">
        <div class="certify-title">
          <h3>
            请填写个人信息
          </h3>
        </div>
        <div class="certify-form">
          <el-form :model="certifyForm" :rules="rules" ref="certifyForm" class="certify-form" size="small">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="certifyForm.realName" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="certifyForm.gender" :disabled="disabled">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="authStatus" label="身份认证">
              <el-radio-group v-model="certifyForm.userType" @change="changeStatus">
                <el-radio label="2">在职认证</el-radio>
                <el-radio label="1">实习认证</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证明文件" prop="userProveUrl">
              <el-upload
                class="pic-upload"
                :action='api.uploadingProofFile'
                accept="image/*"
                v-model="certifyForm.userProveUrl"
                :data="{'phone':phone}"
                :headers="headerObj"
                :before-upload="beforeProofUpload"
                :on-success="proofUpload"
              >
                <el-button size="small">上传照片</el-button>
              </el-upload>
              <span class="comments">
                注：{{statusTip}}
              </span>
              <span style="color: #C20C0C;cursor: pointer;margin-left: 10px;"
                    @click="callUsDialogVisible = true">需要帮助?</span>
            </el-form-item>
            <!--<el-form-item label="实习或入职公司" v-if="certifyForm.userType === '1'">-->
            <!--<el-input v-model="certifyForm.userCompany"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('certifyForm')">立即认证</el-button>
              <!--<el-button @click="resetForm('certifyForm')">重置</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      title="联系我们"
      :visible.sync="callUsDialogVisible"
      width="30%">

      <h3 style="font-size: 1.5rem;">任何问题请联系：</h3>
      <div>
        <img src="../assets/imgs/logo/jrxhb.png"
             style="width: 150px;height: 150px;float: left; margin-right: 20px;margin-top: -25px;">
        <div style="margin-top: 50px;">
          <div style="margin-top: 15px;font-size: 1rem; line-height: 1.25rem;"
               class="our-wechat">微信联系：happyjgj或扫码添加</div>
          <div style="margin-top: 15px;font-size: 1rem; line-height: 1.25rem;"
               class="our-email">邮箱联系：chensl@xiaojnwo.com</div>
          <div style="margin-top: 15px;font-size: 1rem; line-height: 1.25rem;"
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
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  import api from '../assets/datas/api'

  export default {
    data() {
      return {
        api: api,
        phone: '',
        statusChange: true,
        certifyForm: {
          realName: '',
          gender: '',
          authStatus: '1',
          userType: '2',
          userProveUrl: '',
          userCompany: ''
        },
        statusTip: '在职证明/企业名片',
        rules: {
          realName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          authStatus: [
            {required: true, message: '请选择认证方式', trigger: 'blur'}
          ],
          userProveUrl: [
            {required: true, message: '请上传证明文件', trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        disabled: false,
        callUsDialogVisible: false,
      }
    },
    methods: {
      ...mapActions([
        'actionCertify'
      ]),
      ...mapMutations([
        'commitIsCertify'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let router = this.$router;
            let form = this.certifyForm;
            this.actionCertify({form, router});
            this.$message({
              message: '提交成功，请等待审核',
              duration: 10000,
              showClose: true
            });
          } else {
            this.$message({
              type: "error",
              message: '请检查是否填写完整',
              duration: 10000,
              showClose: true
            });
            return false
          }
        })
      },
      changeStatus() {
        if (this.certifyForm.userType === '2') {
          this.statusTip = '在职证明/企业名片';
          this.statusChange = true;
        } else {
          this.statusTip = '学生证/实习证明';
          this.statusChange = false;
        }
      },
      proofUpload(res) {
        this.certifyForm.userProveUrl = res.data;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      beforeProofUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        return isJPG;
      },
    },
    created: function () {
      this.phone = sessionStorage.getItem('phone');
      this.axios({
        method: 'post',
        url: api.selectAuthenticationById,
        data: {}
      }).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          if (this.$store.state.userInfo.authStatus === 2 || this.$store.state.userInfo.authStatus === 0) {
            this.certifyForm.realName = this.$store.state.userInfo.realName;
            this.certifyForm.gender = JSON.stringify(this.$store.state.userInfo.gender);
            this.disabled = true;
          }
        }
      });
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      }
    },
  }
</script>

<style lang="scss" scoped src="../assets/scss/certify.scss">

</style>
<style lang="scss">
  .el-message {
    top: 100px !important;
  }
</style>
