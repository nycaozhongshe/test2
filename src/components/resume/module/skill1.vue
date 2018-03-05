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
          <div class="input-area" contenteditable="true" @click="click_skill(1)" @blur="blur_skill(1)"
               v-model="pro_value">{{pro_value}}<br/>
          </div>
        </td>
      </tr>
      <tr>
        <th>语言技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="语言技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true" @click="click_skill(2)" @blur="blur_skill(2)"
               v-model="lan_value">{{lan_value}}<br/></div>
        </td>
      </tr>
      <tr>
        <th>计算机技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="计算机技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true" @click="click_skill(3)" @blur="blur_skill(3)"
               v-model="com_value">{{com_value}}<br/></div>
        </td>
      </tr>
      <tr>
        <th>其它技能</th>
        <!--<td><input type="text" class="input-skill" placeholder="其它技能"/></td>-->
        <td>
          <div class="input-area" contenteditable="true" @click="click_skill(4)" @blur="blur_skill(4)"
               v-model="oth_value">{{oth_value}}<br/></div>
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
        pro_value: '专业技能',
        lan_value: '语言技能',
        com_value: '计算机技能',
        oth_value: '其它技能',
      }
    },
    methods: {
      click_skill(param) {
        if (param === 1 & this.pro_value == '专业技能') {
          this.pro_value = '';
        } else if (param === 2 & this.lan_value == '语言技能') {
          this.lan_value = '';
        } else if (param === 3 & this.com_value == '计算机技能') {
          this.com_value = '';
        } else if (param === 4 & this.oth_value == '其它技能') {
          this.oth_value = '';
        }
      },
      blur_skill(param) {
        let content = document.getElementsByClassName('input-area');
        if (param === 1) {
          this.pro_value = content[0].innerText;
          content[0].innerText = this.pro_value;
          if (this.pro_value.replace(/\s/g, "") == '') {
            content[0].innerText = '专业技能';
          }
          // console.log(this.pro_value)
        }
        if (param === 2) {
          this.lan_value = content[1].innerText;
          content[1].innerText = this.lan_value;
          // console.log(this.lan_value);
        }
        if (param === 3) {
          this.com_value = content[2].innerText;
          content[2].innerText = this.com_value;
          // console.log(this.com_value);
        }
        if (param === 4) {
          this.oth_value = content[3].innerText;
          content[3].innerText = this.oth_value;
          // console.log(this.oth_value);
        }
      }
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
    overflow-y: hidden;
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
