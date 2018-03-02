<template>
  <div class="login father">
    <div class="content">
      <div class="login-box">
        <el-tabs type="border-card">
          <el-tab-pane label="密码登录">
            <el-form ref="logForm" :rules="rules" :model="logForm" size="medium" style="font-size: 18px;">
              <el-form-item prop="phone">
                <el-input
                  placeholder="手机号"
                  v-model.number="logForm.phone">
                  <icon name="user" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  placeholder="密码"
                  v-model="logForm.password"
                  :type="inputType">
                  <icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
                  <i class="el-icon-view" slot="suffix" @click="changeInputType"
                     style="margin-top: 18px; margin-right: 10px;"></i>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登陆">
            <el-form ref="logPhoneForm" :rules="rules" :model="logPhoneForm" size="medium" style="font-size: 18px;">
              <el-form-item prop="phone" id="number">
                <el-input
                  placeholder="手机号"
                  v-model.number="logPhoneForm.phone">
                  <icon name="phone" slot="prefix" scale="1.5" style="margin-top: 14px; margin-left: 10px;"></icon>
                  <!--<select name="phone-pre" id="phone-pre" slot="prefix" :model="countryCode">-->
                  <!--<option value="+86" selected>+86</option>-->
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
              <el-form-item prop="message">
                <el-input
                  placeholder="验证码"
                  v-model="logPhoneForm.message">
                  <icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <div class="fl" style="line-height: 30px;">
            <router-link to="register" style="font-size: 12px;float: left;">
              <!--<el-button type="primary" plainstyle="margin-left: 10px;">注册</el-button>-->
              我没有账号，去注册
            </router-link>
            <router-link to="resetpwd" style="display: block; font-size: 12px;float: left;margin-left: 40px;">
              <!--<el-button plain>忘记密码</el-button>-->
              忘记密码
            </router-link>
          </div>
          <el-button type="primary" class="fr" size="medium" style="width:100px" @click="submitForm">登陆</el-button>
          <div class="log-info" v-if="this.$store.state.logInfo">{{this.$store.state.logInfo}}</div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {validataPhone, validataPhoneExsitedTrue} from '@/assets/datas/patterns'
  import md5 from 'js-md5'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        inputType: 'password',
        logInfo: this.$store.state.logInfo,
        countryCode: '+86',
        tim: 60,
        btnMessage: '发送验证码',
        isdisable: false,
        logForm: {
          phone: '',
          password: ''
        },
        logPhoneForm: {
          phone: '',
          message: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号不能为空'},
            {type: 'number', message: '请输入手机号'},
            {validator: validataPhone},
            {validator: validataPhoneExsitedTrue, trigger: 'blur'}
          ],
          message: [
            {required: true, message: '请输入验证码'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'actionLogForm',
        'actionPhoneLogForm',
        'actionSendMessage'
      ]),
      ...mapMutations([
        'commitPhoneLogForm',
        'commitLogForm'
      ]),
      changeInputType() {
        if (this.inputType === 'password') {
          this.inputType = 'text';
        } else if (this.inputType === 'text') {
          this.inputType = 'password';
        }
      },
      btnChange() {
        this.$refs.logPhoneForm.validateField('phone', (err) => {
          if (!err) {
            this.isdisable = !this.isdisable;
            this.actionSendMessage({"phone": this.logPhoneForm.phone + '', "identification": 'login'});
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
      submitForm() {
        let router = this.$router;
        //判断为手机验证码登陆
        if (this.logPhoneForm.message) {
          this.$refs.logPhoneForm.validate((valid) => {
            if (valid) {
              let form = this.logPhoneForm;
              this.commitPhoneLogForm({form, router});
            } else {
              alert('login failed!');
              return false;
            }
          })
          //判断为密码登陆
        } else if (this.logForm.password) {
          this.$refs.logForm.validate((valid) => {
            if (valid) {
              let md5Password = md5(this.logForm.password);
              this.logForm.password = md5Password;
              let form = this.logForm;
              this.commitLogForm({form, router});
              this.inputType = 'password';
              setTimeout(() => {
                this.logForm.password = '';
              }, 1000);
            } else {
              alert('login failed');
              return false;
            }
          })
        } else {
          return false;
        }
      }
    },
    watch: {},
    computed: {}
  }
</script>

<style lang="scss" src="../assets/scss/login.scss"></style>
<style lang="scss">
  .login {
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
    #number {
      .el-input--medium {
        font-size: 20px;
        > input {
          //padding-left: 120px !important;
        }
      }
    }
  }
</style>
