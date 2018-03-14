<template>
    <div class="resume-util">
      <ul class="resume-util-list">
        <li class="resume-util-list-item"> <i>个人信息</i></li>
        <li class="resume-util-list-item"> <i>教育经历</i></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['internship']}"> <i @click="addModule('internship')">实习经历</i> <span v-if="statusList['internship']" @click="removeModule('internship')">-</span></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['work']}"> <i @click="addModule('work')">工作经历</i> <span v-if="statusList['work']" @click="removeModule('work')">-</span></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['science']}"> <i @click="addModule('science')">学术研究</i> <span v-if="statusList['science']" @click="removeModule('science')">-</span></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['project']}"> <i @click="addModule('project')">项目经历</i> <span v-if="statusList['project']" @click="removeModule('project')">-</span></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['practice']}"> <i @click="addModule('practice')">活动实践</i> <span v-if="statusList['practice']" @click="removeModule('practice')">-</span></li>
        <li class="resume-util-list-item" :class="{'resume-util-list-item-able': statusList['skill']}"> <i @click="addModule('skill')">技能证书</i> <span v-if="statusList['skill']" @click="removeModule('skill')">-</span></li>
      </ul>
      <div class="save" @click="saveResume" v-if="$router.currentRoute.params.op === 'new'">保存</div>
      <div class="save" @click="changeResume" v-else>保存更改</div>
    </div>
</template>

<style lang="scss" scoped>
  .resume-util {
    overflow: hidden;
    .save {
      text-align: center;
      background-color: #c20c0c;
      color: #FFFFFF;
      width: 60%;
      height: 35px;
      line-height: 35px;
      border-radius: 6px;
      margin-top: 20px;
    }
    ul {
      .resume-util-list-item-able {
        color: #dddddd;
        cursor: not-allowed;
      }
      li {
        width: 100%;
        padding: 8px 16px 8px 16px;
        overflow: hidden;
        cursor: pointer;
        i {
          font-style: normal;
        }
        span {
          color: #cccccc;
          cursor: pointer;
          text-align: center;
          line-height: 18px;
          font-size: 24px;
          vertical-align: top;
          display: inline-block;
          width: 18px;
          height: 18px;
          background-color: #C20C0C;
          border-radius: 50%;
        }
      }
    }
  }

</style>

<script>
  import bus from './js/bus'
  import {type2index} from './js/utils'
  export default {
    methods: {
      addModule(type) {
        const index = type2index(this.$store.state.moduleStatus, type);
        if(!this.$store.state.moduleStatus[index].status) {
          bus.$emit('changeModuleStatus', index);
        }
      },
      removeModule(type) {
        const index = type2index(this.$store.state.moduleStatus, type);
        if(this.$store.state.moduleStatus[index].status) {
          bus.$emit('changeModuleStatus', index);
        }
      },
      saveResume() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let form = JSON.parse(JSON.stringify(this.$store.state.resumeData));
        form.vitae_city = JSON.stringify(form.vitae_city);
        form.id = this.$store.state.userInfo.id;
        this.$store.dispatch('sendResume', form).then( res => {
          if (res.data.code === '0') {
            loading.close();
            this.$message({
              message: '提交成功'
            });
            this.$router.go(-1);
          }
        })
      },
      changeResume() {
        let form = JSON.parse(JSON.stringify(this.$store.state.resumeData));
        form.vitae_city = JSON.stringify(form.vitae_city);
        delete form.expected_city;
        delete form.other_content;
        delete form.remark;
        delete form.vitae_path;
        delete form.gender;
        form.vitae_id = this.$router.currentRoute.params.op;
        this.$store.dispatch('changeResume', form)
      }
    },
    computed: {
      statusList() {
        let status = {
          internship: true,
          work: true,
          science: true,
          project: true,
          practice: true,
          skill: true,
        };
        for (let k in status) {
          let index = type2index(this.$store.state.moduleStatus, k);
          status[k] = this.$store.state.moduleStatus[index].status;
        }
        return status
      }
    }
  }
</script>

