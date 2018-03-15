<template>
  <div class="base-module">
    <div class="base-content">
      <div class="base-name clearfix">
        <input type="text" v-model="vitae_name" class="module-input" style="margin-left: 0;" placeholder="请输入姓名">
      </div>
      <div class="base-email">
        <span class="input-title">电子邮箱:</span>
        <div class="module-input-container clearfix">
          <input type="text" class="module-input"  v-model="vitae_email" style="width: 83%" placeholder="请输入邮箱">
        </div>
      </div>
      <div class="base-avatar">
        <avatar></avatar>
      </div>
      <div class="base-desc">
        <table>
          <tr>
            <td height="50px">
              <div class="module-input-container clearfix">
                <span class="input-title">联系电话:</span>
                <input type="text" class="module-input"  v-model="vitae_mobile" placeholder="请输入手机号">
              </div>
            </td>
            <td height="50px">
              <div class="module-input-container clearfix">
                <span class="input-title">求职意向:</span>
                <select name="job-for" class="module-input" v-model="vitae_direction" :class="{colorGred: vitae_direction ===  ''}">
                  <option label="请选择" disabled selected hidden></option>
                  <option label="投资银行" style="color: #1a1a1a" value="投资银行"></option>
                  <option label="证券研究" style="color: #1a1a1a" value="证券研究"></option>
                  <option label="资产管理" style="color: #1a1a1a" value="资产管理"></option>
                  <option label="固定收益" style="color: #1a1a1a" value="固定收益"></option>
                  <option label="私募股权" style="color: #1a1a1a" value="私募股权"></option>
                  <option label="银⾏保险" style="color: #1a1a1a" value="银⾏保险"></option>
                  <option label="其他" style="color: #1a1a1a" value="其他"></option>
                </select>
              </div>
            </td>
            <td height="30px">
              <div class="module-input-container clearfix">
                <span class="input-title">入职时间:</span>
                <select type="text" class="module-input" placeholder="111111111" v-model="vitae_entry_time" :class="{colorGred: vitae_entry_time ===  ''}">
                  <option label="请选择" disabled selected hidden ></option>
                  <option value="随时入职">随时入职</option>
                  <option value="1个星期内">1个星期内</option>
                  <option value="1个月内">1个月内</option>
                  <option value="3个月内">3个月内</option>
                  <option value="时间另议">时间另议</option>
                  <option value="不填写">不填写</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">最高学历:</span>
                <select type="text" class="module-input" v-model="vitae_degree" :class="{colorGred: vitae_degree ===  ''}">
                  <option label="请选择" disabled selected hidden  ></option>
                  <option value="博士及以上">博士及以上</option>
                  <option value="硕士">硕士</option>
                  <option value="本科">本科</option>
                  <option value="专科及以下">专科及以下</option>
                </select>
              </div>
            </td>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">联系地址:</span>
                <div class="cascader-container" style="float: left;width: 110px;line-height:25px;height:25px;">
                  <el-cascader
                    :options="cityList"
                    size="mini"
                    v-model="vitae_city"
                    :show-all-levels="false"
                    style="height: 25px;line-height: 25px;">
                  </el-cascader>
                </div>
              </div>
            </td>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">每周实习期:</span>
                <input type="text" class="module-input" placeholder="1-7" style="width: 40px;margin-right: 5px;text-align: center" v-model="vitae_internship_time">
                <span>天</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="base-avatar">
        <avatar></avatar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .colorGred {
    color: #b4c2db;
  }
  .base-content {
    min-height: 140px;
    margin: 0 208px 0 40px;
    padding: 35px 0 15px;


    .input-title {
      float: left;
    }
    .module-input-container {
      line-height: 30px;

      .cascader-container{
        /*border: #e5e5e5 1px solid;*/
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        margin-left: 5px;
        margin-top: 3px;
      }
    }
    .module-input {
      margin-left: 5px;
      /*text-indent: 3px;*/
      height: 25px;
      float: left;
      min-height: 25px;
      /*border: #e5e5e5 1px solid;*/
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      &:hover {
        border: 1px dashed #c20c0c;
      }
      &:focus {
        border: 1px dashed #c20c0c;
        z-index: 999;
      }

      option{
        font-size: 14px;
      }
    }
    .module-input-container {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

    }
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      &:hover {
        border: 1px dashed #666;
      }
    }
    .base-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 25px;
    }
    .base-avatar {
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 120px;
      height: 148px;
      padding: 20px 40px;
    }
    .base-desc {
      position: relative;
      width: 602px;
      table {
        width: 602px;
        height: 100%;
        tr {
          height: 30px;
          line-height: 30px;
          td {
            display: inline-block;
            float: left;
            width: 33%;
            height: 30px;
            /*overflow: hidden;*/
            .module-input {
              margin-left: 5px;
              vertical-align:middle;
              height: 25px;
              line-height: 25px;
              width: 110px;
              margin-top: 5px;
            }
            span {
              display: block;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .base-module {
    .el-input__inner {
      font-size: 16px;
      color: #9e9e9e;
      padding: 0;

    }
    .el-cascader__label {
      font-size: 16px;
      font-weight: normal;
      font-family: 微软雅黑;
      color: #000;
      padding-left: 0;
    }
    .cascader-container:hover .el-input__suffix {
      display: block !important;
    }
    .el-input.el-input--mini.el-input--suffix {
      .el-input__suffix {
        display: none;
        /*height: 25px;*/
      }
      &:hover {
        border: 1px dashed #c20c0c;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
      }
      input {
        border: none;
      }
    }
  }
</style>

<script>
  import avatar from './avatar'
  import {provinces} from "../../../../static/cities";

  export default {
    components: {
      avatar
    },
    data() {
      return {
        cityList: provinces,
      }
    },
    methods: {
      getWidth() {
        let minWidth = 25;
        console.dir(this.$refs.input);
      },
      changeBaseInfo(type, data) {
        this.$store.commit('writeBaseInfo', {
          type: type,
          data: data
        })
      },
    },
    computed: {
      vitae_name: {
        get: function () {
          return this.$store.state.resumeData.vitae_name;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_name = n;
        }
      },
      vitae_email: {
        get: function () {
          return this.$store.state.resumeData.vitae_email;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_email = n;
        }
      },
      vitae_mobile: {
        get: function () {
          return this.$store.state.resumeData.vitae_mobile;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_mobile = n;
        }
      },
      vitae_direction: {
        get: function () {
          return this.$store.state.resumeData.vitae_direction;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_direction = n;
        }
      },
      vitae_entry_time: {
        get: function () {
          return this.$store.state.resumeData.vitae_entry_time;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_entry_time = n;
        }
      },
      vitae_degree: {
        get: function () {
          return this.$store.state.resumeData.vitae_degree;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_degree = n;
        }
      },
      vitae_city: {
        get: function () {
          return this.$store.state.resumeData.vitae_city;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_city = n;
        }
      },
      vitae_internship_time: {
        get: function () {
          return this.$store.state.resumeData.vitae_internship_time;
        },
        set: function (n) {
          this.$store.state.resumeData.vitae_internship_time = n;
        }
      },
    },
    watch: {
      vitae_name() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_name',
          data: this.vitae_name
        })
      },
      vitae_email() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_email',
          data: this.vitae_email
        })
      },
      vitae_mobile() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_mobile',
          data: this.vitae_mobile
        })
      },
      vitae_direction() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_direction',
          data: this.vitae_direction
        })
      },
      vitae_entry_time() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_entry_time',
          data: this.vitae_entry_time
        })
      },
      vitae_degree() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_degree',
          data: this.vitae_degree
        })
      },
      vitae_city() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_city',
          data: this.vitae_city
        })
      },
      vitae_internship_time() {
        this.$store.commit('writeBaseInfo', {
          type: 'vitae_internship_time',
          data: this.vitae_internship_time
        })
      }
    }
  }
</script>


