<template>
  <div class="module-content">
    <div class="module-content-list">
      <div class="module-content-item" v-for="(item, index) in contentList" :key="item.indexs">
        <i class="module-arr">=></i>
        <autoarea :text-content="item.context" :item-index="index" @listenTextareaChange="getTextareaContent"></autoarea>
        <i class="module-item-remove" @click="removeItem(index)">-</i>
      </div>
    </div>
    <b class="add-item" @click="addItem">+</b>
  </div>
</template>

<script>
  import autoarea from './autoarea'
  import defaultData from '../../js/app'

  export default {
    components: {
      autoarea
    },
    data() {
      return {
        contentList: []
      }
    },
    methods: {
      addItem() {
        let t = JSON.parse(JSON.stringify(defaultData.contentItem));
        t.indexs = this.contentList.length;
        this.contentList.push(t);
      },
      removeItem(index) {
        this.contentList.splice(+index, 1);
      },
      getTextareaContent(data) {
        let index = data.index;
        this.contentList[index].context = data.text;
      }
    },
    created() {
      let t = JSON.parse(JSON.stringify(defaultData.contentItem));
      this.contentList.push(t)
    }
  }
</script>

<style lang="scss" scoped>
  .module-content-item {
    position: relative;
    margin-bottom: 3px;
    .module-arr {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      left: -50px;
    }
    .module-item-remove {
      line-height: 15px;
      text-align: center;
      display: block;
      font-style: normal;
      height: 15px;
      width: 15px;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
</style>
