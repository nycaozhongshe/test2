<template>
  <div class="resetpwd father">
    <div class="content">
      <div class="resetpwd-title">
        <h3>验证手机</h3>
        <div class="line"></div>
      </div>
      <div class="resetpwd-box">
        <el-form ref="resetpwdform" :rules="rules" :model="resetpwdform" size="medium" style="font-size: 18px;">
          <el-form-item prop="phone" id="phone">
            <el-input
              placeholder="手机号"
              v-model.number="resetpwdform.phone">
              <icon name="phone" slot="prefix" scale="1.5" style="margin-top: 15px; margin-left: 10px;"></icon>
              <!--<select name="phone-pre" id="phone-pre" slot="prefix">-->
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
          <el-form-item>
            <el-input
              placeholder="手机验证码"
              v-model="resetpwdform.message">
              <icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>
            </el-input>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-input-->
          <!--placeholder="验证码"-->
          <!--v-model="resetpwdform.code">-->
          <!--<icon name="key" slot="prefix" scale="1.5" style="margin-top: 18px; margin-left: 10px;"></icon>-->
          <!--</el-input>-->
          <!--<span class="code">验证码</span>-->
          <!--</el-form-item>-->
        </el-form>
        <el-button type="primary" class="fr" @click="submitCheckPhoneCode">下一步</el-button>
        <div class="message" style="color: #C20C0C;font-size: 0.75rem;">{{errMessage}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {validataPhoneExsitedTrue} from '@/assets/datas/patterns'
  import {mapActions} from 'vuex'

  export default {
    data() {
      let validataPhone = (rule, value, callback) => {
        if (value.toString().length != 11) {
          callback(new Error('手机号长度不正确'));
        } else {
          callback();
        }
      };
      return {
        tim: 60,
        btnMessage: '发送验证码',
        isdisable: false,
        resetpwdform: {
          phone: '',
          message: ''
        },
        rules: {
          phone: [
            {required: true, message: '手机号不能为空'},
            {type: 'number', message: '请输入手机号'},
            {validator: validataPhoneExsitedTrue, trigger: 'blur'},
          ],
          message: [
            {required: true, message: '请输入验证码'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'actionSendMessage',
        'actionCheckPhoneCode'
      ]),
      //改变发送验证码按钮内容并发送验证码
      btnChange: function () {
        this.$refs.resetpwdform.validateField('phone', (err) => {
          if (!err) {
            this.isdisable = !this.isdisable;
            this.actionSendMessage({phone: this.resetpwdform.phone, identification: 'resetpwd'});
            let timer = setInterval(() => {
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
      submitCheckPhoneCode() {
        let router = this.$router;
        let form = this.resetpwdform;
        this.actionCheckPhoneCode({form, router});
      }
    },
    computed: {
      errMessage: {
        get: function () {
          return this.$store.state.errMessage;
        },
        set: function (newVal) {
          this.$store.state.errMessage = newVal;
        }
      }
    }
  }
</script>

<style lang="scss" src="../assets/scss/resetpwd.scss"></style>

<style lang="scss">
  .resetpwd {
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

  #phone {
    .el-input--medium {
      font-size: 20px;
      > input {
        //padding-left: 120px !important;
      }
    }
  }
</style>
