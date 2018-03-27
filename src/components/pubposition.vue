<template>
  <div class="pubposition father">
    <div class="content">
      <div class="pub-container">
        <aside class="aside"></aside>
        <div class="pub-box">
          <div class="pub-title">职位发布 <span class="arrow"></span></div>
          <div class="pub-form">
            <el-form inline label-position="top" ref="pubform" :model="pubform">
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="position_company" :rules="{required: true, message: '请填写公司名称', trigger: 'blur'}">
                    <el-input placeholder="公司名称" v-model="pubform.position_company"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item prop="position_industry"
                                    :rules="{required: true, message: '请选择行业分类', trigger: 'blur'}">
                        <el-select placeholder="行业" v-model="pubform.position_industry">
                          <el-option label="银行" value="1"></el-option>
                          <el-option label="信托" value="2"></el-option>
                          <el-option label="保险" value="3"></el-option>
                          <el-option label="证券" value="4"></el-option>
                          <el-option label="基金" value="5"></el-option>
                          <el-option label="互联网金融" value="6"></el-option>
                          <el-option label="租赁" value="7"></el-option>
                          <el-option label="PE/VC" value="8"></el-option>
                          <el-option label="其他" value="9"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="position_function"
                                    :rules="{required: true, message: '请选择业务分类', trigger: 'blur'}">
                        <el-select placeholder="业务" v-model="pubform.position_function">
                          <el-option label="投资银⾏" value="1"></el-option>
                          <el-option label="证券研究" value="2"></el-option>
                          <el-option label="资产管理" value="3"></el-option>
                          <el-option label="固定收益" value="4"></el-option>
                          <el-option label="私募股权" value="5"></el-option>
                          <el-option label="银⾏保险" value="6"></el-option>
                          <el-option label="其他" value="7"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="position_depart" :rules="{required: true, message: '请填写部门', trigger: 'blur'}">
                    <el-input placeholder="部门" v-model="pubform.position_depart"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="position_type" :rules="{required: true, message: '请选择岗位分类', trigger: 'blur'}">
                    <el-select placeholder="岗位分类" v-model="pubform.position_type"  @change="clearGranduateYear">
                      <el-option label="实习" value="1">实习</el-option>
                      <el-option label="校招" value="2">校招</el-option>
                      <el-option label="社招" value="3">社招</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="position_graduation_year"
                                :rules="{type:'number',required: true, message: '请选择时间', trigger: 'blur'}">
                    <el-select placeholder="毕业时间" v-model.number="pubform.position_graduation_year"
                               v-if="pubform.position_type != '3'">
                      <el-option label="不限" :value="0">
                      </el-option>
                      <el-option :label="new Date().getFullYear() + '年'"
                                 :value="1"></el-option>
                      <el-option :label="new Date().getFullYear() + 1  + '年'"
                                 :value="2">
                      </el-option>
                      <el-option :label="new Date().getFullYear() + 2  + '年及以后'"
                                 :value="3">
                      </el-option>
                    </el-select>
                    <el-select placeholder="工作年限" v-model="pubform.position_graduation_year"
                               v-if="pubform.position_type == '3'"
                               :rules="{type:'number',required: true, message: '请选择时间', trigger: 'blur'}">
                      <el-option label="1-2年工作经验" :value="4">
                      </el-option>
                      <el-option label="3-4年工作经验" :value="5">
                      </el-option>
                      <el-option label="5-6年工作经验" :value="6">
                      </el-option>
                      <el-option label="7-8年工作经验" :value="7">
                      </el-option>
                      <el-option label="8年以上工作经验" :value="8">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item prop="position_regular"
                                    :rules="{required: true, message: '请选择是否留用', trigger: 'blur'}">
                        <el-select placeholder="留用机会" v-model="pubform.position_regular">
                          <el-option label="有机会" value="1">有机会</el-option>
                          <el-option label="无机会" value="2">无机会</el-option>
                          <el-option label="暂不确定" value="3">暂不确定</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="position_address"
                                    :rules="{required: true, message: '请选择城市', trigger: 'blur'}">
                        <el-select placeholder="地区" v-model="pubform.position_address">
                          <el-option label="北京" value="北京"></el-option>
                          <el-option label="上海" value="上海"></el-option>
                          <el-option label="广州" value="广州"></el-option>
                          <el-option label="深圳" value="深圳"></el-option>
                          <el-option label="杭州" value="杭州"></el-option>
                          <el-option label="武汉" value="武汉"></el-option>
                          <el-option label="天津" value="天津"></el-option>
                          <el-option label="成都" value="成都"></el-option>
                          <el-option label="重庆" value="重庆"></el-option>
                          <el-option label="南京" value="南京"></el-option>
                          <el-option label="其他" value="其他"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <div class="date-pick">
                    <el-form-item prop="position_validity"
                                  :rules="{type:'date',required: true, message: '请选择截至日期', trigger: 'blur'}">
                      <el-date-picker align="right" placeholder="截止日期"
                                      v-model="pubform.position_validity"
                                      :picker-options="pickerOptions1"></el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="position_email" :rules="emailRule">
                    <el-input type="text" placeholder="Email ID" v-model="pubform.position_email">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="position_work_context"
                                :rules="{required: true, message: '请填写工作内容', trigger: 'blur'}">
                    <!--<el-input type="textarea" placeholder="工作内容" resize="none" :rows="6"-->
                    <!--v-model="pubform.position_work_context"></el-input>-->
                    <div class="editor">
                      <quill-editor v-model="pubform.position_work_context" :options="editorConfig1"></quill-editor>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="position_work_requir"
                                :rules="{required: true, message: '请填写工作要求', trigger: 'blur'}">
                    <!--<el-input type="textarea" placeholder="工作要求" resize="none" :rows="6"-->
                    <!--v-model="pubform.position_work_requir"></el-input>-->
                    <div class="editor">
                      <quill-editor v-model="pubform.position_work_requir" :options="editorConfig2"></quill-editor>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item>
                    <!--<el-input type="textarea" placeholder="公司简介(选填)" resize="none" :rows="6"-->
                    <!--v-model="pubform.company_introduction"></el-input>-->
                    <div class="editor">
                      <quill-editor v-model="pubform.company_introduction" :options="editorConfig3"></quill-editor>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="pub-btn">
                <el-form-item>
                  <el-button type="primary" round @click="submitPubPos">提交</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div class="pub-corner"></div>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import {validataEmail} from '../assets/datas/patterns'

  export default {
    data() {
      return {
        pubform: {
          position_company: '',
          position_industry: '',
          position_function: '',
          position_depart: '',
          position_type: '',
          position_graduation_year: '',
          position_regular: '',
          position_address: '',
          position_validity: '',
          position_email: '',
          position_work_context: '',
          position_work_requir: '',
          company_introduction: ''
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        emailRule: [
          {required: true, message: '请填写邮箱', trigger: 'blur'},
          {validator: validataEmail}
        ],
        editorConfig1: {
          modules: {
            toolbar: ['bold', 'italic', 'underline', 'strike', {'list': 'ordered'}, {'list': 'bullet'}]
          },
          placeholder: '工作内容...'
        },
        editorConfig2: {
          modules: {
            toolbar: ['bold', 'italic', 'underline', 'strike', {'list': 'ordered'}, {'list': 'bullet'}]
          },
          placeholder: '工作要求...'
        },
        editorConfig3: {
          modules: {
            toolbar: ['bold', 'italic', 'underline', 'strike', {'list': 'ordered'}, {'list': 'bullet'}]
          },
          placeholder: '公司简介(选填)...'
        }
      }
    },
    methods: {
      ...mapActions([
        'actionPubPos'
      ]),
      submitPubPos() {
        this.$refs.pubform.validate((valid) => {
          let router = this.$router;
          let form = this.pubform;
          if (valid) {
            this.actionPubPos({form, router});
          }
        });
      },
      clearGranduateYear() {
        this.pubform.position_graduation_year = '';
      }
    },
    created() {
      window.onbeforeunload = (event) => {
        event.returnValue = '确定要关闭页面吗？'
      }
      this.$store.dispatch('getUserInfo', {}).then( res => {
        if (+res.data.code === 0) {
          let data = res.data.data;
          if (+data.wbUserDTO.authStatus !== 2) {
            this.$message.error('请先认证');
            this.$router.replace('/certify');
          }
        }
      })
    }
  }
</script>

<style lang="scss" src="../assets/scss/pubposition.scss"></style>

<style lang="scss">
  .el-col-12, .el-col-24 {
    .editor {
      height: 200px;
      margin-bottom: 50px;
      .quill-editor {
        height: 100%;
        .ql-editor {
          &::before {
            font-size: 1.125rem;
            font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
            font-style: normal;
            color: #B4BCD6;
          }
        }
      }

    }
    .el-form-item {
      margin-bottom: 50px;
      width: 100%;
    }
    .el-form-item__content {
      width: 100%;
      input {
        font-size: 1.125rem;
        font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        &::-webkit-input-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &:-moz-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &::-moz-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &:-ms-input-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
      }
      textarea {
        font-size: 1.125rem;
        font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        &::-webkit-input-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &:-moz-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &::-moz-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
        &:-ms-input-placeholder {
          font-size: 1.125rem;
          font-family: quote, 'AdobeHeitiStd', 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'simsun', sans-serif;
        }
      }
      .el-select {
        width: 100%;
      }
      .el-date-editor.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--date {
        .el-input__prefix {
        }
      }
      .el-input.el-input--small {
        input {
          border: none;
          border-bottom: 1px solid #d8d8d8;
          border-radius: 0;
        }
      }
    }
  }

  /*.el-col-12*/

</style>
