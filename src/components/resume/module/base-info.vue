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
            <td>电话</td>
            <td>求职意向</td>
            <td>入职时间</td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>联系地址</td>
            <td>实习时间</td>
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
      background-color: red;
      padding: 20px 40px;
    }
    .base-desc {
      table {
        width: 100%;
        height: 100%;
        tr {
          height: 50px;
          line-height: 50px;
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


