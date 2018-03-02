<template>
    <div class="resume-util">
      <ul>
        <li> <i>个人信息</i></li>
        <li> <i>教育经历</i></li>
        <li> <i @click="addModule('internship')">实习经历</i> <span @click="removeModule('internship')">-</span></li>
        <li> <i @click="addModule('work')">工作经历</i> <span @click="removeModule('work')">-</span></li>
        <li> <i @click="addModule('science')">学术研究</i> <span @click="removeModule('science')">-</span></li>
        <li> <i @click="addModule('project')">项目经历</i> <span @click="removeModule('project')">-</span></li>
        <li> <i @click="addModule('practice')">活动实践</i> <span @click="removeModule('practice')">-</span></li>
        <li> <i @click="addModule('skill')">技能证书</i> <span @click="removeModule('skill')">-</span></li>
      </ul>
    </div>
</template>

<style lang="scss" scoped>
  .resume-util {
    ul {
      li {
        width: 100%;
        padding: 8px 16px 8px 16px;
        overflow: hidden;
        i {
          font-style: normal;
        }
        span {
          color: #cccccc;
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
      }
    },
  }
</script>

