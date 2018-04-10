<template>
  <div class="dbe father"
       v-loading="loading"
       element-loading-text="正在投递，请稍后..."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="content">
      <div class="aside"></div>
      <div class="dbe-container">
        <div class="dbe-box">
          <div class="dbe-title">邮件投递</div>
          <div class="dbe-edit">
            <div class="dbe-edit-title-tip" style="text-align: left;width: 725px;margin: 0 auto;margin-bottom: 20px;font-weight: bold;">
              邮件标题
            </div>
            <div class="dbe-edit-title">
              <div class="dbe-edit-title-context">
                【小金窝】
                <span><input type="text" placeholder="姓名" v-model="input1">
                  |
                  <input type="text" placeholder="学校" v-model="input2">
                  |
                  <input type="text"
                         placeholder="学历"
                         @focus="showPanel1 = true"
                         @blur="showPanel1 = false" v-model="input3">
                  <span class="panel panel1" v-if="showPanel1">
                    示例:<br>
                    研一/研二
                  </span>
                  | 每周工作
                  <input type="text"
                         style="width: 20px;"
                         @focus="showPanel2 = true"
                         @blur="showPanel2 = false" v-model="input4"> 天
                  <span class="panel panel2" v-if="showPanel2">
                    限填: <br>
                    1-7的数字
                  </span>
                  |
                  <input type="text"
                         placeholder="投递职位"
                         style="width: 80px;"
                         @focus="showPanel3 = true"
                         @blur="showPanel3 = false" v-model="input5">
                   <span class="panel panel3" v-if="showPanel3">
                    示例:<br>
                    研究所实习生
                  </span>
                </span>
              </div>
            </div>
            <div class="dbe-edit-context-title"
                 style="text-align: left;width: 725px;margin: 0 auto;margin-bottom: 20px;font-weight: bold;">
              邮件内容
            </div>
            <quill-editor ref="textEditor" v-model="dbeMail"></quill-editor>
          </div>
        </div>
        <div class="template-box">
          <!--<div class="tmp-title">选择模板</div>-->
          <el-tabs tab-position="left" style="height: 200px;">
            <el-tab-pane label="模板一">
              <div class="tmp-item tmp-a" @click="dbeMail = tmp1">
                <el-input type="textarea" v-model="tmpa" autosize resize="none" readonly class="dbe-tmp"></el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="模板二">
              <div class="tmp-item tmp-a" @click="dbeMail = tmp2">
                <el-input type="textarea" v-model="tmpb" autosize resize="none" readonly class="dbe-tmp"></el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="模板三">
              <div class="tmp-item tmp-a" @click="dbeMail = tmp3">
                <el-input type="textarea" v-model="tmpc" autosize resize="none" readonly class="dbe-tmp"></el-input>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="dbe-btn" @click="deliver">投递</div>
      </div>
    </div>
    <el-dialog title="投递成功" :visible.sync="successTableVisible">
      <h4 class="resume-success" style="margin-bottom: 30px;">投递成功</h4>
      <el-button @click="successTableVisible = false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>

  import api from '../assets/datas/api'
  import {mapMutations} from 'vuex'


  export default {
    data() {
      return {
        position_id: '4776b11c72d94bb7b7b0e09000e7cf13',
        successTableVisible: false,
        dbeMail: '',
        tmpa: '尊敬的HR，您好：\n' +
        '\n' +
        '我是【真实姓名】，通过小金窝看到贵公司正在招聘。\n' +
        '我是【学校及专业】的【学历】学生，【毕业时间】年毕业，我经过【公司及部门】实习，有了【业务】的经验。\n' +
        '非常认可贵公司，希望获得本次招聘岗位的面试机会。\n' +
        '\n' +
        '                                                             【真实姓名】\n' +
        '                                                             【电话】\n' +
        '                                                             【邮箱】',
        tmpb: '尊敬的领导：\n' +
        '\n' +
        '您好!\n' +
        '我是【毕业时间】年毕业的【真实姓名】,在小金窝网上看到贵公司正招聘【部门】， 并一直期望有机会加盟贵公司。\n' +
        '学生期间，我就读于【学校及专业】，并取得了优异的成绩，获得了【奖项】等奖项。\n' +
        '我性格开朗，具备金融人士所必需的适应高强度的工作压力的能力。现将我的简历一并附上，希望你能考虑我的应聘要求。 最后，不管您是否选择我都请您接受我最诚挚的谢意!\n' +
        '谨祝: \n' +
        '贵公司扬独家之优势，汇天下之精华!\n' +
        '                                                             【真实姓名】\n' +
        '                                                             【手机号码】\n' +
        '                                                             【邮箱】',
        tmpc: '尊敬的HR（女士/先生），\n' +
        '\n' +
        '您好！\n' +
        '从小金窝网站获得此招聘信息，我的求职简历见附件，请查收！希望能得到您的垂青！\n' +
        '祝 工作愉快！\n' +
        '                                                             【真实姓名】\n' +
        '                                                             【手机号码】\n' +
        '                                                             【邮箱】',
        tmp1: '<p>尊敬的HR，您好：</p><p><br></p><p class="ql-indent-1">    我是【真实姓名】，通过小金窝看到贵公司正在招聘。</p><p class="ql-indent-1">    我是【学校及专业】的【学历】学生，【毕业时间】年毕业，我经过【公司及部门】实习，有了【业务】的经验。</p><p class="ql-indent-1">    非常认可贵公司，希望获得本次招聘岗位的面试机会。</p><p><br></p><p class="ql-indent-8">【真实姓名】</p><p class="ql-indent-8">【电话】</p><p class="ql-indent-8">【邮箱】</p>',
        tmp2: '<p>尊敬的领导：</p><p><br></p><p>您好!</p><p>    我是【毕业时间】年毕业的【真实姓名】,在小金窝网上看到贵公司正招聘【部门】， 并一直期望有机会加盟贵公司。</p><p>    学生期间，我就读于【学校及专业】，并取得了优异的成绩，获得了【奖项】等奖项。</p><p>    我性格开朗，具备金融人士所必需的适应高强度的工作压力的能力。现将我的简历一并附上，希望你能考虑我的应聘要求。 最后，不管您是否选择我都请您接受我最诚挚的谢意!</p><p>    谨祝:&nbsp;</p><p>    贵公司扬独家之优势，汇天下之精华!</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【真实姓名】</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【手机号码】</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【邮箱】</p>',
        tmp3: '<p>尊敬的HR（女士/先生），</p><p><br></p><p>您好！</p><p>    从小金窝网站获得此招聘信息，我的求职简历见附件，请查收！希望能得到您的垂青！</p><p>    祝 工作愉快！</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【真实姓名】</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【手机号码】</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【邮箱】</p>',
        loading: false,
        showPanel1: false,
        showPanel2: false,
        showPanel3: false,
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
      }
    },
    methods: {
      ...mapMutations([
        'clearIdList'
      ]),
      deliver() {
        let vm = this;
        if (!this.input1.length
          || !this.input2.length
          || !this.input3.length
          || !this.input4.length
          || !this.input5.length
          || !(this.dbeMail.replace(/<[^>]+>/g, "").replace(/(^\s*)|(\s*$)/g, "")).length) {
          this.$message.error('请检查邮件标题和内容是否填写完整');
          return
        }
        let context = this.dbeMail;
        this.$store.commit('writeIdList3', {"context": context, "theme": this.theme});
        let n = this.$store.state.idList;
        this.loading = true;
        this.axios({
          method: 'post',
          url: api.deliverVitae,
          data: n
        }).then((res) => {
          this.loading = false;
          if (res.data.code == 0) {
            this.$message('发送成功');
            setTimeout(function () {
              vm.$router.go(-1);
              vm.$store.commit('clearIdList');
            }, 500);
            sessionStorage.setItem('mailContext', context);
            sessionStorage.setItem('mailTheme1', this.input1);
            sessionStorage.setItem('mailTheme2', this.input2);
            sessionStorage.setItem('mailTheme3', this.input3);
            sessionStorage.setItem('mailTheme4', this.input4);
            sessionStorage.setItem('mailTheme5', this.input5);
          } else {
            alert('发送失败,请重试或联系管理员');
          }
        }).catch((err) => {
          if (err) {
            this.$message.error('发送失败，请联系管理员');
            console.log(err);
          }
        });
        // this.successTableVisible = true;
        // setTimeout(() => {
        //   this.$router.go(-1);
        // }, 3000)
      },
      hadle() {
      }
    },
    computed: {
      // editor() {
      //   return this.$refs.textEditor.quillEditor;
      // }
      theme: function () {
        return "【小金窝】"
          + this.input1
          + " - "
          + this.input2
          + " - "
          + this.input3
          + " - 每周工作 "
          + this.input4
          + "天 - "
          + this.input5
      }
    },
    mounted() {
      // this.dbeMail = this.tmp1
    },
    created() {
      this.dbeMail = sessionStorage.getItem('mailContext') || '';
      this.input1 = sessionStorage.getItem('mailTheme1') || '';
      this.input2 = sessionStorage.getItem('mailTheme2') || '';
      this.input3 = sessionStorage.getItem('mailTheme3') || '';
      this.input4 = sessionStorage.getItem('mailTheme4') || '';
      this.input5 = sessionStorage.getItem('mailTheme5') || '';
    }
  }
