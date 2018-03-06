<template>
  <div class="skill-module">
    <div class="skill-title module-title">
      技能证书
    </div>
    <div class="skill-tab">
      <div class="d_price clearfix">
        <div class="d_title">
          专业技能
        </div>
        <div class="d_content">
          <autoarea :text-content="skills.pro_value" item-type="pro_value" @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          语言技能
        </div>
        <div class="d_content">
          <autoarea :text-content="skills.lan_value" item-type="lan_value" @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          计算机技能
        </div>
        <div class="d_content">
          <autoarea :text-content="skills.com_value" item-type="com_value" @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          其它技能
        </div>
        <div class="d_content">
          <autoarea :text-content="skills.oth_value" item-type="oth_value" @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import autoarea from './common/autoarea';

  export default {
    data() {
      return {
      }
    },
    methods: {
      getContent(data) {
        let type = data.type;
        let text = data.text;
        this.skills[type] = text;
      }
    },
    components: {
      autoarea,
    },
    computed: {
      skills() {
        return this.$store.state.resumeData.skill;
      }
    },
    watch: {
      'skills': {
        handler: function (newVal, oldVal) {
          this.$store.commit('writeResumeData', {
            type: 'skill',
            data: this.skills
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .skill-module {
    width: 100%;
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    border-bottom: 1px dashed #cfcfcf;
    .module-title {
      border-bottom: 1px solid #000000;
      font-size: 26px;
      width: 90%;
    }
    .skill-tab {
      width: 90%;
      .d_price {
        width: 100%;
        margin-top: 10px;
        > div {
          float: left;
        }
        .d_title {
          width: 20%;
          padding-right: 50px;
          text-align: right;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        .d_content {
          width: 70%;
          min-height:20px;
        }
      }
    }
  }

</style>
