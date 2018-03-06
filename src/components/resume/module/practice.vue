<template>
    <div class="practice-module">
      <div class="practice-title module-title">
        2活动实践
      </div>
    </div>
</template>

<script>
  import contentList from './common/content'
    export default {
      components: {
        contentList
      },
    }
</script>

<style lang="scss" scoped>
  .practice-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
  }
</style>
