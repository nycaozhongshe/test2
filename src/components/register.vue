<template>
  <div class="register father" ref="reg">
    <div class="content">
      <div class="register-form">
        <el-form ref="regForm" :model="regForm" status-icon :rules="rules" label-width="120px" size="medium"
                 style="font-size: 20px;">
          <el-form-item label="手机验证" prop="phone" id="phone">
            <el-input v-model.number="regForm.phone">
              <icon name="phone" slot="prefix" scale="1.5" style="margin-top: 14px; margin-left: 10px;"></icon>
              <!--<select name="phone-pre" id="phone-pre" slot="prefix">-->
              <!--<option value="86" selected>+86</option>-->
              <!--<option value="852">+852</option>-->
              <!--<option value="853">+853</option>-->
              <!--<option value="886">+886</option>-->
              <!--<option value="81">+81</option>-->
              <!--<option value="65">+65</option>-->
              <!--<option value="82">+82</option>-->
              <!--<option value="33">+33</option>-->
              <!--<option value="49">+49</option>-->
              <!--<option value="39">+39</option>-->
              <!--<option value="44	">+44</option>-->
              <!--<option value="1">+1</option>-->
              <!--<option value="61	">+61</option>-->
              <!--<option value="64">+64</option>-->
              <!--</select>-->
              <el-button type="primary" slot="suffix" style="margin-top: 12px;" :disabled=isdisable
                         @click="btnChange">{{btnMessage}}
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="短信验证码" prop="message">
            <el-input v-model="regForm.message">
              <icon name="mail-reply" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>
            </el-input>
          </el-form-item>
          <el-tooltip class="item" effect="dark" content="密码长度6-20位" placement="right">
            <el-form-item label="设置密码" prop="password">
              <el-input v-model="regForm.password" :type="inputType" @blur="savePassword">
                <icon name="key" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>
                <i class="el-icon-view" slot="suffix" @click="changeInputType"
                   style="margin-top: 18px; margin-right: 10px;"></i>
              </el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="请与第一次输入的密码一致" placement="right">
            <el-form-item label="确认密码" prop="confirm">
              <el-input v-model="regForm.confirm" :type="inputType2">
                <icon name="key" slot="prefix" scale="1.5" style="margin-top: 16px; margin-left: 10px;"></icon>
                <i class="el-icon-view" slot="suffix" @click="changeInputType2"
                   style="margin-top: 18px; margin-right: 10px;"></i>
              </el-input>
            </el-form-item>
          </el-tooltip>
          <el-form-item>
            <router-link to="login">
              已有账号，直接登陆
            </router-link>
            <el-button type="primary" style="float: right; width: 205px;" @click="submitForm('regForm')"
                       :disabled=!regForm.isAgree>注册
            </el-button>
          </el-form-item>
          <el-form-item class="agreement fr">
            <el-checkbox-group v-model="regForm.isAgree">
              <el-checkbox name="agree" style="cursor: default;">
                注册即代表你已同意<a href="../static/agreement.html" target="_blank">「万邦用户协议」</a>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {validataPhone, validataConfirm, validataPwd, validataPhoneExsited} from '@/assets/datas/patterns'
  import md5 from 'js-md5'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        inputType: 'password',
        inputType2: 'password',
        that: '',
        tim: 60,
        btnMessage: '发送验证码',
        isdisable: false,
        regForm: {
          password: '',
          confirm: '',
          phone: '',
          message: '',
          isAgree: true
        },
        rules: {
          password: [
            {required: true, validator: validataPwd, trigger: 'blur'},
          ],
          confirm: [
            {required: true, validator: validataConfirm, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号不能为空'},
            {type: 'number', message: '请输入手机号'},
            {validator: validataPhone},
            {validator: validataPhoneExsited, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'actionRegForm',
        'actionSendMessage'
      ]),
      changeInputType() {
        if (this.inputType === 'password') {
          this.inputType = 'text';
        } else if (this.inputType === 'text') {
          this.inputType = 'password';
        }
      },
      changeInputType2() {
        if (this.inputType2 === 'password') {
          this.inputType2 = 'text';
        } else if (this.inputType2 === 'text') {
          this.inputType2 = 'password';
        }
      },
      btnChange() {
        this.$refs.regForm.validateField('phone', (err) => {
          if (!err) {
            this.isdisable = !this.isdisable;
            this.actionSendMessage({phone: this.regForm.phone, identification: 'reg'});
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
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let router = this.$router;
          let form = this[formName];
          if (valid) {
            delete this[formName].isAgree;
            this.actionRegForm({form, router});
            this.inputType = 'password';
            this.inputType2 = 'password';
            setTimeout(() => {
              this.regForm.password = '';
              this.regForm.confirm = '';
            }, 1000);

          } else {
            alert('submit failed');
            return false;
          }
        })
      },
      savePassword() {
        let enc_pwd = md5(this.regForm.password);
        this.$store.commit('saveTemp', enc_pwd);
      }
    },
    created: function () {

    }
  }
</script>

<style lang="scss" src="../assets/scss/register.scss"></style>
<style lang="scss">
  .register {
    label.el-form-item__label {
      height: 100%;
    }

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
      font-size: 20px;
      > input {
        padding-left: 50px !important;
      }
    }

    #phone {
      .el-input--medium {
        font-size: 20px;
        > input {
          padding-left: 50px !important;
        }
      }
    }
  }
</style>
