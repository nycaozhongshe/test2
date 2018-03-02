<template>
  <div class="binding father" ref="binding">
    <div class="content">
      <div class="binding-form">
        <el-form ref="bindingForm" :model="bindingForm" status-icon :rules="rules" label-width="120px" size="medium"
                 style="font-size: 20px;">
          <!--<el-form-item label="用户名" prop="name">-->
          <!--<el-input v-model="bindingForm.name">-->
          <!--<icon name="user" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>-->
          <!--</el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="设置密码" prop="password">
            <el-input v-model="bindingForm.password" type="password">
              <icon name="key" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="bindingForm.confirm" type="password">
              <icon name="key" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>
            </el-input>
          </el-form-item>
          <router-link to="/">
            <el-button type="primary fr" @click="bindingSuccess">绑定</el-button>
          </router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {validataPwd, validataPhone, validataConfirm} from '@/assets/datas/patterns'

  export default {
    data() {
      let validataPwd = (rule, value, callback) => {
        let pwdPattern = /(?=^.{6,20}$)(?=(?:.*?\d))(?=.*[a-z])(?=(?:.*?[A-Z]))(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!pwdPattern.test(value)) {
          callback(new Error('密码长度6-20位，至少一个大写字母、数字以及特殊符号'));
        } else {
          if (this.bindingForm.confirm !== '') {
            this.$refs.bindingForm.validateField('confirm');
          }
          callback();
        }
      }
      let validataConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.bindingForm.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }
      return {
        bindingForm: {
          // name: '',
          password: '',
          confirm: '',
          phone: '',
          message: '',
        },
        rules: {
          // name: [
          //   {required: true, message: '请输入用户名', trigger: 'blur'},
          //   {validator: validataName, trigger: 'blur'}
          // ],
          password: [
            {required: true, validator: validataPwd, trigger: 'blur'},
          ],
          confirm: [
            {required: true, validator: validataConfirm, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      btnChange: function () {
        this.isdisable = !this.isdisable;
        var timer = setInterval(() => {
          this.tim = this.tim - 1;
          this.btnMessage = this.tim + 's后重新发送';
          if (this.tim == 0) {
            this.tim = 60;
            clearInterval(timer);
            this.isdisable = !this.isdisable;
            this.btnMessage = '发送验证码';
          }
        }, 1000);
      },
      bindingSuccess: function () {
        alert('绑定成功');
      }
    }
  }
</script>

<style lang="scss" src="../assets/scss/binding.scss"></style>

<style lang="scss">
  .binding {
    label.el-form-item__label {
      height: 100%;
    }

    .el-form-item__label {
      line-height: 60px !important;
      font-size: 19px !important;
    }

    .el-form-item__label {
      padding-right: 20px !important;
    }

    .el-input--medium {
      font-size: 20px;
      > input {
        padding-left: 40px !important;
      }
    }
  }
</style>
