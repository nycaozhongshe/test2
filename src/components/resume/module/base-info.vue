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
            <td> <span>电话:</span><input type="text" class="module-input" placeholder="111111111"></td>
            <td> <span>求职意向:</span><input type="text" class="module-input" placeholder="111111111"></td>
            <td> <span>入职时间:</span><input type="text" class="module-input" placeholder="111111111"></td>
          </tr>
          <tr>
            <td><span>邮箱:</span><input type="text" class="module-input" placeholder="111111111"></td>
            <td><span>联系地址:</span><input type="text" class="module-input" placeholder="111111111"></td>
            <td><span>实习时间:</span><input type="text" class="module-input" placeholder="111111111"></td>
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
          .module-input {
            width: 120px;
            padding-left: 10px;
            border: none;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            &:hover {
              border: 1px dashed #666;
            }
            &:focus {
              border: 1px dashed #666;
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
</style>
<script>
  import avatar from './avatar'

  export default {
    components: {
      avatar
    },
  }
</script>


