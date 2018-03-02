<template>
    <div class="resume-main father">
      <div class="left">
        <util></util>
      </div>
      <div class="center">
        <show></show>
      </div>
      <div class="right">
        <tip></tip>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .resume-main {
    min-height: 1000px;
    min-width: 1240px;
    .left {
      position: fixed;
      top: 0;
      left: 0;
      padding: 70px 0 0 0;
      width: 220px;
    }
    .center {
      width: 820px;
      margin: 75px auto 70px auto;
      background-color: #fff;
      min-height: 773.33px;
    }
    .right {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      padding: 70px 0 0 0;
    }
  }

</style>

<script>

  import show from './show'
  import util from './util'
  import tip from './tip'
  export default {
    components: {
      show,
      util,
      tip
    },

    methods: {
      addModule() {

      },
    }
  }
</script>

