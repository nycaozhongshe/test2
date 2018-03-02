<template>
  <div class="base-module">
    <div class="base-content">
      <div class="base-name">
        李希希
      </div>
      <div class="base-avatar">
        <avatar></avatar>
      </div>
      <div class="base-desc">
        <table>
          <tr>
            <td>
              <span>电话:</span>
            </td>
            <td>
              <div class="module-input-container"><input type="text" class="module-input" placeholder="18353122253">
              </div>
            </td>
            <td>
              <span>求职意向:</span>
            </td>
            <td>
              <div class="module-input-container">
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
            <td>
              <span>入职时间:</span>
            </td>
            <td>
              <div class="module-input-container">
                <input type="text" class="module-input" placeholder="111111111">
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span>邮箱:</span>
            </td>
            <td>
              <div class="module-input-container">
                <input type="text" class="module-input" placeholder="XXXXXXXXX@XXX.com">
              </div>
            </td>
            <td>
              <span>联系地址:</span>
            </td>
            <td>
              <div class="module-input-container">
                <input type="text" class="module-input" placeholder="111111111">
              </div>
            </td>
            <td>
              <span>每周实习期:</span>
            </td>
            <td>
              <div class="module-input-container">
                <input type="text" class="module-input" placeholder="111111111">
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
      table {
        width: 100%;
        height: 100%;
        tr {
          height: 50px;
          line-height: 50px;
          position: relative;
          td {
            position: relative;
            width: auto;
            span {
              display: block;
              width: auto;
              white-space: nowrap;
            }
            .module-input-container {
              width: 100%;
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
            .module-input {
              width: auto;
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
          }
        }
      }
    }
  }
</style>
<script>
  import avatar from './avatar'

  export default {
    components: {
      avatar
    },
  }
</script>


