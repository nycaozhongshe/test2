<template>
  <div class="setpwd  father">
    <div class="content">
      <div class="setpwd-title">
        <h3>密码找回</h3>
        <div class="line"></div>
      </div>
      <div class="setpwd-box">
        <el-form ref="setpwdform" :rules="rules" :model="setpwdform" size="medium" style="font-size: 18px;">
          <el-tooltip
            class="item"
            effect="dark"
            content="密码长度6-20位"
            placement="right">
            <el-form-item prop="password">
              <el-input
                placeholder="输入新密码"
                v-model="setpwdform.password"
                type="password"
                @blur="savePassword">
                <icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
              </el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="请与第一次输入的密码一致" placement="right">
            <el-form-item prop="confirm">
              <el-input
                placeholder="再次输入密码"
                v-model="setpwdform.confirm"
                type="password">
                <icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
              </el-input>
            </el-form-item>
          </el-tooltip>
          <!--<el-form-item>-->
          <!--<el-input-->
          <!--placeholder="验证码"-->
          <!--v-model="setpwdform.code">-->
          <!--<icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>-->
          <!--</el-input>-->
          <!--<span class="code">验证码</span>-->
          <!--</el-form-item>-->
        </el-form>
        <el-button type="primary" class="fr" @click="submitResetPwd">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {validataPwd, validataConfirm} from '@/assets/datas/patterns'
  import md5 from 'js-md5'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        setpwdform: {
          password: '',
          confirm: '',
          code: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入密码'},
            {validator: validataPwd, trigger: 'blur'}
          ],
          confirm: [
            {required: true, message: '请再次输入密码'},
            {validator: validataConfirm, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'actionResetPwd'
      ]),
      savePassword() {
        let enc_pwd = md5(this.setpwdform.password);
        this.$store.commit('saveTemp', enc_pwd);
      },
      submitResetPwd() {
        this.$refs.setpwdform.validate((valid) => {
          let router = this.$router;
          let form = this.setpwdform;
          if (valid) {
            this.actionResetPwd({form, router});
          }
        })
      }
    }
  }
</script>

<style lang="scss" src="../assets/scss/setpwd.scss"></style>

<style lang="scss">
  .setpwd {
    .el-input__inner {
      height: 60px !important;
    }
    .el-form-item__label {
      line-height: 60px !important;
      font-size: 19px !important;
    }
    .el-form-item__label {
      padding-right: 20px !important;
    }
    .el-input--medium {
      font-size: 18px;
      > input {
        padding-left: 40px !important;
      }
    }
  }
</style>
