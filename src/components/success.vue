<template>
  <div class="success father">
    <h2>请求成功</h2>
  </div>
</template>

<script>
  export default {
    created: function () {
      this.$store.commit('trueLR');
      setTimeout(() => {
        this.$router.push('/')
      }, 30);
    }
  }
</script>

<style lang="scss" scoped>
  .success {
    padding-top: 100px;
    h2 {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 1.5rem;
    }
  }
</style>
