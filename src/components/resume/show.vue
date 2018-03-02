<template>
  <div class="resume-show">
    <div class="module-container">
      <div class="module-item"
           v-for="(item, index) in showList">
        <div class="arr-up arr" @click="moveUp(item.type)">上</div>
        <div class="arr-down arr" @click="moveDown(item.type)">下</div>
        <module-template
          :key="index"
          v-if="item.status"
          :module-type="item.type">
        </module-template>
      </div>
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
    },
    methods: {
      moveUp(type) {
        console.log(type);
        this.$store.commit('changeModulePosition', {dire: 1, type: type});
      },
      moveDown(type) {
        this.$store.commit('changeModulePosition', {dire: 0, type: type});
      },
    },
    computed: {
      showList() {
        return this.$store.state.moduleStatus.sort((x, y) => {
          return x.s - y.s
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .module-item {
    position: relative;
    .arr {
      position: absolute;
      left: 0;
      height: 20px;
      width: 20px;
      z-index: 2;
      &.arr-up {
        top: 40px;
        background-color: red;
      }
      &.arr-down {
        top: 60px;
        background-color: blue;
      }
    }
  }
</style>
