<template>
    <div class="resume-show">
      <div class="module-container">
        <module-template
          v-for="(item, index) in $store.state.moduleStatus"
          :key="index"
          v-if="item.status"
          :module-type="item.type"
        ></module-template>
      </div>
    </div>
</template>

<script>
  import bus from './js/bus'
  import moduleTemplate from './template'
  export default {
    components: {
      moduleTemplate
    },
    data() {
      return {
        moduleList: [{type: 'baseinfo'}]
      }
    },
    created() {
      bus.$on('changeModuleStatus', (index) => {
        this.$store.commit('changeModuleStatus', index)
      })
    }
  }
</script>

<style>

</style>
