<template>
    <div class="project-module">
      <div class="project-title module-title">
        1项目经历
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
.project-module {
  height: auto;
  margin: 0 40px;
  padding: 30px 0 50px;
  .module-title {
    border-bottom: 1px solid #000000;
    padding-left: 10px;
  }
}
</style>
