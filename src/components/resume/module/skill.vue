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
          <autoarea place-holder="请简要描述你获得的证书..." :text-content="skill_professional"
                    item-type="skill_professional" @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          语言技能
        </div>
        <div class="d_content">
          <autoarea place-holder="请简要描述你获得的证书..." :text-content="skill_language" item-type="skill_language"
                    @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          计算机技能
        </div>
        <div class="d_content">
          <autoarea place-holder="请简要描述你获得的证书..." :text-content="skill_computer" item-type="skill_computer"
                    @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          其它技能
        </div>
        <div class="d_content">
          <autoarea place-holder="请简要描述你获得的证书..." :text-content="skill_others" item-type="skill_others"
                    @listenTextareaChange="getContent"></autoarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import autoarea from './common/autoarea';

  export default {
    data() {
      return {}
    },
    methods: {
      getContent(data) {
        let type = data.type;
        let text = data.text;
        this[type] = text;
      }
    },
    components: {
      autoarea,
    },
    computed: {
      skill_professional: {
        get: function () {
          return this.$store.state.resumeData.skill_professional;
        },
        set: function (newVal) {
          this.$store.state.resumeData.skill_professional = newVal;
        }
      },
      skill_language: {
        get: function () {
          return this.$store.state.resumeData.skill_language;
        },
        set: function (newVal) {
          this.$store.state.resumeData.skill_language = newVal;
        }
      },
      skill_computer: {
        get: function () {
          return this.$store.state.resumeData.skill_computer;
        },
        set: function (newVal) {
          this.$store.state.resumeData.skill_computer = newVal;
        }
      },
      skill_others: {
        get: function () {
          return this.$store.state.resumeData.skill_others;
        },
        set: function (newVal) {
          this.$store.state.resumeData.skill_others = newVal;
        }
      },

    },
    watch: {
      skill_professional() {
        this.$store.commit('writeResumeData', {
          type: 'skill_professional',
          data: this.skill_professional
        })
      },
      skill_language() {
        this.$store.commit('writeResumeData', {
          type: 'skill_language',
          data: this.skill_language
        })
      },
      skill_computer() {
        this.$store.commit('writeResumeData', {
          type: 'skill_computer',
          data: this.skill_computer
        })
      },
      skill_others() {
        this.$store.commit('writeResumeData', {
          type: 'skill_others',
          data: this.skill_others
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .skill-module {
    height: auto;
    margin: 0 40px;
    padding: 5px 0 5px;
    /*border-bottom: 1px dashed #cfcfcf;*/
    &:hover {
      border: 1px solid #c20c0c;
    }
    .module-title {
      border-bottom: 1px solid #000000;
      /*padding-left: 10px;*/
      margin-bottom: 5px;
    }
    .skill-tab {
      width: 100%;
      .d_price {
        width: 100%;
        /*margin-top: 3px;*/
        padding: 3px 0;
        &:hover {
          background-color: #f2f2f2;
        }
        > div {
          float: left;
        }
        .d_title {
          width: 24%;
          /*padding-right: 50px;*/
          /*text-align: right;*/
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 14px;
        }
        .d_content {
          width: 76%;
          min-height: 20px;
          margin-top: 2px;
        }
      }
    }
  }

</style>
