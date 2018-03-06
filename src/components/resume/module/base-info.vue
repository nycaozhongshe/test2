<template>
  <div class="base-module">
    <div class="base-content">
      <div class="base-name clearfix">
        <input type="text" v-model="info_name" class="module-input">
      </div>
      <div class="base-email">
        <span class="input-title">电子邮箱：</span>
        <div class="module-input-container clearfix">
          <input type="text" class="module-input" v-model="info_email">
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
                <span class="input-title">电话:</span>
                <input type="text" class="module-input" placeholder="18353122253" v-model="info_phone">
              </div>
            </td>
            <td height="50px">
              <div class="module-input-container clearfix">
                <span class="input-title">求职意向:</span>
                <select name="job-for" class="module-input" v-model="info_direction">
                  <option label="投资银行" value="投资银行"></option>
                  <option label="证券研究" value="证券研究"></option>
                  <option label="资产管理" value="资产管理"></option>
                  <option label="固定收益" value="固定收益"></option>
                  <option label="私募股权" value="私募股权"></option>
                  <option label="银⾏保险" value="银⾏保险"></option>
                  <option label="其他" value="其他"></option>
                </select>
              </div>
            </td>
            <td height="50px">
              <div class="module-input-container clearfix">
                <span class="input-title">入职时间:</span>
                <select type="text" class="module-input" placeholder="111111111" v-model="info_time">
                  <option value="1个月">1个月</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">最高学历:</span>
                <select type="text" class="module-input" v-model="info_degree">
                  <option value="本科">本科</option></select>
              </div>
            </td>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">联系地址:</span>
                <div class="cascader-container" style="float: left;width: 100px;line-height: 50px;height: 50px;">
                  <el-cascader
                    :options="cityList"
                    size="mini"
                    v-model="info_address"
                    :show-all-levels="false"
                    style="height: 50px;line-height: 50px;">
                  </el-cascader>
                </div>
              </div>
            </td>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">每周实习期:</span>
                <input type="text" class="module-input" placeholder="1" style="width: 20px;" v-model="info_internship">
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
  .base-content {
    min-height: 210px;
    margin: 0 208px 0 40px;
    padding: 40px 0 15px;
    .input-title {
      float: left;
    }
    .module-input-container {
      line-height: 50px;
    }
    .module-input {
      float: left;
      min-height: 25px;
      border: none;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      &:hover {
        border: 1px dashed #666;
      }
      &:focus {
        border: 1px dashed #666;
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
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
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
      width: 128px;
      height: 158px;
      padding: 20px 40px;
    }
    .base-desc {
      position: relative;
      width: 572px;
      table {
        width: 572px;
        height: 100%;
        tr {
          height: 50px;
          line-height: 50px;
          td {
            display: inline-block;
            float: left;
            width: 33%;
            height: 50px;
            overflow: hidden;
            .module-input {
              margin-left: 10px;
              vertical-align:middle;
              height: 50px;
              line-height: 50px;
              width: 100px;
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
    .cascader-container:hover .el-input__suffix {
      display: block !important;
    }
    .el-input.el-input--mini.el-input--suffix {
      .el-input__suffix {
        display: none;
      }
      &:hover {
        border: 1px dashed #666;
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
      }
    },
    computed: {
      info_name: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_name;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_name = n;
        }
      },
      info_email: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_email;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_email = n;
        }
      },
      info_phone: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_phone;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_phone = n;
        }
      },
      info_direction: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_direction;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_direction = n;
        }
      },
      info_time: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_time;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_time = n;
        }
      },
      info_degree: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_degree;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_degree = n;
        }
      },
      info_address: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_address;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_address = n;
        }
      },
      info_internship: {
        get: function () {
          return this.$store.state.resumeData.baseinfo.info_internship;
        },
        set: function (n) {
          this.$store.state.resumeData.baseinfo.info_internship = n;
        }
      },
    },
    watch: {
      info_name() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_name',
          data: this.info_name
        })
      },
      info_email() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_email',
          data: this.info_email
        })
      },
      info_phone() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_phone',
          data: this.info_phone
        })
      },
      info_direction() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_direction',
          data: this.info_direction
        })
      },
      info_time() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_time',
          data: this.info_time
        })
      },
      info_degree() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_degree',
          data: this.info_degree
        })
      },
      info_address() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_address',
          data: this.info_address
        })
      },
      info_internship() {
        this.$store.commit('writeBaseInfo', {
          type: 'info_internship',
          data: this.info_internship
        })
      }
    }
  }
</script>