</script>

<style lang="scss" src="../assets/scss/dbe.scss"></style>
<style lang="scss">
  .el-message {
    top: 100px !important;
  }

  .el-tabs--left {
    height: auto !important;
  }

  .dbe {
    .quill-editor {
      width: 725px;
      margin: 0 auto;
      border-radius: 11px;
      border: solid 1px #dcdddd;
      min-height: 280px;
      .ql-toolbar.ql-snow {
        border: none;
        border-bottom: 1px solid #dcdddd;
      }
      .ql-container.ql-snow {
        border: none;
      }
    }
    .dbe-edit-title {
      width: 725px;
      height: 55px;
      background-color: #ffffff;
      border-radius: 11px;
      border: solid 1px #dcdddd;
      margin: 0 auto 80px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 12px 15px;
      font-size: 0.875rem;
      .dbe-edit-title-tip {
        text-align: left;
        font-size: 1rem;
        line-height: 28px;
        color: #202020;
      }
      .dbe-edit-title-context {
        margin-top: 8px;
        position: relative;
        input {
          border: none;
          border-bottom: 1px solid #000000;
          width: 60px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0 3px;
          &::-webkit-input-placeholder {
            font-size: 0.75rem;
            color: #9e9e9e;
            text-align: center;
          }
          &:-moz-placeholder {
            font-size: 0.75rem;
            color: #9e9e9e;
            text-align: center;
          }
          &::-moz-placeholder {
            font-size: 0.75rem;
            color: #9e9e9e;
            text-align: center;
          }
          &:-ms-input-placeholder {
            font-size: 0.75rem;
            color: #9e9e9e;
            text-align: center;
          }
        }
        .panel {
          width: 80px;
          height: 45px;
          background-color: #dcdddd;
          text-align: center;
          font-size: 0.75rem;
          color: #515150;
        }
        .panel1 {
          position: absolute;
          bottom: -50px;
          left: 280px;;
          line-height: 20px;
        }
        .panel2 {
          position: absolute;
          bottom: -50px;
          left: 390px;;
          line-height: 20px;
        }
        .panel3 {
          position: absolute;
          bottom: -50px;
          left: 480px;;
          line-height: 20px;
        }
      }
    }
    .dbe-edit-text {
      .el-textarea__inner {
        border: none !important;
      }
    }
    .dbe-tmp {
      .el-textarea__inner {
        border: none;
        margin-bottom: 20px;
        padding-left: 30px;
        cursor: pointer;
      }
    }
  }

</style>
