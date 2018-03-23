<template>
    <div class="resume-main father">
      <div class="left">
        <util></util>
      </div>
      <div class="center" ref="center">
        <show></show>
      </div>
      <div class="right">
        <tip :render-element="ele"></tip>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .resume-main {
    min-height: 1000px;
    min-width: 1240px;
    .left {
      position: fixed;
      top: 0;
      left: 0;
      padding: 70px 0 0 0;
      width: 220px;
    }
    .center {
      width: 820px;
      margin: 75px auto 70px auto;
      background-color: #fff;
      min-height: 773.33px;
    }
    .right {
      position: fixed;
      top: 0;
      right: 0;
      width: 200px;
      height: 100%;
      padding: 70px 0 0 0;
    }
  }

</style>

<script>

  import show from './show'
  import util from './util'
  import tip from './tip'
  import '../../assets/icon/iconfont'

  export default {
    components: {
      show,
      util,
      tip
    },
    data() {
      return {
        resumeData: {
          vitae_photo: '',
          vitae_name: '',
          vitae_email: '',
          vitae_mobile: '',
          vitae_direction: '',
          vitae_entry_time: '',
          vitae_degree: '',
          vitae_city: [],
          vitae_internship_time: '',
          education: [
            {
              edu_time: [],
              school_name: '',
              major: '',
              school_degree: '',
              school_which: ''
            }
          ],
          internship: [
            {
              company_name_pr: '',
              company_department_pr: '',
              position_pr: '',
              internships_time: [],
              work_content_pr: [{
                indexs: 0,
                context: ''
              }]
            }
          ],
          work: [
            {
              company_name_wo: '',
              company_department_wo: '',
              position_wo: '',
              work_time: [],
              work_content_wo: [{
                indexs: 0,
                context: ''
              }]
            }
          ],
          science: [
            {
              science_time: [],
              science_name: '',
              science_desc: '',
              science_context: [
                {
                  indexs: 0,
                  context: ''
                }
              ]
            }
          ],
          project: [
            {
              case_time: [],
              case_name: '',
              case_desc: '',
              case_context: [
                {
                  indexs: 0,
                  context: ''
                }
              ]
            }
          ],
          practice: [
            {
              active_time: [],
              practice_name: '',
              practice_desc: '',
              practice_context: [
                {
                  indexs: 0,
                  context: ''
                }
              ]
            }
          ],
          skill_professional: '',
          skill_language: '',
          skill_computer: '',
          skill_others: '',
        },
        ele: {}
      }
    },
    created() {
      let op = this.$router.currentRoute.params.op;
      if (op != 'new') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$store.dispatch('getResume', {"id": op}).then(res => {
          if (res.data.code === '0') {
            loading.close();
            let form = res.data.data;
            form.vitae_city = JSON.parse(form.vitae_city);
            this.$store.commit('changeResumeData', form);
            this.$store.commit('getResumeStatus', {})
          } else {
            this.$message(res.data.msg)
            loading.close();
          }
        })
      } else {
        let data = this.resumeData;
        this.$store.commit('changeResumeData', data);
        this.$store.commit('initModuleStatus', {});
      }
    },
    mounted() {
      this.ele = this.$refs.center;
      console.log(this.ele.outerHTML);
    }
  }
</script>

