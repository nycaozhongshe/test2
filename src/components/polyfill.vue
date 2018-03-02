<template>
  <div id="polyfill">

  </div>
</template>

<script>
  export default {
    created: function () {
      setTimeout(() => {
        this.$router.push('/');
      }, 5);

    }
  }
</script>

<style>

</style>
