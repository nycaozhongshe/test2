<template>
    <div class="search-box">
      <input type="text" v-model="keyWord" placeholder="请输入职位名或公司名...">
      <button @click="goSearch">搜索</button>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          keyWord: ''
        }
      },
      methods: {
        goSearch() {
          if (this.keyWord && isNaN(+this.keyWord)) {
            if (this.$route.name === 'job') {
              this.$router.replace('/job')
            }
            this.$router.push('/job/' + this.keyWord);
          } else {
            this.$message.error('请填写公司或职位名称,若要检索职位id,请使用首页的跳转职位功能');
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
