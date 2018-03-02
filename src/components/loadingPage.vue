<template>
  <div class="preview father"
       v-loading="loading">

  </div>
</template>

<script>

  import api from '../assets/datas/api'

  export default {
    data() {
      return {
        loading: true
      }
    },

  }
</script>

<style>
  .preview {
    padding-top: 100px;
    height: 500px;
  }
</style>
