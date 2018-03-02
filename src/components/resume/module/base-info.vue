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

<script>
  import avatar from './avatar'

  export default {
    components: {
      avatar
    },
  }
</script>

<style lang="scss" scoped>
  .base-content {
    min-height: 210px;
    margin: 0 40px;
    padding: 30px 0 50px;
    border-bottom: 1px dashed #cfcfcf;
    .base-avatar {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
