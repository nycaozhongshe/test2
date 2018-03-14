<template>
  <div class="resume-show">
    <div class="module-container">
      <div class="module-item"
           v-for="(item, index) in showList">
        <div class="arr-up arr" @click="moveUp(item.type)" v-if="index > 2">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangshangjiantou"></use>
          </svg>
        </div>
        <div class="arr-down arr" @click="moveDown(item.type)" v-if="index < showList.length - 1 && index > 1">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxiajiantou"></use>
          </svg>
        </div>
        <module-template
          :key="index"
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
        this.$store.commit('changeModuleStatus', {index: index, length: this.showList.length})
      })
    },
    methods: {
      moveUp(type) {
        console.log(type);
        this.$store.commit('changeModulePosition', {dire: 1, type: type});
      },
      moveDown(type) {
        this.$store.commit('changeModulePosition', {dire: 0, type: type});
        console.log(type);
      },
    },
    computed: {
      sortList() {
        return this.$store.state.moduleStatus.sort((x, y) => {
          return x.s - y.s
        })
      },
      showList() {
        return this.sortList.filter((item) => {
          return item.status
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .module-item {
    position: relative;
    border-bottom: 1px dashed #cfcfcf;
    .arr {
      position: absolute;
      left: 0;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      z-index: 2;
      &.arr-up {
        top: 40px;
        background-color: #c20c0c;
      }
      &.arr-down {
        top: 63px;
        background-color: #0c51c2;
      }
      .icon {
        font-size: 21px;
        color: white;
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .resume-show {
    .module-container {
      .el-input__icon {
        display: none;
      }
      .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--mini {
        width: 180px;
        border: none;
        .el-range-input:nth-of-type(2) {
          margin-left: 5px;
        }
        &:hover {
          border: 1px dashed #666666;
        }
      }
    }
    .module-title {
      margin-bottom: 20px;
      padding-bottom: 5px;
    }
    .module-input {
      border: none;
      &:hover {
        border: 1px dashed #666666;
      }
    }
  }
</style>
