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
          <autoarea :text-content="pro_value"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          语言技能
        </div>
        <div class="d_content">
          <autoarea :text-content="lan_value"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          计算机技能
        </div>
        <div class="d_content">
          <autoarea :text-content="com_value"></autoarea>
        </div>
      </div>
      <div class="d_price clearfix">
        <div class="d_title">
          其它技能
        </div>
        <div class="d_content">
          <autoarea :text-content="oth_value"></autoarea>
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
        pro_value: '',
        lan_value: '',
        com_value: '',
        oth_value: '',
      }
    },
    methods: {},
    components: {
      autoarea,
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
