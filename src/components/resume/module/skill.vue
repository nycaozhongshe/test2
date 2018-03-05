<template>
  <div class="skill-module">
    <div class="skill-title module-title">
      技能证书
    </div>
    <table class="skill-tab">
      <tr>
        <th>专业技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="专业技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true" v-model="pro_value">{{pro_value || '专业技能'}}<br /></div>
        </td>
      </tr>
      <tr>
        <th>语言技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="语言技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true">语言技能<br /></div>
        </td>
      </tr>
      <tr>
        <th>计算机技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="计算机技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true">计算机技能<br /></div>
        </td>
      </tr>
      <tr>
        <th>其它技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="其它技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true">其它技能<br /></div>
        </td>
      </tr>
    </table>
  </div>
  <!--<span v-if="!skillflag"><input type="text" @blur="saveProfessionalSkills" v-model="pro_value"/></span>-->
</template>

<script>
  export default {
    data() {
      return {
        pro_value: '',
        lan_value: '',
        com_value: '',
        oth_value: '',
      }
    },
    methods: {}
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

  }

  .input-skill {
    width: 100%;
    padding-left: 10px;
    background-color: #F0F0F0;
    border: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    &:focus {
      border-bottom: 1px dashed #666;
      z-index: 999;
    }
    &::-webkit-input-placeholder {
      color: #9e9e9e;
    }
    &:-moz-placeholder {
      color: #9e9e9e;
    }
    &::-moz-placeholder {
      color: #9e9e9e;
    }
    &:-ms-input-placeholder {
      color: #9e9e9e;
    }
  }

  .skill-tab {
    width: 90%;
    margin-top: 10px;
    background-color: #F0F0F0;
    tr {
      height: 30px;
      th {
        width: 12%;
        text-align: right;
      }
      td {
        padding-left: 35px;
      }
    }
    :hover {
      background-color: #EBEBEB;
      input {
        background: #EBEBEB;
      }
    }
  }
  .input-area {
    width: 600px;
    min-height: 26px;
    line-height: 20px;
    _height: 30px;
    padding-top: 6px;
    margin-left: auto;
    margin-right: auto;
    outline: 0;
    border: none;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
    border-radius: 4px;
    &:focus {
      border-bottom: 1px dashed #666;
      z-index: 999;
    }
    &::-webkit-input-placeholder {
      color: #9e9e9e;
    }
    &:-moz-placeholder {
      color: #9e9e9e;
    }
    &::-moz-placeholder {
      color: #9e9e9e;
    }
    &:-ms-input-placeholder {
      color: #9e9e9e;
    }
  }

</style>
