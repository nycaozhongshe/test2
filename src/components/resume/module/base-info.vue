<template>
  <div class="base-module">
    <div class="base-content">
      <div class="base-name">
        李希希
      </div>
      <div class="base-email">
        <span class="input-title">电子邮箱：</span>
        <div class="module-input-container clearfix">
          <input type="text" class="module-input">
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
                <input type="text" class="module-input" placeholder="18353122253">
              </div>
            </td>
            <td height="50px">
              <div class="module-input-container clearfix">
                <span class="input-title">求职意向:</span>
                <select name="job-for" class="module-input">
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
                <select type="text" class="module-input" placeholder="111111111">
                  <option value="1个月">1个月</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">最高学历:</span>
                <select type="text" class="module-input" placeholder="XXXXXXXXX@XXX.com">
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
                    :show-all-levels="false"
                    style="height: 50px;line-height: 50px;">
                  </el-cascader>
                </div>
              </div>
            </td>
            <td>
              <div class="module-input-container clearfix">
                <span class="input-title">每周实习期:</span>
                <input type="text" class="module-input" placeholder="1" style="width: 20px;">
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
    padding: 40px 0 50px;
    .input-title {
      float: left;
    }
    .module-input-container {
      line-height: 50px;
    }
    .module-input {
      float: left;
      height: 25px;
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
      }
    }
  }
</script>


